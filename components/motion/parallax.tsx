"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [distance, rotate, scaleTo]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
