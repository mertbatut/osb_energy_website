import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import TurbineModel from "./TurbineModel.jsx";
import CameraRig from "./CameraRig.jsx";

/**
 * Ground plane representing terrain.
 */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[2000, 2000]} />
      <meshStandardMaterial color="#2d4a1e" roughness={1} metalness={0} />
    </mesh>
  );
}

/**
 * Distant mountain silhouettes using simple geometry.
 */
function Mountains() {
  const positions = [
    { pos: [-300, 30, -400], scale: [200, 60, 100], color: "#1a2e14" },
    { pos: [100, 40, -500], scale: [300, 80, 120], color: "#152910" },
    { pos: [-100, 25, -350], scale: [250, 50, 90], color: "#1f3518" },
    { pos: [300, 35, -450], scale: [180, 70, 100], color: "#172c12" },
    { pos: [-400, 20, -300], scale: [150, 40, 80], color: "#223d1a" },
  ];

  return (
    <group>
      {positions.map((m, i) => (
        <mesh key={i} position={m.pos} scale={m.scale}>
          <sphereGeometry args={[1, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={m.color} roughness={1} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Atmospheric fog and lighting for sunset feel.
 */
function Atmosphere() {
  return (
    <>
      {/* Main directional light — sunset angle */}
      <directionalLight position={[100, 80, -200]} intensity={2.5} color="#ffa040" castShadow />
      {/* Ambient fill */}
      <ambientLight intensity={0.3} color="#8090b0" />
      {/* Rim light from behind */}
      <directionalLight position={[-50, 40, -100]} intensity={0.8} color="#ff8030" />
      {/* Soft sky fill from above */}
      <hemisphereLight args={["#ffd080", "#1a2e14", 0.4]} />
    </>
  );
}

/**
 * Loading fallback shown while GLB loads.
 */
function LoadingFallback() {
  return (
    <mesh position={[0, 45, 0]}>
      <boxGeometry args={[4, 90, 4]} />
      <meshStandardMaterial color="#888" opacity={0.3} transparent />
    </mesh>
  );
}

/**
 * Three.js canvas for the wind turbine hero scene.
 * @param {Object} props
 * @param {{ current: number }} props.progressRef - Ref holding scroll progress 0-1
 */
export default function WindScene({ progressRef }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      camera={{
        fov: 45,
        near: 1,
        far: 3000,
        position: [150, 50, 100],
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* Sky color */}
      <color attach="background" args={["#0A131C"]} />

      {/* Atmospheric depth fog */}
      <fog attach="fog" args={["#1a2030", 200, 1200]} />

      {/* Environment for reflections — loads HDR from polyhaven CDN at runtime.
          TODO: Replace with self-hosted HDR in /public for production. */}
      <Environment preset="sunset" background={false} />

      <Atmosphere />
      <CameraRig progressRef={progressRef} />

      <Suspense fallback={<LoadingFallback />}>
        <TurbineModel />
      </Suspense>

      <Ground />
      <Mountains />
    </Canvas>
  );
}
