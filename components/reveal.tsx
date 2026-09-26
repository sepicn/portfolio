"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
 * cleaned up on unmount. Users who prefer reduced motion get the content immediately.
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }
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
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, from]);

  return (
    <Tag ref={ref as never} className={className} data-reveal>
      {children}
    </Tag>
  );
}
