import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projectHref } from "@/i18n/paths";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/motion/parallax";
import { Tilt } from "@/components/motion/tilt";
import { PrivateArt } from "@/components/project-card";
import { CyberFrame, cyberClip } from "@/components/cyber-frame";
import { pick, pickList } from "@/content/i18n";
import type { Project } from "@/content/data/projects";

const accentText: Record<Project["accent"], string> = {
  pink: "text-neon-pink",
  cyan: "text-neon-cyan",
  violet: "text-neon-lilac",
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
    <article className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
      <Reveal
        from={flip ? "right" : "left"}
        className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <Parallax distance={40}>
          <Tilt max={5}>
            <Link
              href={projectHref(project.slug)}
              className="group block [filter:drop-shadow(0_24px_36px_rgba(0,0,0,0.5))]"
            >
              <CyberFrame
                variant={[8, 1, 6, 9][index % 4]}
                scale={0.8}
                edgeClassName="group-hover:bg-white/30"
                className="bg-night-900 p-2 pt-4"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-night-950"
                  style={{ clipPath: cyberClip(index % 2 ? 0 : 1, 0.4) }}
                >
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
                {/* Browser-chrome decoration; hidden so the link is named by the image alt alone. */}
                <div
                  aria-hidden="true"
                  className="mt-2 flex items-center justify-between px-2 pb-1 font-mono text-[10px] tracking-widest text-ink-400 uppercase"
                >
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
              </CyberFrame>
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
        <ul
          data-cube-compact
          className={`mt-5 space-y-2 text-sm text-ink-300 ${flip ? "lg:ml-auto" : ""}`}
        >
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
        <ul
          data-cube-compact
          className={`mt-5 flex flex-wrap gap-1.5 ${flip ? "lg:justify-end" : ""}`}
        >
          {project.stack.slice(0, 5).map((item) => (
            <li
              key={item}
              className="border border-white/10 notch-one px-2 py-0.5 font-mono text-xs text-ink-200 [--n:5px] [--nc:rgba(255,255,255,0.1)]"
            >
              {item}
            </li>
          ))}
        </ul>
        <div
          className={`mt-6 flex gap-4 font-mono text-xs tracking-widest uppercase ${flip ? "lg:justify-end" : ""}`}
        >
          <Link
            href={projectHref(project.slug)}
            className="text-neon-cyan hover:underline"
          >
            {t("open")}
            <span className="sr-only">: {project.title}</span>{" "}
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
