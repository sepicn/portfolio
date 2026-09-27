import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/navigation";
import { projectHref, serviceHref } from "@/i18n/paths";
import { routing } from "@/i18n/routing";
import { Reveal } from "@/components/reveal";
import { CyberFrame } from "@/components/cyber-frame";
import { CyberDivider } from "@/components/cyber-divider";
import { SectionHeading } from "@/components/section-heading";
import { PrivateArt } from "@/components/project-card";
import { pick, pickList } from "@/content/i18n";
import { projects } from "@/content/data/projects";
import { serviceSlugs } from "@/content/data/service-slugs";
import { servicePageLabels as L, servicePages, services } from "@/content/data/services";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  personId,
  serializeJsonLd,
} from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string; service: string }> };

const localeKey = (locale: string) => (locale === "en" ? "en" : "sr");

/** The service whose slug in this locale is `slug` (/usluge/izrada-sajtova, /en/services/web-development). */
function findService(locale: string, slug: string) {
  return services.find((s) => serviceSlugs[s.id][localeKey(locale)] === slug);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, service: serviceSlugs[s.id][locale] })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, service: slug } = await params;
  const service = findService(locale, slug);
  if (!service) return {};
  const page = servicePages[service.id];
  const title = pick(page.metaTitle, locale);
  return {
    title,
    ...pageMetadata({
      locale,
      path: `/services/${service.id}`,
      title,
      description: pick(page.metaDescription, locale),
      ogKey: "services",
    }),
  };
}

