"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box3, Group, MathUtils, Vector3 } from "three";
import type { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL = "/models/headphones.glb";

function Model({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();
  const [scene, setScene] = useState<Object3D | null>(null);

  useEffect(() => {
    let active = true;
    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => { if (active) setScene(gltf.scene); },
      undefined,
      (error) => { console.error("Unable to load headphone model", error); }
    );
    return () => { active = false; };
  }, []);

  const normalized = useMemo(() => {
    if (!scene) return null;
    const model = scene.clone(true);
    const bounds = new Box3().setFromObject(model);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    if (!Number.isFinite(maxDimension) || maxDimension <= 0) return null;
    model.position.sub(center);
    const pivot = new Group();
    pivot.add(model);
    pivot.scale.setScalar(2.7 / maxDimension);
    return pivot;
  }, [scene]);

  useFrame(({ clock }, delta) => {
    if (!group.current || reducedMotion) return;
    const seconds = clock.elapsedTime;
    group.current.position.y = Math.sin(seconds * 0.65) * 0.07;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      -0.3 + pointer.x * 0.32 + Math.sin(seconds * 0.22) * 0.1,
      2.2,
      delta
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.12,
      2.2,
      delta
    );
  });

  return normalized ? <group ref={group}><primitive object={normalized} /></group> : null;
}

export default function Headphones() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      aria-label="Modèle interactif de casque audio en trois dimensions"
      role="img"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      fallback={null}
    >
      <ambientLight intensity={1.4} />
      <hemisphereLight intensity={1} color="#d6eaf2" groundColor="#1f3f4d" />
      <directionalLight position={[3, 5, 4]} intensity={2.8} color="#d6eaf2" />
      <pointLight position={[-4, 1, 2]} intensity={35} color="#5d8fa6" distance={12} />
      <Model reducedMotion={reducedMotion} />
    </Canvas>
  );
}
