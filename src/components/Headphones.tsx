"use client";

import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box3, Group, MathUtils, Mesh, PMREMGenerator, Vector3 } from "three";
import type { Material, Object3D, Texture } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { layoutFor, motion, POSES, samplePose, type Pose } from "@/lib/motion";

export const MODEL_URL = "/models/headphones.glb";

/**
 * The GLB ships with a long coiled cable and jack (Headphones.014–.017). Left
 * visible it is twice the height of the headphones and drags the framing off
 * centre, so the stage hides it and frames the headphones themselves.
 */
// GLTFLoader strips "." from node names, so accept both spellings.
const HIDDEN_PARTS = /^Headphones\.?01[4-7]_low/;

const CAMERA_Z = 10;
const CAMERA_FOV = 28;
const INTRO_SECONDS = 2.4;

type StageProps = {
  reducedMotion: boolean;
  label: string;
  onProgress: (fraction: number | null) => void;
  onReady: () => void;
  onError: () => void;
};

type ModelProps = Omit<StageProps, "label">;

function disposeTree(root: Object3D) {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    child.geometry.dispose();
    const materials: Material[] = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value && (value as Texture).isTexture) (value as Texture).dispose();
      }
      material.dispose();
    }
  });
}

/**
 * A procedural studio environment gives the dark plastics real reflections
 * without downloading an HDR file.
 */
function setupEnvironment({ gl, scene }: RootState) {
  const pmrem = new PMREMGenerator(gl);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.035).texture;
  scene.environmentIntensity = 0.55;
  scene.environmentRotation.set(0, Math.PI * 0.35, 0);
  room.dispose();
  pmrem.dispose();
  gl.toneMappingExposure = 0.15;
}

function Lighting() {
  return (
    <>
      <hemisphereLight intensity={0.35} color="#d6eaf2" groundColor="#0a121a" />
      {/* Key: cool, high and to the right, toward the copy-free side. */}
      <directionalLight position={[4, 5, 6]} intensity={2.1} color="#d6eaf2" />
      {/* Rims: carve the black silhouette out of the abyss background. */}
      <directionalLight position={[-6, 3, -5]} intensity={4.2} color="#9fc8d9" />
      <directionalLight position={[5, -2, -6]} intensity={2.4} color="#5d8fa6" />
    </>
  );
}

