"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { trigger: React.RefObject<HTMLElement | null> };

/**
 * Old-TV power-off at the end of the pinned hero: the picture squashes to a bright line,
 * the line shrinks to a dot, and the page below is revealed. Driven by scroll (scrubbed),
 * so scrolling back up turns the room on again.
 */
export function CrtExit({ trigger }: Props) {
  const veil = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = trigger.current;
    if (!target || !veil.current || !line.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: "70% bottom",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });
    tl.fromTo(
      veil.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5, ease: "power2.in" },
    )
      .fromTo(
        line.current,
        { scaleY: 1, scaleX: 1, autoAlpha: 0 },
        { autoAlpha: 1, scaleY: 0.004, duration: 0.35, ease: "power3.in" },
        "<0.1",
      )
      .to(line.current, { scaleX: 0, duration: 0.25, ease: "power2.in" })
      .to(line.current, { autoAlpha: 0, duration: 0.1 });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [trigger]);

  return (
    <>
      <div
        ref={veil}
        className="pointer-events-none absolute inset-0 z-20 bg-night-950"
        style={{ visibility: "hidden" }}
      />
      <div
        ref={line}
        className="pointer-events-none absolute inset-0 z-30 bg-white/95 mix-blend-screen"
        style={{ visibility: "hidden", boxShadow: "0 0 60px 20px rgba(0,229,255,0.6)" }}
      />
    </>
  );
}
