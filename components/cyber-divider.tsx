/**
 * Decorative dividers drawn as circuit traces instead of a flat border: runs of line at three
 * heights joined by 45° jogs, with notches, tick marks, diamonds and breaks. Each variant is a
 * different trace; the jogs and glyphs keep a fixed size while the runs stretch, so the angles
 * stay true at any width.
 */

type Level = "t" | "m" | "b";
type Piece =
  | ["line", number, Level] // stretching run: flex-grow, height
  | ["dash", number, Level] // dashed run
  | ["jog", Level, Level] // 45° step between two heights
  | ["notch"] // V dip from the middle line
  | ["bump"] // square bump up from the middle line
  | ["ticks"] // three slanted accent bars
  | ["diamond"] // hollow accent diamond on the middle line
  | ["gap"]; // a short break in the trace

const Y: Record<Level, number> = { t: 0.5, m: 5.5, b: 10.5 };
const self: Record<Level, string> = { t: "self-start", m: "self-center", b: "self-end" };

const variants: Piece[][] = [
  [["line", 1, "t"], ["jog", "t", "b"], ["line", 5, "b"], ["ticks"], ["line", 1, "b"]],
  [["line", 3, "m"], ["notch"], ["line", 1, "m"], ["gap"], ["dash", 2, "m"], ["diamond"]],
  [
    ["diamond"],
    ["line", 2, "b"],
    ["jog", "b", "t"],
    ["line", 1, "t"],
    ["jog", "t", "b"],
    ["line", 4, "b"],
  ],
  [["ticks"], ["line", 6, "m"], ["jog", "m", "b"], ["dash", 1, "b"]],
  [
    ["line", 2, "t"],
    ["jog", "t", "m"],
    ["line", 3, "m"],
    ["bump"],
    ["line", 1, "m"],
    ["jog", "m", "t"],
    ["line", 1, "t"],
  ],
  [
    ["dash", 1, "m"],
    ["gap"],
    ["line", 4, "m"],
    ["diamond"],
    ["line", 4, "m"],
    ["gap"],
    ["dash", 1, "m"],
  ],
  [["line", 4, "b"], ["jog", "b", "t"], ["line", 2, "t"], ["notch"], ["ticks"]],
  [
    ["line", 1, "m"],
    ["bump"],
    ["line", 1, "m"],
    ["bump"],
    ["line", 7, "m"],
    ["jog", "m", "t"],
    ["line", 1, "t"],
  ],
];

export const CYBER_DIVIDERS = variants.length;

const accents = ["text-neon-pink", "text-neon-cyan", "text-neon-violet", "text-neon-sun"];

function Glyph({ piece, accent }: { piece: Piece; accent: string }) {
  const svg = (w: number, body: React.ReactNode, className = "") => (
    <svg
      width={w}
      height="11"
      viewBox={`0 0 ${w} 11`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`shrink-0 overflow-visible ${className}`}
    >
      {body}
    </svg>
  );
  switch (piece[0]) {
    case "line":
      return (
        <span
          className={`h-px bg-current ${self[piece[2]]}`}
          style={{ flexGrow: piece[1] }}
        />
      );
    case "dash":
      return (
        <span
          className={`h-px bg-[repeating-linear-gradient(90deg,currentColor_0_6px,transparent_6px_10px)] ${self[piece[2]]}`}
          style={{ flexGrow: piece[1] }}
        />
      );
    case "jog":
      return svg(
        10,
        <path
          d={`M0 ${Y[piece[1]]}L${Math.abs(Y[piece[1]] - Y[piece[2]])} ${Y[piece[2]]}H10`}
        />,
      );
    case "notch":
      return svg(22, <path d="M0 5.5H5L10 10.5H12L17 5.5H22" />);
    case "bump":
      return svg(18, <path d="M0 5.5H4V0.5H14V5.5H18" />);
    case "ticks":
      return svg(
        22,
        <g fill="currentColor" stroke="none" opacity="0.85">
          <path d="M3 11L6 0H8L5 11Z" />
          <path d="M10 11L13 0H15L12 11Z" opacity="0.6" />
          <path d="M17 11L20 0H22L19 11Z" opacity="0.3" />
        </g>,
        `mx-1 ${accent}`,
      );
    case "diamond":
      return svg(12, <path d="M6 1L11 5.5L6 10L1 5.5Z" />, `mx-1 ${accent}`);
    case "gap":
      return <span className="w-2 shrink-0" />;
  }
}

type Props = {
  variant?: number;
  /** Colour of the trace itself; the accent glyphs take a neon colour by variant. */
  className?: string;
};

/** A shaped, purely decorative divider. Place it where a border-t used to be. */
export function CyberDivider({ variant = 0, className = "text-white/15" }: Props) {
  const v = ((variant % variants.length) + variants.length) % variants.length;
  const accent = accents[variant % accents.length];
  return (
    <div aria-hidden="true" className={`flex h-[11px] w-full items-stretch ${className}`}>
      {variants[v].map((piece, i) => (
        <Glyph key={i} piece={piece} accent={accent} />
      ))}
    </div>
  );
}
