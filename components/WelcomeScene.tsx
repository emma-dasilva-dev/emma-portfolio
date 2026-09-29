'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json';
import styles from './WelcomeScene.module.css';

type PointerTarget = {
  x: number;
  y: number;
};

function WelcomeWord({
  pointerTarget,
  reducedMotion,
}: {
  pointerTarget: React.MutableRefObject<PointerTarget>;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const font = new FontLoader().parse(helvetiker);
    const text = new TextGeometry('WELCOME', {
      font,
      size: 1,
      depth: 0.28,
      curveSegments: 14,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.022,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    text.computeBoundingBox();
    text.center();
    return text;
  }, []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state) => {
    if (!group.current) return;

    const targetRotationX = reducedMotion ? 0 : pointerTarget.current.y * -0.055;
    const targetRotationY = reducedMotion ? 0 : pointerTarget.current.x * 0.075;
    const targetPositionX = reducedMotion ? 0 : pointerTarget.current.x * 0.08;
    const targetPositionY = reducedMotion
      ? 0
      : pointerTarget.current.y * 0.045 + Math.sin(state.clock.elapsedTime * 0.42) * 0.025;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotationX,
      0.045,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotationY,
      0.045,
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetPositionX,
      0.04,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetPositionY,
      0.04,
    );
  });

  const responsiveScale = Math.min(Math.max(viewport.width / 6.55, 0.42), 1.3);

  return (
    <group ref={group} scale={responsiveScale}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#f4f4f2"
          metalness={0}
          roughness={0.07}
          transmission={0.93}
          thickness={1.15}
          ior={1.35}
          clearcoat={1}
          clearcoatRoughness={0.06}
          transparent
          opacity={0.76}
          iridescence={0.18}
          iridescenceIOR={1.15}
          attenuationColor="#8d7dca"
          attenuationDistance={2.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function WelcomeScene() {
  const pointerTarget = useRef<PointerTarget>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMotionPreference = () => setReducedMotion(motionQuery.matches);
    syncMotionPreference();

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onPointerLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    motionQuery.addEventListener('change', syncMotionPreference);

    if (!motionQuery.matches) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onPointerLeave);
    }

    return () => {
      motionQuery.removeEventListener('change', syncMotionPreference);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <div className={styles.scene} aria-hidden="true">
      {!ready && <div className={styles.fallback}>WELCOME</div>}

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 30, near: 0.1, far: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          setReady(true);
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 4, 5]} intensity={3.2} color="#ffffff" />
        <directionalLight position={[-4, -1, 3]} intensity={1.45} color="#ffffff" />

        <WelcomeWord pointerTarget={pointerTarget} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
