"use client";

import { useEffect, useRef } from "react";

export function HorizontalPin({
  head,
  children,
  id,
  ruler,
  labelledBy,
  className = "",
  trackClassName = "",
}: {
  head: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  ruler?: string;
  labelledBy?: string;
  className?: string;
  trackClassName?: string;
}) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = section.current;
    const inner = viewport.current;
    const row = track.current;
    if (!outer || !inner || !row) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let distance = 0;

    const items = () => [...row.children] as HTMLElement[];

    const measure = () => {
      if (!wide.matches || calm.matches) {
        outer.removeAttribute("data-pinned");
        outer.style.height = "";
        row.style.transform = "";
        items().forEach((item) => item.style.removeProperty("--v"));
        return;
      }
      outer.setAttribute("data-pinned", "");
      distance = Math.max(0, row.scrollWidth - inner.clientWidth);
      outer.style.height = `${distance + window.innerHeight}px`;
      paint();
    };

    const paint = () => {
      frame = 0;
      if (!outer.hasAttribute("data-pinned")) return;
      const rect = outer.getBoundingClientRect();
      const run = Math.max(1, outer.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / run));
      row.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      const vw = window.innerWidth;
      for (const item of items()) {
        const r = item.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const v =
          1 -
          Math.min(
            1,
            Math.max(0, Math.abs(center - vw * 0.5) - r.width * 0.25) / (vw * 0.6),
          );
        item.style.setProperty("--v", v.toFixed(3));
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    ro.observe(inner);
    measure();
    window.addEventListener("scroll", request, { passive: true });
    wide.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", request);
      wide.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section
      ref={section}
      id={id}
      data-ruler={ruler}
      aria-labelledby={labelledBy}
      className={`hpin relative ${className}`}
    >
      <div className="hpin-sticky">
        {head}
        <div ref={viewport} className="hpin-viewport">
          <div ref={track} className={`hpin-track ${trackClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
