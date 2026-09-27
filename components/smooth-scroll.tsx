"use client";

import { useEffect } from "react";
import { loadGsap } from "@/lib/gsap";

/**
 * Smooth scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Both are fetched after hydration: native scrolling works until then, and the first paint
 * does not wait for either. Disabled for users who asked for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import("lenis"), loadGsap()]).then(
      ([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
        if (cancelled) return;
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Lenis caches the scrollable height. Pinned sections (room, deck, phone tour)
        // change it when ScrollTrigger measures, and the wheel then stopped short of the
        // page end while dragging the scrollbar still worked. Re-measure after every
        // ScrollTrigger refresh and whenever the document grows.
        const resize = () => lenis.resize();
        ScrollTrigger.addEventListener("refresh", resize);
        const observer = new ResizeObserver(resize);
        observer.observe(document.body);

        cleanup = () => {
          ScrollTrigger.removeEventListener("refresh", resize);
          observer.disconnect();
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
    );
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
