import Image from "next/image";
import { MarqueeBand } from "./marquee-band";

/** A ticker item is a word, or a small render from the room (public/images/icons). */
export type MarqueeItem = string | { icon: string; label: string };

type Variant = "line" | "tape" | "caution" | "terminal" | "outline";

type Props = {
  items: MarqueeItem[];
  reverse?: boolean;
  className?: string;
  /** Each page gets its own ticker look; "tape" and "caution" run across at an angle. */
  variant?: Variant;
};

const looks: Record<
  Variant,
  { frame: string; band: string; item: string; gap: string; sep: React.ReactNode }
> = {
  line: {
    frame: "",
    band: "border-y border-white/5 py-4",
    item: "font-mono text-sm tracking-widest text-ink-400",
    gap: "gap-10",
    sep: <span className="size-1.5 rounded-full bg-neon-pink shadow-neon-pink" />,
  },
  // A pink strip of tape slapped across the page, tilted down to the right.
  tape: {
    frame: "py-8",
    band: "-mx-6 rotate-[-2deg] border-y-2 border-neon-pink bg-neon-pink/15 py-3 shadow-neon-pink",
    item: "font-display text-lg font-semibold tracking-[0.2em] text-neon-pink",
    gap: "gap-8",
    sep: <span className="size-2 rotate-45 bg-neon-pink" />,
  },
  // Yellow and black hazard tape, tilted the other way.
  caution: {
    frame: "py-8",
    band: "-mx-6 rotate-[1.5deg] bg-neon-yellow py-2.5 [box-shadow:0_0_24px_rgba(255,214,10,0.35)] before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-[repeating-linear-gradient(45deg,#0b0613_0_10px,transparent_10px_20px)] after:absolute after:inset-x-0 after:bottom-0 after:h-1.5 after:bg-[repeating-linear-gradient(45deg,#0b0613_0_10px,transparent_10px_20px)]",
    item: "font-mono text-sm font-bold tracking-[0.25em] text-night-950",
    gap: "gap-8",
    sep: <span className="font-mono text-sm font-bold text-night-950">{"///"}</span>,
  },
  // A status line from a terminal: cyan text, prompt arrows, faint scanlines.
  terminal: {
    frame: "",
    band: "border-y border-neon-cyan/30 bg-night-950 py-3 bg-[repeating-linear-gradient(0deg,rgba(0,229,255,0.04)_0_1px,transparent_1px_3px)]",
    item: "font-mono text-sm tracking-widest text-neon-cyan [text-shadow:0_0_8px_rgba(0,229,255,0.6)]",
    gap: "gap-12",
    sep: <span className="font-mono text-sm text-neon-pink">&gt;_</span>,
  },
  // Big hollow letters (or room renders), the neon tube before it is lit, on a tilted strip.
  outline: {
    frame: "py-12",
    band: "-mx-6 rotate-[-3deg] border-y border-neon-violet/30 bg-night-900/70 py-5 shadow-[0_0_30px_rgba(176,38,255,0.12)]",
    item: "font-display text-4xl font-bold tracking-wide text-transparent [-webkit-text-stroke:1px_rgba(191,178,220,0.55)] sm:text-5xl",
    gap: "gap-10",
    sep: <span className="size-3 rounded-full border-2 border-neon-violet" />,
  },
};

/**
 * An endless neon ticker. Pure CSS animation, static under reduced motion. On hover it pauses
 * and follows the mouse left and right; touch drags it (MarqueeBand).
 */
export function Marquee({
  items,
  reverse = false,
  className = "",
  variant = "line",
}: Props) {
  const row = [...items, ...items];
  const look = looks[variant];
  return (
    <div className={`overflow-hidden ${look.frame} ${className}`} aria-hidden="true">
      <MarqueeBand className={look.band}>
        <div
          className={`relative flex w-max ${look.gap} ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        >
          {row.map((item, i) =>
            typeof item === "string" ? (
              <span
                key={`${item}-${i}`}
                className={`flex items-center uppercase ${look.gap} ${look.item}`}
              >
                {item}
                {look.sep}
              </span>
            ) : (
              <span
                key={`${item.label}-${i}`}
                className={`flex items-center ${look.gap}`}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={256}
                  height={256}
                  sizes="160px"
                  className="size-14 object-contain drop-shadow-[0_0_14px_rgba(176,38,255,0.35)] sm:size-20"
                />
                {look.sep}
              </span>
            ),
          )}
        </div>
      </MarqueeBand>
    </div>
  );
}
