"use client";

import { useEffect, useRef } from "react";

/** Evaluates one clip-path coordinate such as `calc(100% - 26px)` against a side length. */
function coord(value: string, size: number): number {
  const expr = value.replace(/^calc\(|\)$/g, "").replace(/\s+/g, "");
  let total = 0;
  for (const [, sign, num, unit] of expr.matchAll(/([+-]?)(\d*\.?\d+)(%|px)?/g)) {
    const n = Number(num) * (sign === "-" ? -1 : 1);
    total += unit === "%" ? (n / 100) * size : n;
  }
  return total;
}

/** Splits `a b` at the top-level space, ignoring spaces inside calc(). */
function splitPoint(point: string): [string, string] {
  let depth = 0;
  for (let i = 0; i < point.length; i++) {
    const c = point[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === " " && depth === 0) return [point.slice(0, i), point.slice(i + 1)];
  }
  return [point, "0"];
}

/**
 * The neon edge of a hollow CyberFrame: the edge paint (`className`) masked down to a line
 * that traces the clip polygon, so whatever is behind the frame shows through its middle.
 */
export function CyberEdge({
  clipPath,
  className,
}: {
  clipPath: string;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const points = clipPath
      .replace(/^polygon\(|\)$/g, "")
      .split(",")
      .map((p) => splitPoint(p.trim()));
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const pts = points
        .map(([x, y]) => `${coord(x, w).toFixed(1)},${coord(y, h).toFixed(1)}`)
        .join(" ");
      // Stroke 2px on the outline; the clip on the parent cuts the outer half away.
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><polygon points="${pts}" fill="none" stroke="#fff" stroke-width="2"/></svg>`;
      const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
      el.style.maskImage = url;
      el.style.webkitMaskImage = url;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [clipPath]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 [mask-size:100%_100%] [mask-repeat:no-repeat] ${className}`}
    />
  );
}
