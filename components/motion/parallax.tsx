"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  /** Pixels of travel across the element's scroll range. Negative moves against the scroll. */
  distance?: number;
  className?: string;
  /** Extra rotation in degrees at the end of the range. */
  rotate?: number;
  /** Scale factor at the end of the range. */
  scaleTo?: number;
};

/** Moves its children slower or faster than the page while they cross the viewport. */
export function Parallax({
  children,
  distance = 80,
  rotate = 0,
  scaleTo = 1,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // CubeDeck faces are turned by the deck, RingCarousel cards (on desktop) by the ring.
    if (
      el.closest("[data-cube-face]") ||
      (el.closest("[data-ring-item]") && window.matchMedia("(min-width: 1024px)").matches)
    )
      return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const tween = gsap.fromTo(
        el,
        { y: -distance / 2, rotate: 0, scale: 1 },
        {
          y: distance / 2,
          rotate,
          scale: scaleTo,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [distance, rotate, scaleTo]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
