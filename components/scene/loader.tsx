"use client";

import { useEffect } from "react";
import { useProgress } from "@react-three/drei";

type Props = { onReady?: () => void };

/**
 * Small progress pill over the poster image. The poster itself lives in the hero so it
 * can paint before any 3D code has been downloaded.
 */
export function SceneLoader({ onReady }: Props) {
  const { progress, active } = useProgress();
  const done = !active && progress >= 100;

  useEffect(() => {
    if (!done || !onReady) return;
    // Two frames so the first rendered frame is on screen before the poster fades out.
    let id = window.requestAnimationFrame(() => {
      id = window.requestAnimationFrame(onReady);
    });
    return () => window.cancelAnimationFrame(id);
  }, [done, onReady]);

  if (done) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute bottom-20 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-night-950/80 px-4 py-2 backdrop-blur"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan uppercase">
        loading room {Math.round(progress)}%
      </p>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-neon-pink shadow-neon-pink transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
