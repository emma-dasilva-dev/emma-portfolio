"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec2 uMouse;
  uniform float uWave;
  uniform float uGrain;
  uniform float uBright;

  varying vec2 vUv;

  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
      + (c - a) * u.y * (1.0 - u.x)
      + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = vUv;

    float wave1 = sin(st.x * 8.0 + uTime * 2.0) * 0.1 * uWave;
    float wave2 = sin(st.y * 6.0 + uTime * 1.5) * 0.1 * uWave;
    float wave3 = sin((st.x + st.y) * 4.0 + uTime * 3.0) * 0.05 * uWave;

    st += (uMouse - 0.5) * 0.18;

    float waves = wave1 + wave2 + wave3;
    float noiseValue = smoothNoise(st * 3.0 + uTime * 0.5);
    float fbmNoise = fbm(st * 2.0 + uTime * 0.3);
    float combinedNoise = mix(noiseValue, fbmNoise, 0.6) * uGrain;

    float mixFactor = (waves + combinedNoise + 1.0) * 0.5;
    mixFactor = smoothstep(0.2, 0.8, mixFactor);

    vec3 color = mix(uColorA, uColorB, mixFactor);

    float glow = 1.0 - distance(st, vec2(0.5)) * 1.2;
    glow = smoothstep(0.0, 1.0, glow);
    glow += combinedNoise * 0.15;

    color += glow * 0.08;

    float brightness = 0.92 + sin(uTime * 0.8) * 0.08 * uBright;
    color *= brightness;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#202020") },
      uColorB: { value: new THREE.Color("#030303") },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uWave: { value: 0.72 },
      uGrain: { value: 0.68 },
      uBright: { value: 0.45 },
    }),
    [],
  );

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      targetMouse.current.set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight,
      );
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;

    mouse.current.lerp(targetMouse.current, 0.035);
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh scale={[4.2, 4.2, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function OldTelevisionBackground() {
  return (
    <div className="old-tv-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ShaderPlane />
      </Canvas>
      <div className="old-tv-grain" />
      <div className="old-tv-vignette" />
    </div>
  );
}
