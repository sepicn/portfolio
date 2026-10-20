"use client";

import { useEffect, useRef, useState } from "react";

export function Hero3D() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || calm) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    const events = ["pointermove", "scroll", "keydown", "touchstart"] as const;

    const load = () => {
      events.forEach((e) => window.removeEventListener(e, load));
      import("./blueprint-stack")
        .then(({ createStackScene }) => {
          if (disposed || !el.getContext) return;
          const figure = el.parentElement!;
          const scene = createStackScene(
            el,
            () => setReady(true),
            (ys) => ys.forEach((y, i) => figure.style.setProperty(`--layer-${i}`, `${y.toFixed(1)}px`)),
          );
          const onPointer = (e: PointerEvent) => {
            scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
          };
          const onScroll = () => {
            const r = figure.getBoundingClientRect();
            scene.setProgress(-r.top / (r.height * 0.9));
          };
          const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? scene.start() : scene.stop()));
          const ro = new ResizeObserver(() => scene.resize());
          io.observe(figure);
          ro.observe(el);
          onScroll();
          window.addEventListener("pointermove", onPointer, { passive: true });
          window.addEventListener("scroll", onScroll, { passive: true });
          cleanup = () => {
            io.disconnect();
            ro.disconnect();
            window.removeEventListener("pointermove", onPointer);
            window.removeEventListener("scroll", onScroll);
            scene.dispose();
          };
        })
        .catch(() => {});
    };

    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return () => {
      disposed = true;
      events.forEach((e) => window.removeEventListener(e, load));
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      data-ready={ready || undefined}
      className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[64%] opacity-0 transition-opacity duration-700 data-ready:opacity-100 lg:block"
    />
  );
}
