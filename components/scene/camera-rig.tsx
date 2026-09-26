"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { hotspots, OVERVIEW } from "@/lib/hotspots";
import { useScene } from "./scene-state";

/**
 * Drives the camera from three inputs:
 *  1. scroll progress (0..1) moves the camera from the overview toward the monitor,
 *  2. a focused hotspot overrides the target with that hotspot's camera and look point,
 *  3. the pointer adds a small parallax so the room feels alive while idle.
 * Everything is damped per frame, so switching targets never snaps.
 */
export function CameraRig() {
  const { camera, pointer } = useThree();
  const { focused, scroll } = useScene();
  const targetPos = useRef(new THREE.Vector3(...OVERVIEW.camera));
  const targetLook = useRef(new THREE.Vector3(...OVERVIEW.look));
  const currentLook = useRef(new THREE.Vector3(...OVERVIEW.look));
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const monitor = useMemo(() => hotspots.find((h) => h.id === "projects")!, []);

  useEffect(() => {
    camera.position.set(...OVERVIEW.camera);
    camera.lookAt(...OVERVIEW.look);
  }, [camera]);

  useFrame((_, delta) => {
    const focus = focused ? hotspots.find((h) => h.id === focused) : null;
    if (focus) {
      targetPos.current.set(...focus.camera);
      targetLook.current.set(...focus.look);
    } else {
      const p = reduceMotion ? 0 : THREE.MathUtils.smoothstep(scroll.current, 0, 1);
      targetPos.current.set(
        THREE.MathUtils.lerp(OVERVIEW.camera[0], monitor.camera[0], p) +
          (reduceMotion ? 0 : pointer.x * 0.12),
        THREE.MathUtils.lerp(OVERVIEW.camera[1], monitor.camera[1], p) +
          (reduceMotion ? 0 : pointer.y * 0.06),
        THREE.MathUtils.lerp(OVERVIEW.camera[2], monitor.camera[2], p),
      );
      targetLook.current.set(
        THREE.MathUtils.lerp(OVERVIEW.look[0], monitor.look[0], p),
        THREE.MathUtils.lerp(OVERVIEW.look[1], monitor.look[1], p),
        THREE.MathUtils.lerp(OVERVIEW.look[2], monitor.look[2], p),
      );
    }

    const speed = focus ? 2.6 : 3.2;
    const k = 1 - Math.exp(-speed * delta);
    camera.position.lerp(targetPos.current, k);
    currentLook.current.lerp(targetLook.current, k);
    camera.lookAt(currentLook.current);
  });

  return null;
}
