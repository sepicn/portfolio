"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, label, summary, select, [role='button'], [role='tab'], [role='link']";

/**
 * A neon ring that trails the mouse pointer: it eases after the cursor, widens over
 * anything clickable and pulses on click. Mouse and trackpad only, and skipped for users
 * who asked for reduced motion. It never takes pointer events, so it cannot block clicks.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let frame = 0;

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.visible = "";
      const target = e.target instanceof Element ? e.target : null;
      el.toggleAttribute("data-hover", Boolean(target?.closest(INTERACTIVE)));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const down = () => el.toggleAttribute("data-down", true);
    const up = () => el.toggleAttribute("data-down", false);
    const leave = () => delete el.dataset.visible;

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
