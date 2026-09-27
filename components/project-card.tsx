import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projectHref } from "@/i18n/paths";
import { pick, pickList } from "@/content/i18n";
import type { Project } from "@/content/data/projects";
import { CyberFrame, cyberFlip } from "@/components/cyber-frame";

const accent: Record<
  Project["accent"],
  { ring: string; text: string; bg: string; glow: string }
> = {
  pink: {
    ring: "group-hover:bg-neon-pink/80",
    text: "text-neon-pink",
    bg: "from-neon-pink/30",
    glow: "rgba(255, 45, 149, 0.55)",
  },
  cyan: {
    ring: "group-hover:bg-neon-cyan/80",
    text: "text-neon-cyan",
    bg: "from-neon-cyan/25",
    glow: "rgba(0, 229, 255, 0.5)",
  },
  violet: {
    ring: "group-hover:bg-neon-violet/90",
    text: "text-neon-lilac",
    bg: "from-neon-violet/40",
    glow: "rgba(138, 43, 226, 0.6)",
  },
  sun: {
    ring: "group-hover:bg-neon-sun/80",
    text: "text-neon-sun",
    bg: "from-neon-sun/30",
    glow: "rgba(255, 140, 66, 0.5)",
  },
  yellow: {
    ring: "group-hover:bg-neon-yellow/80",
    text: "text-neon-yellow",
    bg: "from-neon-yellow/25",
    glow: "rgba(255, 214, 10, 0.45)",
  },
};

type Props = {
  project: Project;
  index?: number;
  priority?: boolean;
  /**
   * "wide" lays the screenshot beside the text from md up, for two-column grids. "ring" is
   * the same arrangement at feature size, with what was done and the link always shown,
   * for the large cards of a RingCarousel.
   */
  layout?: "tall" | "wide" | "ring";
};

/** A project as a sharp-cut terminal panel: screenshot behind glass, details beside or below. */
export function ProjectCard({
  project,
  index = 0,
  priority = false,
  layout = "tall",
}: Props) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const a = accent[project.accent];
  const ring = layout === "ring";
  const wide = layout === "wide" || ring;
  const flip = wide && cyberFlip(index);

  return (
    <Link
      href={projectHref(project.slug)}
      className="group relative block h-full transition duration-300 hover:-translate-y-1 hover:[filter:drop-shadow(0_0_14px_var(--glow))]"
      style={{ "--glow": a.glow } as React.CSSProperties}
    >
      {/* sharp-cut panel with a 1px edge that follows the cut */}
      <CyberFrame
        variant={index}
        edgeClassName={`h-full ${a.ring}`}
        className={`flex flex-col overflow-hidden bg-night-800 ${
          wide ? (flip ? "md:flex-row-reverse" : "md:flex-row") : ""
        }`}
      >
        <div
          className={`relative aspect-[16/10] shrink-0 overflow-hidden border-white/10 bg-night-950 ${
            wide
              ? `border-b md:aspect-auto md:border-b-0 ${ring ? "md:min-h-96 md:w-[52%]" : "md:min-h-60 md:w-[46%]"} ${flip ? "md:border-l" : "md:border-r"}`
              : "border-b"
          }`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              preload={priority}
              sizes={
                wide
                  ? ring
                    ? "(max-width: 768px) 100vw, 520px"
                    : "(max-width: 768px) 100vw, 30vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              }
              // The large ring cards show the whole screenshot, letterboxed, never cropped.
              className={`transition duration-700 group-hover:scale-105 ${ring ? "object-contain p-3" : "object-cover object-top"}`}
            />
          ) : (
            <PrivateArt label={project.title} accent={project.accent} />
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0_1px,transparent_1px_3px)] opacity-60"
          />
          <span
            className={`absolute bottom-3 ${flip ? "right-3" : "left-3"} bg-night-950/85 px-2 py-0.5 font-mono text-xs tracking-widest text-ink-200 uppercase backdrop-blur [clip-path:polygon(6px_0,100%_0,100%_100%,0_100%,0_6px)]`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`relative flex flex-1 flex-col p-5 sm:p-6 ${ring ? "lg:p-8" : ""}`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className={`font-mono text-xs tracking-[0.25em] uppercase ${a.text}`}>
              {project.kind === "personal" ? t("filterPersonal") : project.year}
            </span>
            <span aria-hidden="true" className={`flex gap-1 ${a.text}`}>
              <i className="block h-2.5 w-1 -skew-x-[20deg] bg-current opacity-90" />
              <i className="block h-2.5 w-1 -skew-x-[20deg] bg-current opacity-60" />
              <i className="block h-2.5 w-1 -skew-x-[20deg] bg-current opacity-30" />
            </span>
          </div>
          <h3
            className={`mt-2 font-display font-semibold text-ink-100 ${ring ? "text-2xl lg:text-3xl" : "text-xl"}`}
          >
            {project.title}
          </h3>
          {project.client ? (
            <p className="mt-0.5 text-sm text-ink-400">{project.client}</p>
          ) : null}
          <p
            className={`mt-3 leading-relaxed text-ink-200 ${ring ? "text-base" : "flex-1 text-sm"}`}
          >
            {pick(project.tagline, locale)}
          </p>
          {ring ? (
            <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-300">
              {pickList(project.did, locale)
                .slice(0, 2)
                .map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon-pink shadow-neon-pink" />
                    <span className="line-clamp-2">{item}</span>
                  </li>
                ))}
            </ul>
          ) : null}
          <div className="mt-4 flex items-end justify-between gap-3">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, ring ? 5 : 3).map((item) => (
                <li
                  key={item}
                  className="border border-white/10 notch-one px-2 py-0.5 font-mono text-xs text-ink-300 [--n:5px] [--nc:rgba(255,255,255,0.1)]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <span
              className={`shrink-0 font-mono text-xs tracking-widest uppercase ${a.text} transition ${ring ? "" : "opacity-0 group-hover:opacity-100"}`}
            >
              {t("open")}{" "}
              <ArrowRightIcon
                aria-hidden="true"
                className="inline size-4 align-[-3px] transition group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </CyberFrame>
    </Link>
  );
}

/** For client systems that cannot be shown: a synthwave grid with the project name on it. */
export function PrivateArt({
  label,
  accent: key,
}: {
  label: string;
  accent: Project["accent"];
}) {
  const a = accent[key];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b ${a.bg} to-night-950`} />
      <div className="absolute inset-x-0 bottom-0 h-3/5 grid-floor" />
      <div className="absolute top-[22%] left-1/2 size-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-yellow to-neon-pink opacity-80 blur-[1px]" />
      <div className="absolute inset-x-0 bottom-6 text-center">
        <span className={`font-mono text-xs tracking-[0.3em] uppercase ${a.text}`}>
          {label}
        </span>
        <span className="mt-1 block font-mono text-xs tracking-widest text-ink-400 uppercase">
          private system
        </span>
      </div>
    </div>
  );
}
