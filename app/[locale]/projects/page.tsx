import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectFeature } from "@/components/project-feature";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SplitHeading } from "@/components/motion/split-heading";
import { Marquee } from "@/components/motion/marquee";
import { clientProjects, personalProjects, projects } from "@/content/data/projects";
import { pick } from "@/content/i18n";
import { siteConfig } from "@/lib/site-config";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  personId,
  serializeJsonLd,
  websiteId,
} from "@/lib/structured-data";
import { FloatingProp } from "@/components/ambient/floating-prop";
import { CrtScreen, type Quad } from "@/components/ambient/crt-screen";
import screens from "@/lib/prop-screens.json";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/projects",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "projects",
    }),
  };
}

export default function ProjectsPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("projects");
  const featured = clientProjects.slice(0, 4);
  const rest = clientProjects.slice(4);
  const navT = useTranslations("nav");
  const jsonLd = graph(
    {
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(locale, "/projects")}#page`,
      url: absoluteUrl(locale, "/projects"),
      name: t("metaTitle"),
      description: t("metaDescription"),
      inLanguage: locale === "sr" ? "sr-Latn-RS" : "en",
      isPartOf: { "@id": websiteId },
      author: { "@id": personId },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(locale, `/projects/${p.slug}`),
          name: p.title,
          description: pick(p.description, locale),
        })),
      },
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [navT("projects"), "/projects"],
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 animate-grid grid-floor" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
              {t("title")}
            </p>
            <SplitHeading
              as="h1"
              text={t("headline")}
              className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink-100 sm:text-6xl"
              accentLast
            />
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-2xl text-xl text-ink-200">{t("intro")}</p>
            </Reveal>
          </div>
          <FloatingProp
            src="/images/props/computer.webp"
            glow="cyan"
            priority
            className="mx-auto w-60 sm:w-80"
          >
            <CrtScreen quad={screens.computer as Quad} />
          </FloatingProp>
        </div>
      </section>

      <Marquee items={clientProjects.map((p) => p.title)} />

      <section id="clients" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal from="left">
            <SectionHeading
              eyebrow={t("clientEyebrow")}
              title={t("clientTitle")}
              lead={t("clientLead")}
            />
          </Reveal>
          <div className="mt-16 space-y-28">
            {featured.map((project, i) => (
              <ProjectFeature key={project.slug} project={project} index={i} />
            ))}
          </div>
          <ul className="mt-28 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {rest.map((project, i) => (
              <Reveal
                key={project.slug}
                as="li"
                from={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.06}
              >
                <ProjectCard project={project} index={featured.length + i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="personal" className="scroll-mt-24 border-t border-white/5 py-20 pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal from="right">
            <SectionHeading
              eyebrow={t("personalEyebrow")}
              title={t("personalTitle")}
              lead={t("personalLead")}
              align="right"
            />
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {personalProjects.map((project, i) => (
              <Reveal
                key={project.slug}
                as="li"
                from={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.06}
              >
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
