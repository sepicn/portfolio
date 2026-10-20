"use client";

import { useEffect } from "react";

let active: {
  scrollTo: (y: number, options?: { immediate?: boolean; duration?: number }) => void;
} | null = null;

export function scrollPageToTop() {
  if (active) active.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "auto" });
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: true, anchors: true });
        active = lenis;
        const observer = new ResizeObserver(() => lenis.resize());
        observer.observe(document.body);
        cleanup = () => {
          observer.disconnect();
          if (active === lenis) active = null;
          lenis.destroy();
        };
      });
    };
    window.addEventListener("wheel", start, { once: true, passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("wheel", start);
      cleanup?.();
    };
  }, []);

  return null;
}