export default function ServicePage({ params }: Props) {
  const { locale, service: slug } = use(params);
  setRequestLocale(locale);
  const navT = useTranslations("nav");
  const t = useTranslations("services");
  const service = findService(locale, slug);
  if (!service) notFound();

  const key = localeKey(locale);
  const page = servicePages[service.id];
  const path = `/services/${service.id}`;
  const url = absoluteUrl(locale, path);
  const h1 = pick(page.h1, locale);
  const intro = pickList(page.intro, locale);
  const faq = page.faq[key];
  const proof = page.proof
    .map((item) => ({ ...item, project: projects.find((p) => p.slug === item.slug) }))
    .filter((item) => item.project);
  const related = services.filter((s) => s.id !== service.id);
  const crumbs: [string, string][] = [
    [siteConfig.name, "/"],
    [navT("services"), "/services"],
    [pick(service.title, locale), path],
  ];

  const jsonLd = graph(
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: h1,
      serviceType: pick(service.title, locale),
      description: pick(page.metaDescription, locale),
      url,
      inLanguage: locale === "sr" ? "sr-Latn-RS" : "en",
      provider: { "@id": personId },
      // Belgrade in person, everywhere else remotely.
      areaServed: [
        { "@type": "City", name: "Belgrade" },
        { "@type": "Country", name: "Serbia" },
        { "@type": "Place", name: "Worldwide (remote)" },
      ],
      availableLanguage: ["sr", "en"],
      subjectOf: proof.map((item) => ({
        "@type": "CreativeWork",
        name: item.project!.title,
        url: absoluteUrl(locale, `/projects/${item.slug}`),
      })),
    },
    breadcrumbJsonLd(locale, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  );

  return (
    <article className="pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* Title block */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 grid-floor" />
        <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6">
          <nav aria-label={pick({ sr: "Putanja", en: "Breadcrumb" }, locale)}>
            {/* One line, the last crumb truncated (the H1 carries the full name): when the
                mono web font replaced its fallback, a wrapped trail changed height and pushed
                the whole page down (CLS 0.15 on mobile). */}
            <ol className="flex items-center gap-x-2 font-mono text-xs tracking-widest whitespace-nowrap text-ink-400 uppercase">
              <li>
                <Link href="/" className="hover:text-neon-cyan">
                  {navT("home")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-neon-cyan">
                  {navT("services")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="min-w-0 truncate text-neon-cyan">
                {pick(service.title, locale)}
              </li>
            </ol>
          </nav>
          <Reveal from="left">
            <h1 className="mt-8 max-w-4xl font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-6xl">
              {h1}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 max-w-3xl space-y-4 text-lg text-ink-200">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-neon-pink notch px-6 py-3 font-medium text-night-950 transition [--n:10px] hover:brightness-110"
              >
                {pick(L.ctaButton, locale)}
              </Link>
              <a
                href="#proof"
                className="border border-neon-cyan/60 notch-alt px-6 py-3 font-medium text-neon-cyan transition [--n:10px] [--nc:rgba(0,229,255,0.6)] hover:bg-neon-cyan/10"
              >
                {pick(L.proofTitle, locale)}
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Who it is for, and who it is not for */}
      <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-[3fr_2fr]">
        <Reveal from="left">
          <CyberFrame
            variant={3}
            tone="cyan"
            edgeClassName="h-full"
            className="bg-night-800 p-7"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
              {pick(L.forWhom, locale)}
            </h2>
            <ul className="mt-4 space-y-3">
              {pickList(page.forWhom, locale).map((item) => (
                <li key={item} className="flex gap-3 text-ink-100">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rotate-45 bg-neon-pink"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </CyberFrame>
        </Reveal>
        <Reveal from="right" delay={0.1}>
          <CyberFrame
            variant={8}
            tone="pink"
            edgeClassName="h-full"
            className="bg-night-800 p-7"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-neon-pink uppercase">
              {pick(L.notFor, locale)}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-100">
              {pick(page.notFor, locale)}
            </p>
          </CyberFrame>
        </Reveal>
      </section>

      {/* What is included */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("includes")}
            title={pick(page.includedTitle, locale)}
          />
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {page.included[key].map((item, i) => (
            <Reveal key={item.title} as="li" delay={(i % 3) * 0.08}>
              <CyberFrame
                variant={[4, 9, 5, 8, 1, 6, 10][i % 7]}
                scale={0.7}
                edgeClassName="h-full"
                className="h-full bg-night-900 p-6"
              >
                <h3 className="font-display text-lg font-semibold text-ink-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-200">{item.body}</p>
              </CyberFrame>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("processEyebrow")}
            title={pick(page.processTitle, locale)}
          />
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {page.process[key].map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.08}>
              <CyberFrame
                variant={[6, 1, 10, 4, 9][i % 5]}
                scale={0.6}
                edgeClassName="h-full"
                className="h-full bg-night-900 p-5"
              >
                <span className="font-mono text-2xl text-neon-pink">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-100">
                  {step.title}
                </h3>
                <p className="mt-1 font-mono text-xs tracking-widest text-neon-cyan uppercase">
                  {step.time}
                </p>
                <p className="mt-3 text-sm text-ink-200">{step.body}</p>
              </CyberFrame>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Tools, measurement, timeline */}
      <section className="mx-auto mt-24 grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
        <Reveal from="left">
          <h2 className="font-display text-2xl font-semibold text-ink-100">
            {pick(L.tools, locale)}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {page.tools.map((tool) => (
              <li
                key={tool}
                className="border border-white/10 notch-one px-2.5 py-1 font-mono text-xs text-ink-200 [--nc:rgba(255,255,255,0.1)]"
              >
                {tool}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-ink-300">{pick(page.toolsNote, locale)}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl font-semibold text-ink-100">
            {pick(L.measure, locale)}
          </h2>
          <div className="mt-5 space-y-4 text-ink-200">
            {pickList(page.measure, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal from="right" delay={0.2}>
          <h2 className="font-display text-2xl font-semibold text-ink-100">
            {pick(L.timeline, locale)}
          </h2>
          <p className="mt-5 text-ink-200">{pick(page.timeline, locale)}</p>
        </Reveal>
      </section>

      {/* Proof: the case studies that show this service */}
      <section id="proof" className="mx-auto mt-24 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={pick(L.proofEyebrow, locale)}
            title={pick(L.proofTitle, locale)}
          />
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {proof.map(({ slug: projectSlug, text, project }, i) => (
            <Reveal key={projectSlug} as="li" from={i % 2 === 0 ? "left" : "right"}>
              <Link href={projectHref(projectSlug)} className="group block h-full">
                <CyberFrame
                  variant={[2, 0, 5, 9][i % 4]}
                  scale={0.8}
                  edgeClassName="h-full group-hover:bg-neon-cyan/60"
                  className="flex h-full flex-col bg-night-800"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-night-950">
                    {project!.image ? (
                      <Image
                        src={project!.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 560px"
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <PrivateArt label={project!.title} accent={project!.accent} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs tracking-[0.3em] text-ink-400 uppercase">
                      {project!.client ?? project!.title} · {project!.year}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink-100 group-hover:text-neon-cyan">
                      {project!.title}
                    </h3>
                    <p className="mt-3 flex-1 text-ink-200">{pick(text, locale)}</p>
                    <span className="mt-5 font-mono text-xs tracking-widest text-neon-cyan uppercase">
                      {pick(L.proofLink, locale)}{" "}
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="inline size-4 align-[-3px] transition group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </CyberFrame>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title={pick(L.faqTitle, locale)} />
        </Reveal>
        <dl className="mt-10">
          {faq.map((item, i) => (
            <Reveal
              key={item.q}
              as="div"
              from={i % 2 === 0 ? "left" : "right"}
              className={i > 0 ? "pb-6" : "py-6"}
            >
              <dt className="font-display text-lg font-semibold text-ink-100">
                {i > 0 ? (
                  <CyberDivider variant={i + 2} className="mb-6 text-white/10" />
                ) : null}
                {item.q}
              </dt>
              <dd className="mt-2 text-ink-200">{item.a}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* CTA and the neighbouring services */}
      <section
        aria-labelledby="service-cta"
        className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
      >
        <Reveal>
          <CyberFrame variant={2} tone="cyan" className="bg-night-800 p-8 sm:p-10">
            <h2
              id="service-cta"
              className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl"
            >
              {pick(L.ctaTitle, locale)}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-200">{pick(L.ctaBody, locale)}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/contact"
                className="bg-neon-cyan notch px-6 py-3 font-medium text-night-950 transition [--n:10px] hover:brightness-110"
              >
                {pick(L.ctaButton, locale)}
              </Link>
              <p className="text-sm text-ink-300">
                {pick(L.related, locale)}:{" "}
                {related.map((s, i) => (
                  <span key={s.id}>
                    {i > 0 ? ", " : null}
                    <Link
                      href={serviceHref(s.id, locale)}
                      className="text-neon-cyan underline-offset-4 hover:underline"
                    >
                      {pick(servicePages[s.id].h1, locale)}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          </CyberFrame>
        </Reveal>
      </section>
    </article>
  );
}
