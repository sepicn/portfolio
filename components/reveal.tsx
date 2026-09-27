"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds, useful for staggering siblings. */
  delay?: number;
  /** Direction the content arrives from. */
  from?: "up" | "left" | "right";
  as?: "div" | "section" | "article" | "li";
};

/**
 * Fades and slides its children in when they scroll into view. One trigger per element,
 * cleaned up on unmount. Content visible at load and users who prefer reduced motion get
 * it immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Content already on screen at load stays as the server rendered it: hiding it until
    // this script runs made the largest text wait for JavaScript (a 4-5 s LCP on mobile).
    // Only what is still below the fold is hidden here and animated in on scroll.
    const rect = el.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (onScreen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const offset = { up: { y: 40 }, left: { x: -40 }, right: { x: 40 } }[from];
      const tween = gsap.fromTo(
        el,
        { autoAlpha: 0, ...offset },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
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
  }, [delay, from]);

  return (
    <Tag ref={ref as never} className={className} data-reveal>
      {children}
    </Tag>
  );
}
