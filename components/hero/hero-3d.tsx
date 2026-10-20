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
    if (calm) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    const events = ["pointermove", "scroll", "keydown", "touchstart"] as const;

    const load = () => {
      events.forEach((e) => window.removeEventListener(e, load));
      import("./blueprint-stack")
        .then(({ createStackScene }) => {
          if (disposed || !el.getContext) return;
          const figure = el.parentElement!;
          const scene = createStackScene(el, () => setReady(true), { auto: !wide, view: wide ? 9.8 : 8.6 });
          const onPointer = (e: PointerEvent) => {
            scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
          };
          const onScroll = () => {
            const r = figure.getBoundingClientRect();
            const vh = window.innerHeight;
            scene.setProgress(wide ? -r.top / (r.height * 0.9) : (vh * 0.85 - r.top - r.height) / (vh * 0.6));
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-ready:opacity-100 lg:right-auto lg:w-[64%]"
    />
  );
}
