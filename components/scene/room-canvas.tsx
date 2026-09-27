"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { useRouter } from "@/i18n/navigation";
import type { Hotspot } from "@/lib/hotspots";
import { RoomModel } from "./room-model";
import { CameraRig } from "./camera-rig";
import { Effects } from "./effects";
import { SceneLoader } from "./loader";
import { useScene } from "./scene-state";

type Props = { onReady?: () => void };

/**
 * Tells the hero the room is really on screen, so the poster can fade. It sits inside the
 * Suspense boundary, so it mounts only once the model has loaded; it then compiles every
 * shader up front and waits a few rendered frames. Fading on "loaded" alone showed the
 * empty dark canvas while the first frames were still compiling.
 */
function SceneReady({ onReady }: Props) {
  const { gl, scene, camera } = useThree();
  const frames = useRef(0);
  useEffect(() => {
    gl.compile(scene, camera);
  }, [gl, scene, camera]);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 6) onReady?.();
  });
  return null;
}

export function RoomCanvas({ onReady }: Props) {
  const router = useRouter();
  const { setFocused, toggleLamp, setHovered } = useScene();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering entirely while the hero is scrolled out of view: the deck below
  // animates on the main thread and does not need a WebGL scene competing with it.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onActivate = useCallback(
    (spot: Hotspot) => {
      if (spot.id === "lamp") {
        toggleLamp();
        return;
      }
      setHovered(null);
      setFocused(spot.id);
      // Let the camera fly in, then navigate. The route change unmounts the scene.
      window.setTimeout(() => {
        if (spot.href) router.push(spot.href);
      }, 650);
    },
    [router, setFocused, setHovered, toggleLamp],
  );

  return (
    <div ref={wrapper} className="absolute inset-0">
      <SceneLoader />
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onPointerMissed={() => setHovered(null)}
      >
        <color attach="background" args={["#07030f"]} />
        <fog attach="fog" args={["#07030f", 6, 14]} />

        <ambientLight intensity={0.15} color="#8a2be2" />
        <pointLight
          position={[0, 2.5, -2.6]}
          intensity={8}
          color="#ff2d95"
          distance={6}
          decay={2}
        />
        <pointLight
          position={[0, 1.7, -2.6]}
          intensity={5}
          color="#00e5ff"
          distance={7}
          decay={2}
        />
        <pointLight
          position={[0, 1.25, -0.9]}
          intensity={1.5}
          color="#ff6fb0"
          distance={2.5}
          decay={2}
        />
        <pointLight
          position={[-0.9, 1.3, -1.2]}
          intensity={1.4}
          color="#ff2d95"
          distance={2.2}
          decay={2}
        />
        <pointLight
          position={[2.1, 1.9, -2.4]}
          intensity={1.2}
          color="#00e5ff"
          distance={2.5}
          decay={2}
        />
        <spotLight
          position={[-2.15, 2.6, -2.5]}
          target-position={[-2.15, 1.8, -2.98]}
          angle={0.7}
          penumbra={0.6}
          intensity={3}
          color="#ffe0b0"
          distance={2.5}
        />
        <spotLight
          position={[-2.2, 2.8, 0.6]}
          angle={0.9}
          penumbra={0.8}
          intensity={7}
          color="#8a2be2"
          distance={9}
        />

        <Suspense fallback={null}>
          <Selection>
            <RoomModel onActivate={onActivate} />
            <Effects />
          </Selection>
          <Preload all />
          <SceneReady onReady={onReady} />
        </Suspense>
        <CameraRig />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
