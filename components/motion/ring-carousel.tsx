"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { scrollPageTo } from "@/components/smooth-scroll";
import { startCodeStreams } from "@/components/motion/code-streams";

type Props = {
  items: React.ReactNode[];
  /** Shown above the ring and pinned with it. */
  header?: React.ReactNode;
  /** Sides of the prism; sides without a card stay empty. Grows to fit more items. */
  sides?: number;
  /** Turn left to right instead of right to left. */
  reverse?: boolean;
  /** Scroll distance per card, in viewport heights. */
  perItem?: number;
};

const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
// Card width on the ring: a share of the stage, within these bounds (px).
const CARD_MIN = 640;
const CARD_MAX = 960;
const CARD_SHARE = 0.58;
const GAP = 36; // half the space between neighbouring cards
// Horizontal drag, in px, that moves the ring by one card.
const DRAG_PER_ITEM = 360;

/**
 * Cards on the sides of a hexagonal prism. On desktop the block pins and scrolling turns
 * the prism right to left (or left to right with `reverse`), one card at a time, with snap points on every card. Lines of
 * code stream in from both edges behind it, faster while it turns. Cards scale with the
 * screen width. The prism can also be
 * dragged sideways with the mouse: the drag scrolls the page, so scroll position stays the
 * single source of truth and snapping works the same way. A drag never counts as a click.
 * Below 1024px, or with reduced motion, the cards are a plain two-column grid.
 */
