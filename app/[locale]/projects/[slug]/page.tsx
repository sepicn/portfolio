import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectHref, serviceHref } from "@/i18n/paths";
import { routing } from "@/i18n/routing";
import { pick, pickList } from "@/content/i18n";
import { projects } from "@/content/data/projects";
import { services } from "@/content/data/services";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, breadcrumbJsonLd, graph, personId, serializeJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projectPage" });
  const title = project.seoTitle
    ? pick(project.seoTitle, locale)
    : `${project.title}: ${t("caseStudy")}, ${project.stack[0]}`;
  return {
    title,
    ...pageMetadata({
      locale,
      path: `/projects/${slug}`,
      title,
      description: pick(project.description, locale),
      ogKey: `project-${slug}`,
    }),
  };
}

function Chapter({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 pt-16 lg:grid-cols-[260px_1fr] lg:gap-12 lg:pt-24">
      <div className="lg:sticky lg:top-6 lg:self-start">
        <p aria-hidden="true" className="text-[64px] leading-[0.8] font-light tracking-[-0.06em] text-blue lg:text-[96px]">
          {no}
        </p>
        <h2 className="mt-3 text-[28px] tracking-[-0.03em]">{title}</h2>
      </div>
      <div className="max-w-[68ch] text-[17px] leading-[1.65] text-ink lg:text-[19px]">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectPage" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const shots = (project.gallery ?? []).filter((g) => !g.endsWith("-m.webp"));
  const phone = (project.gallery ?? []).find((g) => g.endsWith("-m.webp"));
  const isPersonal = project.kind === "personal";
  const used = services.filter((s) => s.examples.includes(slug));

  const jsonLd = graph(
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [nav("projects"), "/projects"],
      [project.title, `/projects/${slug}`],
    ]),
    {
      "@type": "CreativeWork",
      "@id": `${absoluteUrl(locale, `/projects/${slug}`)}#work`,
      name: project.title,
      description: pick(project.description, locale),
      author: { "@id": personId },
      dateCreated: project.year.slice(0, 4),
      mainEntityOfPage: absoluteUrl(locale, `/projects/${slug}`),
      inLanguage: locale === "sr" ? "sr-Latn-RS" : "en",
      url: absoluteUrl(locale, `/projects/${slug}`),
      ...(project.client || project.links.live
        ? {
            about: project.links.live
              ? {
                  "@type": "WebSite",
                  url: project.links.live,
                  ...(project.client ? { publisher: { "@type": "Organization", name: project.client } } : {}),
                }
              : { "@type": "Organization", name: project.client },
          }
        : {}),
      image: project.image ? `${siteConfig.url}${project.image}` : undefined,
      keywords: project.stack.join(", "),
    },
  );

  const facts = [
    { label: t("role"), value: pick(project.role, locale) },
    { label: t("period"), value: project.year },
    { label: t("team"), value: pick(project.team, locale) },
    { label: t("stack"), value: project.stack.slice(0, 5).join(", ") },
  ];

  return (
    <article className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="py-3.5">
        <ol className="flex flex-wrap gap-2.5 font-mono text-[12px] tracking-[0.06em] text-ink-3 uppercase">
          <li>
            <Link href="/projects" className="hover:text-blue">
              {nav("projects")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-blue">
            {project.title}
          </li>
        </ol>
      </nav>

      <header className="dark-sheet grid border border-ink lg:min-h-[600px] lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-8 border-b border-rule-dark px-[18px] py-7 lg:border-r lg:border-b-0 lg:p-10">
          <div>
            <p className="tag text-blue-2">
              {isPersonal ? t("personal") : project.kind === "saas" ? t("saas") : (project.client ?? t("client"))} · {project.year}
            </p>
            <h1 className="mt-4 text-[clamp(3.2rem,7vw,8rem)] leading-[0.88] tracking-[-0.05em]">{project.title}</h1>
            <p className="mt-6 max-w-[34ch] text-[20px] leading-[1.4] text-paper/85 lg:text-[22px]">
              {pick(project.tagline, locale)}
            </p>
          </div>
          {project.links.live || project.links.repo ? (
            <div className="flex flex-wrap gap-3">
              {project.links.live ? (
                <a href={project.links.live} target="_blank" rel="noopener" className="btn border-blue-2 text-paper hover:bg-blue-2 hover:text-ink">
                  {t("visit")} ↗
                </a>
              ) : null}
              {project.links.repo ? (
                <a href={project.links.repo} target="_blank" rel="noopener" className="btn border-rule-dark text-paper hover:bg-paper hover:text-ink">
                  GitHub ↗
                </a>
              ) : null}
            </div>
          ) : (
            <p className="font-mono text-[13px] text-paper/60">{project.kind === "saas" ? t("saasNote") : t("privateNote")}</p>
          )}
        </div>
        <div className="relative min-h-[260px] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title}: ${t("screenshot")}`}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-top opacity-95"
            />
          ) : (
            <Image
              src="/images/drawings/stack-open.webp"
              alt=""
              width={630}
              height={748}
              priority
              className="absolute inset-0 m-auto max-h-[80%] w-auto invert hue-rotate-180 brightness-[1.15]"
            />
          )}
        </div>
      </header>

      <dl className="grid border-x border-b border-ink bg-paper sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="border-b border-ink px-5 py-4 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
            <dt className="label">{f.label}</dt>
            <dd className="mt-1.5 text-[16px] leading-[1.4] font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>

      <Chapter no="01" title={t("summary")}>
        <p>{pick(project.summary, locale)}</p>
        <p className="mt-4 text-ink-2">{pick(project.scale, locale)}</p>
      </Chapter>

      <Chapter no="02" title={t("did")}>
        <ul className="space-y-3">
          {pickList(project.did, locale).map((d) => (
            <li key={d} className="grid grid-cols-[18px_1fr] gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3.5 bg-blue" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      {shots.length || phone ? (
        <section aria-label={t("gallery")} className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-5">
            {shots.map((src) => (
              <figure key={src} className="border border-ink bg-paper p-2.5">
                <Image src={src} alt={`${project.title}: ${t("screenshot")}`} width={1600} height={1000} sizes="(min-width: 1024px) 70vw, 100vw" className="img-load h-auto w-full" />
              </figure>
            ))}
          </div>
          {phone ? (
            <figure className="mx-auto w-[260px] border border-ink bg-paper p-2.5 lg:sticky lg:top-6 lg:self-start">
              <Image src={phone} alt={`${project.title}: ${t("phone")}`} width={390} height={844} className="img-load h-auto w-full" />
              <figcaption className="label mt-2">{t("phone")}</figcaption>
            </figure>
          ) : null}
        </section>
      ) : null}

      <Chapter no="03" title={t("hard")}>
        <p>{pick(project.hard, locale)}</p>
      </Chapter>

      <Chapter no="04" title={isPersonal ? t("impact") : t("impactClient")}>
        <ul className="grid gap-4">
          {pickList(project.impact, locale).map((d) => (
            <li key={d} className="border-l-2 border-blue pl-4">
              {d}
            </li>
          ))}
        </ul>
        {used.length ? (
          <p className="mt-8 flex flex-wrap items-center gap-2 text-[15px] text-ink-2">
            {t("ctaServices")}
            {used.map((s) => (
              <Link key={s.id} href={serviceHref(s.id, locale)} className="chip hover:border-blue hover:text-blue">
                {pick(s.title, locale)}
              </Link>
            ))}
          </p>
        ) : null}
      </Chapter>

      <Link
        href={projectHref(next.slug)}
        className="group mt-20 grid items-center border border-ink bg-paper p-6 transition-colors hover:bg-ink hover:text-paper lg:mt-28 lg:grid-cols-[1fr_auto] lg:p-7"
      >
        <span>
          <span className="label group-hover:text-paper/70">{t("next")}</span>
          <span className="mt-1 block text-[clamp(2.4rem,5vw,5rem)] leading-none tracking-[-0.045em]">{next.title}</span>
        </span>
        <span aria-hidden="true" className="text-[64px] text-blue transition-transform duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-blue-2">
          →
        </span>
      </Link>
    </article>
  );
}
