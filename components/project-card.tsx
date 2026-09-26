import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pick } from "@/content/i18n";
import type { Project } from "@/content/data/projects";

const accent: Record<
  Project["accent"],
  { ring: string; glow: string; text: string; bg: string }
> = {
  pink: {
    ring: "group-hover:border-neon-pink/70",
    glow: "group-hover:shadow-neon-pink",
    text: "text-neon-pink",
    bg: "from-neon-pink/30",
  },
  cyan: {
    ring: "group-hover:border-neon-cyan/70",
    glow: "group-hover:shadow-neon-cyan",
    text: "text-neon-cyan",
    bg: "from-neon-cyan/25",
  },
  violet: {
    ring: "group-hover:border-neon-violet/80",
    glow: "",
    text: "text-neon-violet",
    bg: "from-neon-violet/40",
  },
  sun: {
    ring: "group-hover:border-neon-sun/70",
    glow: "",
    text: "text-neon-sun",
    bg: "from-neon-sun/30",
  },
  yellow: {
    ring: "group-hover:border-neon-yellow/70",
    glow: "",
    text: "text-neon-yellow",
    bg: "from-neon-yellow/25",
  },
};

type Props = { project: Project; index?: number; priority?: boolean };

/** A project as a small CRT: screenshot behind glass with scanlines, details below. */
export function ProjectCard({ project, index = 0, priority = false }: Props) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const a = accent[project.accent];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-night-800/70 transition duration-300 hover:-translate-y-1 ${a.ring} ${a.glow}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-night-950">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-top transition duration-700 group-hover:scale-105"
          />
        ) : (
          <PrivateArt label={project.title} accent={project.accent} />
        )}
        <span className="absolute top-3 left-3 rounded-md bg-night-950/80 px-2 py-0.5 font-mono text-[11px] tracking-widest text-ink-200 uppercase backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`absolute top-3 right-3 rounded-md bg-night-950/80 px-2 py-0.5 font-mono text-[11px] tracking-widest uppercase backdrop-blur ${a.text}`}
        >
          {project.kind === "personal" ? t("filterPersonal") : project.year}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-ink-100">
          {project.title}
        </h3>
        {project.client ? (
          <p className="mt-0.5 text-sm text-ink-400">{project.client}</p>
        ) : null}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-200">
          {pick(project.tagline, locale)}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-ink-300"
              >
                {item}
              </li>
            ))}
          </ul>
          <span
            className={`shrink-0 font-mono text-[11px] tracking-widest uppercase ${a.text} opacity-0 transition group-hover:opacity-100`}
          >
            {t("open")} &rarr;
          </span>
        </div>
      </div>
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
        <span className="mt-1 block font-mono text-[10px] tracking-widest text-ink-400 uppercase">
          private system
        </span>
      </div>
    </div>
  );
}
