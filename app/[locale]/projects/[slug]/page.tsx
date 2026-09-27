import type { Metadata } from "next";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SplitHeading } from "@/components/motion/split-heading";
import { PrivateArt } from "@/components/project-card";
import { Testimonials } from "@/components/testimonials";
import { pick, pickList } from "@/content/i18n";
import { projects } from "@/content/data/projects";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  personId,
  serializeJsonLd,
} from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projectPage" });
  const title = `${project.title}: ${t("caseStudy")}, ${project.stack[0]}`;
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

export default function ProjectPage({ params }: Props) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("projectPage");
  const navT = useTranslations("nav");
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const desktopShots = (project.gallery ?? []).filter((g) => !g.endsWith("-m.webp"));
  const phoneShot = (project.gallery ?? []).find((g) => g.endsWith("-m.webp"));

  const jsonLd = graph(
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [navT("projects"), "/projects"],
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
      // The case study is the canonical page for this work; the live site is related to it.
      url: absoluteUrl(locale, `/projects/${slug}`),
      sameAs: project.links.live,
      ...(project.client
        ? { funder: { "@type": "Organization", name: project.client } }
        : {}),
      image: project.image ? `${siteConfig.url}${project.image}` : undefined,
      keywords: project.stack.join(", "),
    },
  );

  const facts = [
    { label: t("role"), value: pick(project.role, locale) },
    { label: t("period"), value: project.year },
    { label: t("team"), value: pick(project.team, locale) },
    { label: t("scale"), value: pick(project.scale, locale) },
  ];

  return (
    <article className="pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* Title block */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 grid-floor" />
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-14 sm:px-6">
          <Reveal from="left">
            <Link
              href="/projects"
              className="font-mono text-xs tracking-widest text-neon-cyan uppercase hover:underline"
            >
              <ArrowLeftIcon
                aria-hidden="true"
                className="inline size-4 align-[-3px] transition group-hover:-translate-x-0.5"
              />{" "}
              {t("back")}
            </Link>
            <p className="mt-6 font-mono text-xs tracking-[0.3em] text-ink-400 uppercase">
              {project.client ?? t("personal")} · {project.year}
            </p>
          </Reveal>
          <SplitHeading
            as="h1"
            text={project.title}
            className="mt-3 max-w-4xl font-display text-5xl font-semibold tracking-tight text-ink-100 sm:text-7xl"
            accentLast
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-xl text-ink-200">
              {pick(project.tagline, locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener"
                  className="rounded-md bg-neon-pink px-5 py-2.5 font-medium text-night-950 shadow-neon-pink transition hover:brightness-110"
                >
                  {t("visit")} ↗
                </a>
              ) : null}
              {project.links.repo ? (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener"
                  className="rounded-md border border-neon-cyan/60 px-5 py-2.5 font-medium text-neon-cyan transition hover:bg-neon-cyan/10"
                >
                  GitHub ↗
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Hero screenshot in a monitor frame, drifting on scroll */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal from="up">
          <Parallax distance={60}>
            <div className="relative rounded-2xl border border-white/10 bg-night-900 p-2 shadow-2xl shadow-black/60">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-night-950">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title}, ${t("screenshot")}`}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1152px"
                    className="object-cover object-top"
                  />
                ) : (
                  <PrivateArt label={project.title} accent={project.accent} />
                )}
              </div>
              <div className="flex items-center justify-between px-3 pt-2 pb-1 font-mono text-[11px] tracking-widest text-ink-400 uppercase">
                <span>
                  {project.links.live
                    ?.replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "") ?? t("privateLabel")}
                </span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-neon-red" />
                  <span className="size-2 rounded-full bg-neon-yellow" />
                  <span className="size-2 rounded-full bg-neon-green" />
                </span>
              </div>
            </div>
          </Parallax>
        </Reveal>
      </div>

      {/* Facts bar: what a recruiter scans first */}
      <section aria-label={t("facts")} className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} as="div" delay={i * 0.06} className="bg-night-900 p-5">
              <dt className="font-mono text-[11px] tracking-widest text-ink-400 uppercase">
                {f.label}
              </dt>
              <dd className="mt-2 text-ink-100">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
        <Reveal className="mt-6">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-xs text-ink-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Story */}
      <div className="mx-auto mt-20 grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-14">
          <Reveal from="left">
            <h2 className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl">
              {t("summary")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-200">
              {pick(project.summary, locale)}
            </p>
          </Reveal>
          <Reveal from="left">
            <h2 className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl">
              {t("did")}
            </h2>
            <ol className="mt-5 space-y-4">
              {pickList(project.did, locale).map((item, i) => (
                <li key={item} className="flex gap-4 text-ink-200">
                  <span className="mt-0.5 font-mono text-sm text-neon-pink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal from="right">
            <div className="rounded-2xl border border-neon-cyan/30 bg-night-800/60 p-7">
              <h2 className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
                {t("hard")}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-100">
                {pick(project.hard, locale)}
              </p>
            </div>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <div className="rounded-2xl border border-neon-pink/30 bg-night-800/60 p-7">
              <h2 className="font-mono text-xs tracking-[0.3em] text-neon-pink uppercase">
                {t("impact")}
              </h2>
              <ul className="mt-4 space-y-3">
                {pickList(project.impact, locale).map((item) => (
                  <li key={item} className="leading-relaxed text-ink-100">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {!project.links.live && !project.links.repo ? (
            <Reveal from="right" delay={0.15}>
              <p className="text-sm text-ink-400">{t("privateNote")}</p>
            </Reveal>
          ) : null}
        </div>
      </div>

      {/* Gallery: desktop shots alternate sides, the phone view floats beside them */}
      {desktopShots.length || phoneShot ? (
        <section
          aria-label={t("gallery")}
          className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
        >
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl">
              {t("gallery")}
            </h2>
          </Reveal>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[3fr_1fr]">
            <div className="space-y-8">
              {desktopShots.map((src, i) => (
                <Reveal key={src} from={i % 2 === 0 ? "left" : "right"}>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-night-950">
                    <Image
                      src={src}
                      alt={`${project.title}, ${t("screenshot")} ${i + 2}`}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 1024px) 100vw, 860px"
                      className="h-auto w-full"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
            {phoneShot ? (
              <Reveal from="right" className="lg:sticky lg:top-24">
                <Parallax distance={40}>
                  <div className="mx-auto w-56 rounded-[2rem] border border-white/15 bg-night-900 p-2 shadow-2xl shadow-black/60">
                    <div className="overflow-hidden rounded-[1.6rem]">
                      <Image
                        src={phoneShot}
                        alt={`${project.title}, ${t("phone")}`}
                        width={585}
                        height={1266}
                        sizes="224px"
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-center font-mono text-[11px] tracking-widest text-ink-400 uppercase">
                    {t("phone")}
                  </p>
                </Parallax>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      <Testimonials locale={locale} project={slug} />

      <nav
        aria-label={t("moreNav")}
        className="mx-auto mt-24 flex max-w-6xl justify-between gap-4 border-t border-white/5 px-4 pt-10 sm:px-6"
      >
        <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
          <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
            <ArrowLeftIcon
              aria-hidden="true"
              className="inline size-4 align-[-3px] transition group-hover:-translate-x-0.5"
            />{" "}
            {t("previous")}
          </span>
          <span className="mt-1 block font-display text-xl text-ink-100 group-hover:text-neon-cyan">
            {prev.title}
          </span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
          <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
            {t("next")}{" "}
            <ArrowRightIcon
              aria-hidden="true"
              className="inline size-4 align-[-3px] transition group-hover:translate-x-0.5"
            />
          </span>
          <span className="mt-1 block font-display text-xl text-ink-100 group-hover:text-neon-cyan">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
