import Image from "next/image";
import { MarqueeBand } from "./marquee-band";

/**
 * A ticker item is a word, a word with a logo (an SVG path on a 24 unit grid, e.g. from
 * simple-icons), a client logo linking to its site (drawn as a white silhouette, no text) or
 * a small render from the room (public/images/icons).
 */
export type MarqueeItem =
  | string
  | { icon: string; label: string }
  | { logo: string; label: string }
  | { image: string; label: string; href: string };

// Logos cycle through the neon palette instead of their brand colours, with a matching glow.
const logoColours = [
  "text-neon-pink drop-shadow-[0_0_6px_rgba(255,45,149,0.7)]",
  "text-neon-cyan drop-shadow-[0_0_6px_rgba(0,229,255,0.7)]",
  "text-neon-yellow drop-shadow-[0_0_6px_rgba(255,214,10,0.6)]",
  "text-[#b026ff] drop-shadow-[0_0_6px_rgba(176,38,255,0.8)]",
  "text-neon-sun drop-shadow-[0_0_6px_rgba(255,140,66,0.7)]",
];

// Items per copy of the row; enough to span a wide monitor even with short words.
const MIN_ITEMS = 16;

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
 * An endless neon ticker. Pure CSS animation, static under reduced motion. It pauses on
 * hover and can be dragged left and right (MarqueeBand). A ticker with links stays in the
 * accessibility tree; a purely decorative one is hidden from it.
 */
export function Marquee({
  items,
  reverse = false,
  className = "",
  variant = "line",
}: Props) {
  // Short lists repeat until one copy is wider than any screen, then the copy is doubled so
  // the band can loop it seamlessly.
  const copy = Array.from(
    { length: Math.ceil(MIN_ITEMS / items.length) },
    () => items,
  ).flat();
  const row = [...copy, ...copy];
  const look = looks[variant];
  const hasLinks = items.some((item) => typeof item !== "string" && "href" in item);
  return (
    <div
      className={`overflow-hidden ${look.frame} ${className}`}
      aria-hidden={hasLinks ? undefined : true}
    >
      <MarqueeBand className={look.band} reverse={reverse}>
        <div className={`relative flex w-max ${look.gap}`}>
          {row.map((item, i) =>
            typeof item === "string" ? (
              <span
                key={`${item}-${i}`}
                className={`flex items-center uppercase ${look.gap} ${look.item}`}
              >
                {item}
                {look.sep}
              </span>
            ) : "image" in item ? (
              <span
                key={`${item.label}-${i}`}
                className={`flex items-center ${look.gap}`}
              >
                <a
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  // The second copy only exists to make the loop seamless.
                  tabIndex={i < items.length ? undefined : -1}
                  aria-hidden={i < items.length ? undefined : true}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block rounded-sm transition-transform hover:scale-110 focus-visible:scale-110"
                >
                  <Image
                    src={item.image}
                    alt=""
                    width={512}
                    height={128}
                    sizes="256px"
                    draggable={false}
                    className="h-9 w-auto max-w-56 object-contain brightness-0 drop-shadow-[0_0_8px_rgba(255,45,149,0.9)] invert"
                  />
                </a>
                {look.sep}
              </span>
            ) : "logo" in item ? (
              <span
                key={`${item.label}-${i}`}
                className={`flex items-center uppercase ${look.gap} ${look.item}`}
              >
                <span className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className={`size-5 shrink-0 fill-current ${logoColours[(i % items.length) % logoColours.length]}`}
                  >
                    <path d={item.logo} />
                  </svg>
                  {item.label}
                </span>
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
