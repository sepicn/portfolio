"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { scrollPageTo } from "@/components/smooth-scroll";

/** Which way the page moves during a turn: "up" means the next face rolls in from below. */
export type CubeTurn = "up" | "right" | "down" | "left";

type Props = {
  faces: React.ReactNode[];
  /** Direction of each turn, cycled when there are more turns than entries. */
  turns?: CubeTurn[];
  /** Scroll distance per turn, in viewport heights. */
  perFace?: number;
};

const MOTION = "(prefers-reduced-motion: no-preference)";

// Where the next face comes from, shown in each face's corner.
const ARRIVES: Record<CubeTurn, string> = { up: "↓", right: "←", down: "↑", left: "→" };

// Axis and sign of each turn. The outgoing face rotates from 0 to sign * 90 degrees, the
// incoming one from -sign * 90 to 0, both around the centre of a cube the size of the screen.
const AXES: Record<CubeTurn, { axis: "X" | "Y"; sign: 1 | -1 }> = {
  up: { axis: "X", sign: 1 },
  down: { axis: "X", sign: -1 },
  right: { axis: "Y", sign: 1 },
  left: { axis: "Y", sign: -1 },
};

/**
 * Scroll-driven full-screen cube. The block pins and every face is a side of a cube that
 * turns a quarter per step, each turn in its own direction (by default up, right, down,
 * left). The cube backs off a little in the middle of a turn so its edges stay on screen,
 * and the face turning away darkens. Snap points make every face settle square to the
 * screen. Every face wears the same neon HUD (grid, glowing edges, corner brackets, a scan
 * line, its number and where the next face comes from), so a turn reads as one cube. It runs
 * on phones too, where faces drop their longer details to fit ([data-cube-compact] in
 * globals.css). With reduced motion the faces are plain stacked blocks.
 *
 * As in SlideDeck, ScrollTrigger pins an inner div so React keeps owning the outer one.
 * Reveal and Parallax skip anything inside [data-cube-face]: the faces are
 * turned out of view, so their own scroll triggers would fire at the wrong time.
 */
