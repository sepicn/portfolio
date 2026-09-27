"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scrollPageTo } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  panels: React.ReactNode[];
  /** Scroll distance per transition, in viewport heights. */
  perPanel?: number;
};

/**
 * Scroll-driven deck. On desktop the block pins and the scroll wheel drives panels in
 * sideways: panel 2 arrives from the right while panel 1 slides out left and dims, panel 3
 * arrives from the left, and so on. Snap points make every panel settle in place.
 * Below 1024px, or with reduced motion, the panels are plain stacked sections.
 *
 * The pinned element is an inner div. ScrollTrigger wraps whatever it pins in a
 * "pin-spacer" div, so pinning a node React placed directly would leave React unable to
 * remove it on navigation ("removeChild: not a child of this node"). The outer div stays
 * where React put it, and useGSAP reverts everything in a layout effect before unmount.
 */
export function SlideDeck({ panels, perPanel = 1 }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const items = Array.from(el.querySelectorAll<HTMLElement>("[data-panel]"));
        const layers = (panel: HTMLElement) =>
          panel.querySelectorAll<HTMLElement>("[data-layer]");
        const steps = items.length - 1;
        // Panels off screen are faded with opacity, not autoAlpha or inert: those drop them
        // from the accessibility tree, so screen readers and AI agents only read the first
        // panel. Keyboard focus on a faded panel scrolls the deck to it (focusIn below).
        gsap.set(items.slice(1), { xPercent: 0, opacity: 0 });
        gsap.set(items[0], { opacity: 1 });
        const setActive = (index: number) =>
          items.forEach((panel, i) => {
            panel.style.pointerEvents = i === index ? "" : "none";
          });
        setActive(0);

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top top+=64",
            end: () => `+=${steps * perPanel * window.innerHeight}`,
            pin: true,
            scrub: 0.7,
            snap: {
              snapTo: 1 / steps,
              duration: { min: 0.2, max: 0.6 },
              ease: "power1.inOut",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * steps)),
          },
        });

        items.forEach((panel, i) => {
          if (i === 0) return;
          const dir = i % 2 === 1 ? 1 : -1; // odd panels arrive from the right, even from the left
          const prev = items[i - 1];
          tl.to(prev, { xPercent: -dir * 35, opacity: 0, scale: 0.94 }, i - 1)
            .to(layers(prev), { xPercent: -dir * 25, stagger: 0.03 }, i - 1)
            .fromTo(
              panel,
              { xPercent: dir * 100, opacity: 1, scale: 1 },
              { xPercent: 0 },
              i - 1,
            )
            .fromTo(
              layers(panel),
              { xPercent: dir * 40 },
              { xPercent: 0, stagger: 0.05 },
              i - 1,
            );
        });

        const trigger = tl.scrollTrigger!;
        const focusIn = (e: FocusEvent) => {
          const i = items.findIndex((panel) => panel.contains(e.target as Node));
          if (i < 0) return;
          scrollPageTo(trigger.start + (i / steps) * (trigger.end - trigger.start));
        };
        el.addEventListener("focusin", focusIn);

        return () => {
          el.removeEventListener("focusin", focusIn);
          items.forEach((panel) => (panel.style.pointerEvents = ""));
        };
      });
      return () => mm.revert();
    },
    { scope: outer, dependencies: [perPanel] },
  );

  return (
    <div ref={outer}>
      <div ref={root} className="relative lg:h-[calc(100dvh-4rem)] lg:overflow-hidden">
        {panels.map((panel, i) => (
          <section
            key={i}
            data-panel
            className="relative flex min-h-[70vh] items-center py-20 lg:absolute lg:inset-0 lg:min-h-0 lg:py-0"
          >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{panel}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
