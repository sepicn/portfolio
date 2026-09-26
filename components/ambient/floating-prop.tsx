import Image from "next/image";
import { Tilt } from "@/components/motion/tilt";

const glows = {
  pink: "bg-neon-pink/40",
  cyan: "bg-neon-cyan/35",
  sun: "bg-neon-sun/40",
  violet: "bg-neon-violet/45",
} as const;

type Props = {
  /** A transparent render from blender/render_props.py, in /images/props. */
  src: string;
  glow?: keyof typeof glows;
  className?: string;
  priority?: boolean;
  /** Offsets the float cycle so props on one page do not bob in sync. */
  delay?: number;
};

/**
 * A prop from the 3D office floating next to a section: it bobs slowly, tilts towards the
 * pointer and sits on a pulsing neon glow. Decorative only, so it is hidden from assistive tech.
 */
export function FloatingProp({
  src,
  glow = "pink",
  className = "",
  priority,
  delay = 0,
}: Props) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <div
        className={`absolute inset-[20%] animate-glow rounded-full blur-3xl ${glows[glow]}`}
        style={{ animationDelay: `${delay}s` }}
      />
      <Tilt max={12} className="relative size-full">
        <div
          className="relative size-full animate-float"
          style={{ animationDelay: `${delay}s` }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) 60vw, 360px"
            className="object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)]"
          />
        </div>
      </Tilt>
    </div>
  );
}
