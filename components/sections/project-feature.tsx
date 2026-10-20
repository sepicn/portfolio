import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { projectHref } from "@/i18n/paths";
import type { Project } from "@/content/data/projects";
import { pick } from "@/content/i18n";

export type FeatureKpi = { value: string; label: string };

export function ProjectFeature({
  project,
  locale,
  kind,
  body,
  kpis,
  cta,
  reverse = false,
  priority = false,
}: {
  project: Project;
  locale: string;
  kind: string;
  body: string[];
  kpis: FeatureKpi[];
  cta: string;
  reverse?: boolean;
  priority?: boolean;
}) {
  return (
    <article
      data-reveal
      className={`mb-7 grid border border-ink bg-paper lg:grid-cols-[1.25fr_1fr] ${reverse ? "lg:grid-cols-[1fr_1.25fr]" : ""}`}
    >
      <div
        className={`img-load relative min-h-[220px] overflow-hidden border-b border-ink lg:min-h-[440px] lg:border-b-0 ${reverse ? "lg:order-2 lg:border-l" : "lg:border-r"}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title}, ${pick(project.tagline, locale)}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(45deg,transparent_0_10px,var(--color-blue-soft)_10px_11px)]">
            <Image src="/images/drawings/stack-closed.webp" alt="" width={900} height={584} className="w-[70%]" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex-1 px-[18px] py-5 lg:p-7">
          <p className="tag flex justify-between">
            <span>{kind}</span>
            <span>{project.year.replace(/\s.\s/, "-")}</span>
          </p>
          <h3 className="my-3.5 text-title">{project.title}</h3>
          {body.map((p) => (
            <p key={p} className="mt-2.5 max-w-[46ch] text-[16px] leading-[1.6] text-ink-2 first:mt-0">
              {p}
            </p>
          ))}
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((s) => (
              <li key={s} className="border border-rule px-2 py-1.5 font-mono text-[12px] text-ink-2">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <dl className="grid grid-cols-3 border-t border-ink">
          {kpis.map((k) => (
            <div key={k.label} className="border-r border-ink px-4 py-4 last:border-r-0 lg:px-5">
              <dt className="sr-only">{k.label}</dt>
              <dd>
                <b className="block text-[26px] font-medium tracking-[-0.03em] text-blue lg:text-[30px]">
                  {k.value}
                </b>
                <span className="text-[13px] text-ink-2">{k.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <Link
          href={projectHref(project.slug)}
          className="flex min-h-14 items-center justify-between border-t border-ink bg-ink px-5 font-mono text-[13px] tracking-[0.05em] text-paper uppercase transition-colors hover:bg-blue"
        >
          <span>
            {cta}
            <span className="sr-only">: {project.title}</span>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
