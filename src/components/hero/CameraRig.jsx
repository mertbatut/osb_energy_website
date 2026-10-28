import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Camera positions for 5-stage scroll sequence (in Y-up world space).
 * After model rotation (-π/2 X): tower Y[0..90], hub at ~(0, 91, 8.1)
 */
const CAMERA_POINTS = [
  // Stage 1: ARRIVAL — Wide establishing shot, low angle
  new THREE.Vector3(150, 50, 100),
  // Stage 2: APPROACH — Moving toward turbine
  new THREE.Vector3(70, 75, 50),
  // Stage 3: FLY-BY — Alongside nacelle
  new THREE.Vector3(30, 95, 25),
  // Stage 4: LANDSCAPE — Pull back wide, higher angle
  new THREE.Vector3(-90, 70, -50),
  // Stage 5: TRANSITION — Above, pulling away
  new THREE.Vector3(-40, 140, -80),
];

const LOOK_AT_POINTS = [
  new THREE.Vector3(0, 50, 0),
  new THREE.Vector3(0, 80, 5),
  new THREE.Vector3(0, 91, 8),
  new THREE.Vector3(0, 60, 0),
  new THREE.Vector3(0, 80, 0),
];

/**
 * Scroll-driven camera controller using CatmullRomCurve3.
 * Reads progress from a mutable ref to avoid React re-renders on scroll.
 * @param {Object} props
 * @param {{ current: number }} props.progressRef - Ref holding scroll progress 0-1
 */
export default function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3());

  const cameraCurve = useMemo(
    () => new THREE.CatmullRomCurve3(CAMERA_POINTS, false, "catmullrom", 0.5),
    [],
  );

  const lookAtCurve = useMemo(
    () => new THREE.CatmullRomCurve3(LOOK_AT_POINTS, false, "catmullrom", 0.5),
    [],
  );

  useFrame(() => {
    const t = Math.max(0, Math.min(1, progressRef.current));

    const pos = cameraCurve.getPointAt(t);
    camera.position.copy(pos);

    const target = lookAtCurve.getPointAt(t);
    lookAtVec.current.copy(target);
    camera.lookAt(lookAtVec.current);
  });

  return null;
}
