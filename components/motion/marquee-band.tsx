"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { className: string; reverse?: boolean; children: ReactNode };

// Pixels a press has to travel before it counts as a drag instead of a click.
const DRAG_THRESHOLD = 6;
// Seconds for the strip to travel one full copy of its items.
const LOOP_SECONDS = 40;

/**
 * The band of a Marquee. Its child is the row, rendered twice over; the band moves it with a
 * single offset that always wraps inside one copy, so the strip is never empty. It runs on
 * its own, pauses under the mouse, while keyboard focus is inside it, after a tap on the
 * band (a second tap resumes; WCAG 2.2.2) and while off screen, and can be dragged left or right
 * with mouse, touch or pen. A press that barely moves is still a click, so links inside the
 * strip keep working. Under reduced motion it only moves when dragged.
 */
export function MarqueeBand({ className, reverse = false, children }: Props) {
  const band = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    const inner = track.current;
    if (!el || !inner) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let target = 0;
    let last = 0;
    let frame = 0;
    let hovered = false;
    let focused = false;
    let tapped = false;
    let visible = false;
    let pointer: number | null = null;
    let startX = 0;
    let lastX = 0;
    let dragged = false;

    // One loop is the distance from the first item to its twin in the second copy, which
    // includes the gap between the copies.
    const half = () => {
      const kids = inner.firstElementChild?.children;
      if (!kids || kids.length < 2) return inner.scrollWidth / 2 || 1;
      const twin = kids[kids.length / 2] as HTMLElement;
      return twin.offsetLeft - (kids[0] as HTMLElement).offsetLeft || 1;
    };
    const draw = () => {
      const h = half();
      // Wrap into [-h, 0): the second copy always covers what the first one leaves.
      const wrapped = (((offset % h) + h) % h) - h;
      inner.style.transform = `translate3d(${wrapped}px,0,0)`;
    };
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) / 1000 : 0;
      last = now;
      const auto = !still && !hovered && !focused && !tapped && pointer === null;
      if (auto) target += ((reverse ? 1 : -1) * half() * dt) / LOOP_SECONDS;
      offset += (target - offset) * (pointer === null && auto ? 1 : 0.35);
      if (Math.abs(target - offset) < 0.1) offset = target;
      draw();
      frame = auto || offset !== target ? requestAnimationFrame(tick) : 0;
      if (!frame) last = 0;
    };
    const wake = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovered = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      hovered = false;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pointer = e.pointerId;
      startX = lastX = e.clientX;
      dragged = false;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      if (!dragged) {
        if (Math.abs(e.clientX - startX) < DRAG_THRESHOLD) return;
        // Only capture once it is a real drag: capturing earlier would retarget the click
        // away from the link under the pointer.
        dragged = true;
        el.setPointerCapture(e.pointerId);
        el.dataset.dragging = "";
      }
      target += e.clientX - lastX;
      lastX = e.clientX;
      wake();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = null;
      // A touch tap that is not a drag and not on a link toggles the pause.
      if (
        e.type === "pointerup" &&
        !dragged &&
        e.pointerType !== "mouse" &&
        !(e.target as Element).closest("a")
      ) {
        tapped = !tapped;
        el.toggleAttribute("data-paused", tapped);
      }
      delete el.dataset.dragging;
      wake();
    };
    // A drag that ends over a link must not open it.
    const onClick = (e: MouseEvent) => {
      if (!dragged) return;
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = (e: FocusEvent) => {
      if (el.contains(e.relatedTarget as Node)) return;
      focused = false;
      wake();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      }
    });
    observer.observe(el);

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [reverse]);

  return (
    <div
      ref={band}
      className={`marquee relative cursor-grab touch-pan-y overflow-hidden select-none data-dragging:cursor-grabbing ${className}`}
    >
      <div ref={track} className="w-max will-change-transform">
        {children}
      </div>
    </div>
  );
}