function Model({ reducedMotion, onProgress, onReady, onError }: ModelProps) {
  const group = useRef<Group>(null);
  const { gl, invalidate } = useThree();
  const [scene, setScene] = useState<Object3D | null>(null);
  const callbacks = useRef({ onProgress, onReady, onError });
  useEffect(() => {
    callbacks.current = { onProgress, onReady, onError };
  });

  useEffect(() => {
    let active = true;
    let loaded: Object3D | null = null;
    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => {
        if (!active) {
          disposeTree(gltf.scene);
          return;
        }
        loaded = gltf.scene;
        setScene(gltf.scene);
      },
      (event) => {
        if (active) callbacks.current.onProgress(event.lengthComputable ? event.loaded / event.total : null);
      },
      (error) => {
        console.error("Unable to load headphone model", error);
        if (active) callbacks.current.onError();
      }
    );
    return () => {
      active = false;
      if (loaded) disposeTree(loaded);
    };
  }, []);

  /** Centres the headphones on their own bounds and normalises them to 1 unit. */
  const pivot = useMemo(() => {
    if (!scene) return null;
    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    const bounds = new Box3();
    scene.updateMatrixWorld(true);
    scene.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      if (HIDDEN_PARTS.test(child.name) || HIDDEN_PARTS.test(child.parent?.name ?? "")) {
        child.visible = false;
        return;
      }
      bounds.expandByObject(child);
      const materials: Material[] = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        for (const value of Object.values(material)) {
          if (value && (value as Texture).isTexture) (value as Texture).anisotropy = anisotropy;
        }
        // The emissive map holds the light strips; lift them so they read as signal lights.
        if ("emissiveIntensity" in material) (material as Material & { emissiveIntensity: number }).emissiveIntensity = 1.6;
      }
    });
    const dimensions = bounds.getSize(new Vector3());
    const largest = Math.max(dimensions.x, dimensions.y, dimensions.z);
    if (!Number.isFinite(largest) || largest <= 0) return null;
    scene.position.sub(bounds.getCenter(new Vector3()));
    const wrapper = new Group();
    wrapper.add(scene);
    wrapper.scale.setScalar(1 / largest);
    return wrapper;
  }, [scene, gl]);

  useEffect(() => {
    if (!pivot) return;
    callbacks.current.onReady();
    invalidate();
  }, [pivot, invalidate]);

  // Scroll, pointer and resize only request frames; the loop keeps itself
  // alive while the object is still travelling, floating or entering.
  useEffect(() => {
    const request = () => {
      if (gl.domElement.getBoundingClientRect().bottom > 0) invalidate();
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("pointermove", request, { passive: true });
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("pointermove", request);
    };
  }, [gl, invalidate]);

  const target = useRef<Pose>({ ...POSES.wide[0] });
  const intro = useRef({ start: -1 });
  const pointer = useRef({ x: 0, y: 0 });
  const placed = useRef(false);

  useFrame((state, rawDelta) => {
    const { size } = state;
    const object = group.current;
    if (!object || !pivot) return;
    // damp() is exponential, so it is stable at any step; the cap only
    // avoids a lurch after the tab was hidden or the main thread stalled.
    const delta = Math.min(rawDelta, 0.25);
    const layout = layoutFor(size.width, size.height);
    const visibleHeight = 2 * Math.tan(MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_Z;
    const visibleWidth = visibleHeight * (size.width / size.height);

    if (intro.current.start < 0) intro.current.start = state.clock.elapsedTime;
    const introRaw = reducedMotion ? 1 : Math.min((state.clock.elapsedTime - intro.current.start) / INTRO_SECONDS, 1);
    const introEase = 1 - Math.pow(1 - introRaw, 4);

    const pose = samplePose(POSES[layout], reducedMotion ? 0 : motion.progress, target.current);
    const pointerWeight = reducedMotion ? 0 : MathUtils.lerp(1, 0.35, Math.min(motion.progress, 1));
    pointer.current.x = MathUtils.damp(pointer.current.x, motion.pointerX * pointerWeight, 3, delta);
    pointer.current.y = MathUtils.damp(pointer.current.y, motion.pointerY * pointerWeight, 3, delta);

    const time = state.clock.elapsedTime;
    const float = reducedMotion ? 0 : Math.sin(time * 0.7) * 0.012;

    // The headphones emerge from the dark: they rise, turn into their
    // opening angle and the exposure comes up with them.
    const goal = {
      x: (pose.x * visibleWidth) / 2,
      y: (pose.y * visibleHeight) / 2 + float * visibleHeight - (1 - introEase) * 0.06 * visibleHeight,
      z: pose.z - (1 - introEase) * 1.6,
      scale: pose.size * visibleHeight * (0.86 + 0.14 * introEase),
      rx: pose.rx - pointer.current.y * 0.14,
      ry: pose.ry + pointer.current.x * 0.32 - (1 - introEase) * 1.5,
      rz: pose.rz + (reducedMotion ? 0 : Math.sin(time * 0.45) * 0.015),
    };

    if (reducedMotion || !placed.current) {
      placed.current = true;
      object.position.set(goal.x, goal.y, goal.z);
      object.rotation.set(goal.rx, goal.ry, goal.rz);
      object.scale.setScalar(goal.scale);
    } else {
      // Critically damped toward the scroll pose: soft arrival, no snapping,
      // and frame-rate independent.
      const lambda = introRaw < 1 ? 6 : 3.4;
      object.position.set(
        MathUtils.damp(object.position.x, goal.x, lambda, delta),
        MathUtils.damp(object.position.y, goal.y, lambda, delta),
        MathUtils.damp(object.position.z, goal.z, lambda, delta)
      );
      object.rotation.set(
        MathUtils.damp(object.rotation.x, goal.rx, lambda, delta),
        MathUtils.damp(object.rotation.y, goal.ry, lambda, delta),
        MathUtils.damp(object.rotation.z, goal.rz, lambda, delta)
      );
      object.scale.setScalar(MathUtils.damp(object.scale.x, goal.scale, lambda, delta));
    }

    state.gl.toneMappingExposure = 0.15 + 0.95 * introEase;

    const settled =
      Math.abs(object.position.x - goal.x) < 1e-3 &&
      Math.abs(object.position.y - goal.y) < 1e-3 &&
      Math.abs(object.rotation.y - goal.ry) < 1e-3 &&
      Math.abs(object.scale.x - goal.scale) < 1e-3;
    const onScreen = state.gl.domElement.getBoundingClientRect().bottom > 0;
    if (!reducedMotion && onScreen && (introRaw < 1 || !settled || float !== 0)) state.invalidate();
  });

  if (!pivot) return null;
  return (
    <group ref={group} scale={0.0001}>
      <primitive object={pivot} />
    </group>
  );
}

export default function Headphones({ label, ...props }: StageProps) {
  return (
    <Canvas
      aria-label={label}
      role="img"
      frameloop="demand"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV, near: 1, far: 30 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={setupEnvironment}
    >
      <Lighting />
      <Model {...props} />
    </Canvas>
  );
}
