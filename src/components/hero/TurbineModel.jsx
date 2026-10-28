import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_PATH = "/models/wind_turbine_procedural.glb";

// Hub center in GLB Z-up space, derived from nodes.hub bounding box midpoint.
// HUB_OFFSET is the inverse — used to shift blade geometry to local origin for rotation.
const HUB_CENTER = [0, -8.1, 91];
const HUB_OFFSET = [0, 8.1, -91];
const BLADE_SPEED = 0.5;

// Module-scope materials — avoids re-allocation on every render.
// No dynamic inputs; safe to share across instances.
const towerMat = new THREE.MeshStandardMaterial({
  color: "#e8e8e8",
  metalness: 0.3,
  roughness: 0.6,
});
const nacelleMat = new THREE.MeshStandardMaterial({
  color: "#d4d4d4",
  metalness: 0.4,
  roughness: 0.5,
});
const hubMat = new THREE.MeshStandardMaterial({
  color: "#cccccc",
  metalness: 0.5,
  roughness: 0.4,
});
const bladeMat = new THREE.MeshStandardMaterial({
  color: "#f5f5f5",
  metalness: 0.2,
  roughness: 0.3,
  side: THREE.DoubleSide,
});

/**
 * Procedural wind turbine loaded from GLB.
 * Blades rotate around the hub center on Y axis.
 * Model uses Z-up coordinates; parent group applies -PI/2 X rotation to convert to Y-up.
 */
export default function TurbineModel() {
  const { nodes } = useGLTF(MODEL_PATH);
  const rotorRef = useRef();

  useFrame((_, delta) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.y += delta * BLADE_SPEED;
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Static structure */}
      <mesh geometry={nodes.tower.geometry} material={towerMat} />
      <mesh geometry={nodes.nacelle.geometry} material={nacelleMat} />

      {/* Rotor: pivot at hub center, rotate around Y axis */}
      <group position={HUB_CENTER}>
        <group ref={rotorRef}>
          <group position={HUB_OFFSET}>
            <mesh geometry={nodes.hub.geometry} material={hubMat} />
            <mesh geometry={nodes.blade_1.geometry} material={bladeMat} />
            <mesh geometry={nodes.blade_2.geometry} material={bladeMat} />
            <mesh geometry={nodes.blade_3.geometry} material={bladeMat} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
