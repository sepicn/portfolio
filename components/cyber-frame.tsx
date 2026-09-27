import type { CSSProperties, ReactNode } from "react";
import { CyberEdge } from "./cyber-edge";

/**
 * Hard-edged cyberpunk silhouettes shared by every panel on the site. Each is a clip-path
 * polygon built from a scale factor, so the same shape works on a big card (scale 1) and a
 * small row or chip (scale 0.5). `flip` tells layouts with a side image which side the
 * shape leaves room for.
 */
type Shape = { flip: boolean; clip: (px: (n: number) => string) => string };

const shapes: Shape[] = [
  // chamfered top-left and bottom-right
  {
    flip: false,
    clip: (p) =>
      `polygon(${p(26)} 0,100% 0,100% calc(100% - ${p(26)}),calc(100% - ${p(26)}) 100%,0 100%,0 ${p(26)})`,
  },
  // chamfered top-right and bottom-left
  {
    flip: true,
    clip: (p) =>
      `polygon(0 0,calc(100% - ${p(26)}) 0,100% ${p(26)},100% 100%,${p(26)} 100%,0 calc(100% - ${p(26)}))`,
  },
  // tab on the top edge, cut bottom-right
  {
    flip: true,
    clip: (p) =>
      `polygon(0 0,42% 0,calc(42% + ${p(12)}) ${p(12)},100% ${p(12)},100% calc(100% - ${p(34)}),calc(100% - ${p(34)}) 100%,0 100%)`,
  },
  // all four corners clipped
  {
    flip: false,
    clip: (p) =>
      `polygon(${p(14)} 0,calc(100% - ${p(14)}) 0,100% ${p(14)},100% calc(100% - ${p(14)}),calc(100% - ${p(14)}) 100%,${p(14)} 100%,0 calc(100% - ${p(14)}),0 ${p(14)})`,
  },
  // deep top-left cut, stepped notch along the bottom
  {
    flip: false,
    clip: (p) =>
      `polygon(${p(44)} 0,100% 0,100% calc(100% - ${p(14)}),calc(64% + ${p(14)}) calc(100% - ${p(14)}),64% 100%,0 100%,0 ${p(44)})`,
  },
  // top-right cut, notch in the left edge
  {
    flip: true,
    clip: (p) =>
      `polygon(0 0,calc(100% - ${p(38)}) 0,100% ${p(38)},100% 100%,0 100%,0 66%,${p(9)} calc(66% - ${p(9)}),${p(9)} 34%,0 calc(34% - ${p(9)}))`,
  },
  // dropped top-right shoulder, raised bottom-left heel
  {
    flip: false,
    clip: (p) =>
      `polygon(0 0,calc(100% - ${p(64)}) 0,calc(100% - ${p(52)}) ${p(12)},100% ${p(12)},100% 100%,${p(46)} 100%,${p(34)} calc(100% - ${p(12)}),0 calc(100% - ${p(12)}))`,
  },
  // bite out of the right edge, small top-left cut
  {
    flip: true,
    clip: (p) =>
      `polygon(${p(12)} 0,100% 0,100% 28%,calc(100% - ${p(10)}) calc(28% + ${p(10)}),calc(100% - ${p(10)}) calc(72% - ${p(10)}),100% 72%,100% calc(100% - ${p(22)}),calc(100% - ${p(22)}) 100%,0 100%,0 ${p(12)})`,
  },
  // slanted top-left run into a raised header, square elsewhere but for a bottom-left cut
  {
    flip: false,
    clip: (p) =>
      `polygon(0 ${p(16)},30% ${p(16)},calc(30% + ${p(16)}) 0,100% 0,100% calc(100% - ${p(10)}),calc(100% - ${p(10)}) 100%,${p(30)} 100%,0 calc(100% - ${p(30)}))`,
  },
  // two stepped corners on opposite diagonals
  {
    flip: true,
    clip: (p) =>
      `polygon(0 0,calc(100% - ${p(30)}) 0,calc(100% - ${p(30)}) ${p(8)},calc(100% - ${p(8)}) ${p(8)},100% ${p(30)},100% 100%,${p(30)} 100%,${p(30)} calc(100% - ${p(8)}),${p(8)} calc(100% - ${p(8)}),0 calc(100% - ${p(30)}))`,
  },
  // notch in the top edge, chamfered bottom-left
  {
    flip: false,
    clip: (p) =>
      `polygon(0 0,58% 0,calc(58% + ${p(8)}) ${p(8)},calc(78% - ${p(8)}) ${p(8)},78% 0,100% 0,100% 100%,${p(28)} 100%,0 calc(100% - ${p(28)}))`,
  },
];

export const CYBER_SHAPES = shapes.length;

/** The clip-path for shape `variant`, with every cut multiplied by `scale`. */
export function cyberClip(variant: number, scale = 1) {
  const shape = shapes[((variant % shapes.length) + shapes.length) % shapes.length];
  return shape.clip((n) => `${Math.round(n * scale * 10) / 10}px`);
}

/** Whether shape `variant` reads best with a side image on the right. */
export function cyberFlip(variant: number) {
  return shapes[((variant % shapes.length) + shapes.length) % shapes.length].flip;
}

type Tone = "dim" | "faint" | "pink" | "cyan" | "violet" | "sun" | "spin";

/** The border layer's paint; hover colours come from the caller via `edgeClassName`. */
const tones: Record<Tone, string> = {
  dim: "bg-white/12",
  faint: "bg-white/7",
  pink: "bg-neon-pink/35",
  cyan: "bg-neon-cyan/35",
  violet: "bg-neon-violet/50",
  sun: "bg-neon-sun/35",
  spin: "cyber-spin",
};

type Props = {
  /** Picks the silhouette; neighbours should pass different values. */
  variant?: number;
  /** Multiplies every cut, 0.5 for rows and small boxes. */
  scale?: number;
  tone?: Tone;
  /** Element for the content layer (the outer one is always a div). */
  as?: "div" | "ul" | "ol" | "dl" | "figure" | "article" | "section";
  /** Classes for the outer, border-coloured layer: sizing, hover colour, transitions. */
  edgeClassName?: string;
  /** Classes for the content layer: background, padding, layout. */
  className?: string;
  style?: CSSProperties;
  /** Paint only the edge line, so the page shows through the middle (e.g. a cut-out portrait). */
  hollow?: boolean;
  children?: ReactNode;
};

/**
 * A panel cut to a cyberpunk silhouette with a 1px neon edge that follows the cut: the outer
 * layer is painted in the edge colour and clipped, the content layer sits 1px inside it with
 * the same clip. Put glows on a wrapper with `filter: drop-shadow`, which follows the clip.
 */
export function CyberFrame({
  variant = 0,
  scale = 1,
  tone = "dim",
  as: Tag = "div",
  edgeClassName = "",
  className = "",
  style,
  hollow = false,
  children,
}: Props) {
  const clipPath = cyberClip(variant, scale);
  if (hollow) {
    return (
      <div
        className={`relative p-px transition-colors duration-300 ${edgeClassName}`}
        style={{ clipPath }}
      >
        <CyberEdge clipPath={clipPath} className={tones[tone]} />
        <Tag className={`relative h-full ${className}`} style={{ ...style, clipPath }}>
          {children}
        </Tag>
      </div>
    );
  }
  return (
    <div
      className={`p-px transition-colors duration-300 ${tones[tone]} ${edgeClassName}`}
      style={{ clipPath }}
    >
      <Tag className={`relative h-full ${className}`} style={{ ...style, clipPath }}>
        {children}
      </Tag>
    </div>
  );
}
