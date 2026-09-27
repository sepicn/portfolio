"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { className: string; children: ReactNode };

/**
 * The band of a Marquee. The CSS animation keeps it running; while the mouse is over it the
 * animation pauses and moving the mouse left or right scrubs the strip the same way. Touch
 * and pen drag it. The offset wraps at half the track, where the duplicated row repeats.
 */
export function MarqueeBand({ className, children }: Props) {
  const band = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    const inner = track.current;
    if (!el || !inner) return;
    let target = 0;
    let current = 0;
    let frame = 0;
    let dragging = false;
    let lastX = 0;

    const half = () => inner.scrollWidth / 2 || 1;
    const tick = () => {
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.1) current = target;
      const h = half();
      const wrapped = ((current % h) + h) % h;
      inner.style.transform = `translateX(${wrapped - h}px)`;
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const nudge = (dx: number) => {
      target += dx;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        // Clamped: the first move after the cursor enters can report a large jump.
        nudge(Math.max(-60, Math.min(60, e.movementX)) * 1.5);
      } else if (dragging) {
        nudge(e.clientX - lastX);
        lastX = e.clientX;
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const onUp = () => {
      dragging = false;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={band}
      className={`marquee relative cursor-ew-resize touch-pan-y overflow-hidden ${className}`}
    >
      <div ref={track} className="w-max">
        {children}
      </div>
    </div>
  );
}
