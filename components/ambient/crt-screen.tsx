"use client";

import { useEffect, useRef, useState } from "react";

type Point = [number, number];
export type Quad = { tl: Point; tr: Point; br: Point; bl: Point };

/** Screen content is laid out at this size, then projected onto the quad. */
const W = 320;
const H = 240;

/**
 * CSS matrix3d that maps a W x H box onto four corners (in pixels), i.e. the perspective
 * transform from a rectangle to an arbitrary quadrilateral.
 */
function quadMatrix([x0, y0]: Point, [x1, y1]: Point, [x2, y2]: Point, [x3, y3]: Point) {
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const h = (dx1 * dy3 - dx3 * dy1) / det;
  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + h * x3;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + h * y3;
  return `matrix3d(${a / W},${d / W},0,${g / W},${b / H},${e / H},0,${h / H},0,0,1,0,${x0},${y0},0,1)`;
}

/**
 * An animated synthwave picture fitted onto the monitor screen of a prop render: the sun
 * pulses, the grid rolls towards the viewer, scanlines and a faint flicker sell the CRT.
 * `quad` is the screen's corners in percent of the image (from blender/render_props.py).
 */
export function CrtScreen({ quad }: { quad: Quad }) {
  const box = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const px = ([x, y]: Point): Point => [(x / 100) * width, (y / 100) * height];
      setTransform(quadMatrix(px(quad.tl), px(quad.tr), px(quad.br), px(quad.bl)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [quad]);

  return (
    <div ref={box} className="pointer-events-none absolute inset-0" aria-hidden="true">
      {transform ? (
        <div
          className="absolute top-0 left-0 origin-top-left overflow-hidden rounded-[18px] bg-[radial-gradient(ellipse_at_50%_40%,#3b0f5c,#0b0418_75%)]"
          style={{ width: W, height: H, transform }}
        >
          <div className="absolute top-[18%] left-1/2 size-28 -translate-x-1/2 animate-glow rounded-full bg-gradient-to-b from-neon-yellow via-neon-sun to-neon-pink [mask-image:repeating-linear-gradient(to_bottom,#000_0_9px,transparent_9px_12px)]" />
          <div className="absolute inset-x-0 top-[52%] h-px bg-neon-pink shadow-neon-pink" />
          <div className="absolute inset-x-[-40%] bottom-0 h-[48%] origin-top [transform:perspective(120px)_rotateX(50deg)] animate-grid grid-floor" />
          <div className="absolute inset-0 animate-flicker bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.28)_0_2px,transparent_2px_4px)]" />
          <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_0_40px_rgba(0,0,0,0.85)]" />
        </div>
      ) : null}
    </div>
  );
}
