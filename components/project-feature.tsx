import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/motion/parallax";
import { Tilt } from "@/components/motion/tilt";
import { PrivateArt } from "@/components/project-card";
import { pick, pickList } from "@/content/i18n";
import type { Project } from "@/content/data/projects";

const accentText: Record<Project["accent"], string> = {
  pink: "text-neon-pink",
  cyan: "text-neon-cyan",
  violet: "text-neon-violet",
  sun: "text-neon-sun",
  yellow: "text-neon-yellow",
};

type Props = { project: Project; index: number };

/**
 * A magazine row: the screenshot sits in a monitor frame on one side and slides in from
 * there, the story slides in from the other side. Rows alternate direction.
 */
export function ProjectFeature({ project, index }: Props) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const flip = index % 2 === 1;

  return (
    <article className={`grid items-center gap-10 lg:grid-cols-12 ${flip ? "" : ""}`}>
      <Reveal
        from={flip ? "right" : "left"}
        className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <Parallax distance={40}>
          <Tilt max={5}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative rounded-2xl border border-white/10 bg-night-900 p-2 shadow-2xl shadow-black/50 transition group-hover:border-white/25">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-night-950">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PrivateArt label={project.title} accent={project.accent} />
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between px-2 pb-1 font-mono text-[10px] tracking-widest text-ink-400 uppercase">
                  <span>
                    {project.links.live?.replace(/^https?:\/\/(www\.)?/, "") ??
                      "internal"}
                  </span>
                  <span className="flex gap-1">
                    <span className="size-1.5 rounded-full bg-neon-red" />
                    <span className="size-1.5 rounded-full bg-neon-yellow" />
                    <span className="size-1.5 rounded-full bg-neon-green" />
                  </span>
                </div>
              </div>
            </Link>
          </Tilt>
        </Parallax>
      </Reveal>

      <Reveal
        from={flip ? "left" : "right"}
        delay={0.1}
        className={`lg:col-span-5 ${flip ? "lg:order-1 lg:text-right" : ""}`}
      >
        <p
          className={`font-mono text-xs tracking-[0.3em] uppercase ${accentText[project.accent]}`}
        >
          {String(index + 1).padStart(2, "0")} &middot;{" "}
          {project.client ?? t("filterPersonal")} &middot; {project.year}
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 text-lg text-ink-200">{pick(project.tagline, locale)}</p>
        <ul className={`mt-5 space-y-2 text-sm text-ink-300 ${flip ? "lg:ml-auto" : ""}`}>
          {pickList(project.did, locale)
            .slice(0, 2)
            .map((item) => (
              <li
                key={item}
                className={`flex gap-3 ${flip ? "lg:flex-row-reverse" : ""}`}
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon-pink shadow-neon-pink" />
                <span>{item}</span>
              </li>
            ))}
        </ul>
        <ul className={`mt-5 flex flex-wrap gap-1.5 ${flip ? "lg:justify-end" : ""}`}>
          {project.stack.slice(0, 5).map((item) => (
            <li
              key={item}
              className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-ink-200"
            >
              {item}
            </li>
          ))}
        </ul>
        <div
          className={`mt-6 flex gap-4 font-mono text-xs tracking-widest uppercase ${flip ? "lg:justify-end" : ""}`}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="text-neon-cyan hover:underline"
          >
            {t("open")}{" "}
            <ArrowRightIcon
              aria-hidden="true"
              className="inline size-4 align-[-3px] transition group-hover:translate-x-0.5"
            />
          </Link>
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener"
              className="text-ink-400 hover:text-ink-100"
            >
              {t("live")} ↗
            </a>
          ) : null}
        </div>
      </Reveal>
    </article>
  );
}
