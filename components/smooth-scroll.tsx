"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled for users who asked for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Lenis caches the scrollable height. Pinned sections (room, deck, phone tour) change
    // it when ScrollTrigger measures, and the wheel then stopped short of the page end while
    // dragging the scrollbar still worked. Re-measure after every ScrollTrigger refresh and
    // whenever the document grows.
    const resize = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", resize);
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);

    return () => {
      ScrollTrigger.removeEventListener("refresh", resize);
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
