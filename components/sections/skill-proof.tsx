import { Link } from "@/i18n/navigation";
import { projectHref } from "@/i18n/paths";
import { skillProof } from "@/content/data/home";
import { projects } from "@/content/data/projects";
import { pick } from "@/content/i18n";

const titles = new Map(projects.map((p) => [p.slug, p.title]));

export function SkillProof({ locale }: { locale: string }) {
  return (
    <div className="grid gap-9 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-12">
      {skillProof.map((group) => (
        <div key={group.group.en} data-reveal>
          <h3 className="border-b-2 border-ink pb-3 font-mono text-[13px] font-medium tracking-[0.06em] text-blue uppercase">
            {pick(group.group, locale)}
          </h3>
          <dl>
            {group.rows.map((row) => (
              <div
                key={typeof row.name === "string" ? row.name : row.name.en}
                className="grid items-baseline gap-2 border-b border-rule py-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-4"
              >
                <dt className="text-[19px] font-medium tracking-[-0.015em]">
                  {typeof row.name === "string" ? row.name : pick(row.name, locale)}
                  {row.note ? (
                    <span className="mt-0.5 block font-mono text-[12px] font-normal text-ink-2">
                      {pick(row.note, locale)}
                    </span>
                  ) : null}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {row.projects
                    .filter((slug) => titles.has(slug))
                    .map((slug) => (
                      <Link
                        key={slug}
                        href={projectHref(slug)}
                        className="chip min-h-10 transition-colors hover:border-blue hover:text-blue lg:min-h-8"
                      >
                        {titles.get(slug)}
                      </Link>
                    ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