export function RingCarousel({
  items,
  header,
  sides = 6,
  reverse = false,
  perItem = 0.55,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const count = Math.max(sides, items.length);
  const step = 360 / count;
  const hasHeader = Boolean(header);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const stage = el.querySelector<HTMLElement>("[data-ring-stage]");
        const ring = el.querySelector<HTMLElement>("[data-ring]");
        const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-ring-item]"));
        const canvas = el.querySelector<HTMLCanvasElement>("[data-code-streams]");
        if (!stage || !ring || cards.length < 2) return;
        const steps = cards.length - 1;
        // Apothem of the prism: neighbouring sides meet edge to edge.
        // 1 turns right to left, -1 left to right; drag follows the same way.
        const dir = reverse ? -1 : 1;
        const tan = Math.tan(((step / 2) * Math.PI) / 180);
        let radius = 0;
        const measure = () => {
          const width = Math.min(
            CARD_MAX,
            Math.max(CARD_MIN, stage.clientWidth * CARD_SHARE),
          );
          cards.forEach((card) => {
            card.style.width = `${width}px`;
            card.style.marginLeft = `${-width / 2}px`;
          });
          radius = (width / 2 + GAP) / tan;
        };
        measure();

        // Every card is placed on its own, with a z-index from its depth, instead of in a
        // shared 3D space: the browser then painted them in DOM order, and a side at the
        // back could cover the card in front. Cards turned away are hidden.
        let last = 0;
        let spin = 0; // 0..1, how fast the prism is turning, decays in the stream loop
        const render = (angle: number) => {
          spin = Math.min(1, spin + Math.abs(angle - last) / 12);
          last = angle;
          cards.forEach((card, i) => {
            const theta = dir * (i * step - angle);
            const depth = Math.cos((theta * Math.PI) / 180);
            const off = Math.abs(i * step - angle);
            card.style.transform = `translateZ(${-radius}px) rotateY(${theta}deg) translateZ(${radius}px) translateY(-50%)`;
            card.style.zIndex = String(Math.round(depth * 1000) + 1000);
            // Cards turned away fade out instead of leaving the accessibility tree, so
            // screen readers and AI agents still read every card; focus turns the ring to them.
            card.style.opacity =
              depth > -0.05 ? String(Math.max(0.15, 1 - off / 150)) : "0";
            card.style.pointerEvents = off > step * 1.1 ? "none" : "";
          });
        };
        render(0);
        const stopStreams = canvas
          ? startCodeStreams(canvas, () => (spin *= 0.96))
          : undefined;

        const proxy = { angle: 0 };
        const tween = gsap.to(proxy, {
          angle: steps * step,
          ease: "none",
          onUpdate: () => render(proxy.angle),
          scrollTrigger: {
            trigger: el,
            // With a header the block fills the screen under the site header; without one it is
            // only as tall as the prism and pins in the middle of the screen.
            start: hasHeader ? "top top+=64" : "center center+=32",
            end: () => `+=${steps * perItem * window.innerHeight}`,
            pin: true,
            scrub: 0.6,
            snap: {
              snapTo: 1 / steps,
              duration: { min: 0.2, max: 0.6 },
              ease: "power2.inOut",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              measure();
              render(last);
            },
          },
        });
        const trigger = tween.scrollTrigger!;

        // Dragging: pointer capture starts only once the pointer has really moved, so a
        // plain click still lands on the link under it.
        let startX = 0;
        let startScroll = 0;
        let pointer: number | null = null;
        let dragging = false;
        let dragged = false;

        const down = (e: PointerEvent) => {
          if (e.button !== 0 || !trigger.isActive) return;
          pointer = e.pointerId;
          startX = e.clientX;
          startScroll = window.scrollY;
          dragging = false;
          dragged = false;
        };
        const move = (e: PointerEvent) => {
          if (e.pointerId !== pointer) return;
          const dx = e.clientX - startX;
          if (!dragging) {
            if (Math.abs(dx) < 6) return;
            dragging = true;
            dragged = true;
            stage.setPointerCapture(e.pointerId);
            stage.dataset.dragging = "";
          }
          const perPx = (perItem * window.innerHeight) / DRAG_PER_ITEM;
          const target = startScroll - dir * dx * perPx;
          scrollPageTo(Math.min(trigger.end, Math.max(trigger.start, target)));
        };
        const up = (e: PointerEvent) => {
          if (e.pointerId !== pointer) return;
          pointer = null;
          dragging = false;
          delete stage.dataset.dragging;
          if (stage.hasPointerCapture(e.pointerId))
            stage.releasePointerCapture(e.pointerId);
        };
        const click = (e: MouseEvent) => {
          if (!dragged) return;
          dragged = false;
          e.preventDefault();
          e.stopPropagation();
        };
        const noNativeDrag = (e: DragEvent) => e.preventDefault();
        const focusIn = (e: FocusEvent) => {
          const i = cards.findIndex((card) => card.contains(e.target as Node));
          if (i < 0) return;
          scrollPageTo(trigger.start + (i / steps) * (trigger.end - trigger.start));
        };

        stage.addEventListener("pointerdown", down);
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerup", up);
        stage.addEventListener("pointercancel", up);
        stage.addEventListener("click", click, true);
        stage.addEventListener("dragstart", noNativeDrag);
        stage.addEventListener("focusin", focusIn);

        return () => {
          stage.removeEventListener("pointerdown", down);
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerup", up);
          stage.removeEventListener("pointercancel", up);
          stage.removeEventListener("click", click, true);
          stage.removeEventListener("dragstart", noNativeDrag);
          stage.removeEventListener("focusin", focusIn);
          delete stage.dataset.dragging;
          stopStreams?.();
          tween.scrollTrigger?.kill();
          tween.kill();
          cards.forEach((card) => {
            card.style.transform = "";
            card.style.opacity = "";
            card.style.zIndex = "";
            card.style.pointerEvents = "";
            card.style.width = "";
            card.style.marginLeft = "";
          });
        };
      });
      cleanup = () => mm.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [step, perItem, hasHeader, reverse]);

  return (
    <div>
      <div
        ref={root}
        className={`relative lg:flex lg:flex-col lg:justify-center lg:overflow-hidden ${hasHeader ? "lg:h-[calc(100svh-4rem)]" : "lg:h-[720px]"}`}
      >
        <canvas
          data-code-streams
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden size-full motion-reduce:hidden lg:block"
        />
        {header ? (
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">{header}</div>
        ) : null}
        <div
          data-ring-stage
          className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:relative lg:mt-6 lg:h-[560px] lg:w-full lg:max-w-none lg:touch-pan-y lg:px-0 lg:select-none"
        >
          <ul
            data-ring
            className="grid gap-6 md:grid-cols-2 lg:absolute lg:top-1/2 lg:left-1/2 lg:block lg:[perspective:2600px]"
          >
            {items.map((item, i) => (
              <li
                key={i}
                data-ring-item
                // Width and centring come from the script, sized to the screen.
                className="lg:absolute lg:top-0 lg:left-0 lg:-ml-[380px] lg:w-[760px] lg:[backface-visibility:hidden]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