export function CubeDeck({
  faces,
  turns = ["up", "right", "down", "left"],
  perFace = 1,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const turnKey = turns.join(",");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const sequence = turnKey.split(",") as CubeTurn[];
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const items = Array.from(el.querySelectorAll<HTMLElement>("[data-cube-face]"));
        const shades = items.map((face) =>
          face.querySelector<HTMLElement>("[data-cube-shade]"),
        );
        if (items.length < 2) return;
        const steps = items.length - 1;
        let width = el.clientWidth;
        let height = el.clientHeight;
        let progress = 0;

        const place = (face: HTMLElement, turn: CubeTurn, angle: number, dip: number) => {
          const { axis } = AXES[turn];
          const half = (axis === "X" ? height : width) / 2;
          face.style.transform = `translateZ(${-half - dip * half * 0.6}px) rotate${axis}(${angle}deg) translateZ(${half}px)`;
        };

        // Faces out of view are faded, not hidden: visibility:hidden or inert would drop them
        // from the accessibility tree, and screen readers and AI agents would only read the
        // first face. Keyboard focus on a faded face turns the cube to it (focusIn below).
        const show = (face: HTMLElement, on: boolean) => {
          face.style.opacity = on ? "1" : "0";
          face.style.pointerEvents = on ? "auto" : "none";
        };

        const render = () => {
          const from = Math.min(Math.floor(progress), steps - 1);
          const p = progress - from;
          const turn = sequence[from % sequence.length];
          const { sign } = AXES[turn];
          const dip = Math.sin(p * Math.PI);
          items.forEach((face, i) => {
            const shade = shades[i];
            if (i === from) {
              place(face, turn, sign * 90 * p, dip);
              if (shade) shade.style.opacity = String(p * 0.8);
              show(face, p < 1);
            } else if (i === from + 1) {
              place(face, turn, -sign * 90 * (1 - p), dip);
              if (shade) shade.style.opacity = String((1 - p) * 0.8);
              show(face, p > 0);
            } else {
              show(face, false);
            }
          });
        };

        const measure = () => {
          width = el.clientWidth;
          height = el.clientHeight;
          el.style.perspective = `${Math.max(width, height) * 1.4}px`;
          render();
        };
        measure();

        const proxy = { progress: 0 };
        const tween = gsap.to(proxy, {
          progress: steps,
          ease: "none",
          onUpdate: () => {
            progress = proxy.progress;
            render();
          },
          scrollTrigger: {
            trigger: el,
            start: "top top+=64",
            end: () => `+=${steps * perFace * window.innerHeight}`,
            pin: true,
            scrub: 0.8,
            snap: {
              snapTo: 1 / steps,
              duration: { min: 0.25, max: 0.7 },
              ease: "power2.inOut",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: measure,
          },
        });

        const trigger = tween.scrollTrigger!;
        const focusIn = (e: FocusEvent) => {
          const i = items.findIndex((face) => face.contains(e.target as Node));
          if (i < 0) return;
          scrollPageTo(trigger.start + (i / steps) * (trigger.end - trigger.start));
        };
        el.addEventListener("focusin", focusIn);

        return () => {
          el.removeEventListener("focusin", focusIn);
          tween.scrollTrigger?.kill();
          tween.kill();
          el.style.perspective = "";
          items.forEach((face, i) => {
            face.style.transform = "";
            face.style.opacity = "";
            face.style.pointerEvents = "";
            const shade = shades[i];
            if (shade) shade.style.opacity = "";
          });
        };
      });
      cleanup = () => mm.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [perFace, turnKey]);

  const sequence = turnKey.split(",") as CubeTurn[];
  const total = String(faces.length).padStart(2, "0");

  return (
    <div>
      <div
        ref={root}
        className="relative h-[calc(100svh-4rem)] overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible"
      >
        {/* Overflow flattens 3D, so the shared 3D space (depth sorting, back faces) lives
            on this inner layer rather than on the clipping element above. */}
        <div className="absolute inset-0 [transform-style:preserve-3d] motion-reduce:static motion-reduce:space-y-28">
          {faces.map((face, i) => (
            <div
              key={i}
              data-cube-face
              // Until the script places them, only the first face shows.
              className={`cube-face absolute inset-0 flex items-center [backface-visibility:hidden] motion-reduce:relative motion-reduce:inset-auto motion-reduce:block ${i > 0 ? "pointer-events-none opacity-0 motion-reduce:pointer-events-auto motion-reduce:opacity-100" : ""}`}
            >
              <div aria-hidden="true" className="cube-hud motion-reduce:hidden">
                <span className="cube-corner top-3 left-3 border-t-2 border-l-2" />
                <span className="cube-corner top-3 right-3 border-t-2 border-r-2" />
                <span className="cube-corner bottom-3 left-3 border-b-2 border-l-2" />
                <span className="cube-corner right-3 bottom-3 border-r-2 border-b-2" />
                <span className="cube-scan" />
                <span className="absolute top-5 left-8 font-mono text-[10px] tracking-[0.3em] text-neon-cyan/70">
                  CUBE // {String(i + 1).padStart(2, "0")}—{total}
                </span>
                <span className="absolute top-6 right-8 flex gap-1">
                  {faces.map((_, j) => (
                    <i
                      key={j}
                      className={`block h-1 w-5 -skew-x-[30deg] ${j === i ? "bg-neon-pink shadow-neon-pink" : "bg-white/15"}`}
                    />
                  ))}
                </span>
                {i < faces.length - 1 ? (
                  <span className="absolute right-8 bottom-5 font-mono text-[10px] tracking-[0.3em] text-neon-cyan/70">
                    NEXT{" "}
                    <b className="cube-next text-sm text-neon-pink">
                      {ARRIVES[sequence[i % sequence.length]]}
                    </b>
                  </span>
                ) : null}
              </div>
              <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">{face}</div>
              <div
                data-cube-shade
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black opacity-0 motion-reduce:hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
