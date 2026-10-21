"use client";

import { useEffect, useRef } from "react";

export function ProcessPin({
  steps,
  label,
  children,
}: {
  steps: number;
  label: string;
  children: React.ReactNode;
}) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = [...el.querySelectorAll<HTMLElement>("[data-step]")];
    const arts = [...el.querySelectorAll<HTMLElement>("[data-art]")];
    const bar = el.querySelector<HTMLElement>(".process-bar");
    const count = el.querySelector<HTMLElement>(".process-count");
    let frame = 0;
    let last = -1;

    const paint = () => {
      frame = 0;
      if (!wide.matches || calm.matches) {
        el.removeAttribute("data-pinned");
        return;
      }
      el.setAttribute("data-pinned", "");
      const rect = el.getBoundingClientRect();
      const run = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(run, 1)));
      const active = Math.min(steps - 1, Math.floor(p * steps * 0.999));
      bar?.style.setProperty("transform", `scaleX(${p})`);
      if (active === last) return;
      last = active;
      items.forEach((item, i) => {
        item.dataset.state =
          i < active
            ? "past"
            : i === active
              ? "active"
              : i === active + 1
                ? "next"
                : "far";
      });
      arts.forEach((art, i) => {
        art.dataset.state = i < active ? "past" : i === active ? "active" : "next";
      });
      if (count) count.textContent = `0${active + 1} / 0${steps}`;
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    wide.addEventListener("change", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      wide.removeEventListener("change", request);
    };
  }, [steps]);

  return (
    <section
      ref={section}
      id="put"
      data-ruler={label}
      aria-labelledby="process-title"
      className="process-pin relative"
      style={{ "--steps": steps } as React.CSSProperties}
    >
      <div className="process-sticky">{children}</div>
    </section>
  );
}
