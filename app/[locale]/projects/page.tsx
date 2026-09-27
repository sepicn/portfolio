import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectFeature } from "@/components/project-feature";
import { Reveal } from "@/components/reveal";
import { CyberDivider } from "@/components/cyber-divider";
import { SectionHeading } from "@/components/section-heading";
import { SplitHeading } from "@/components/motion/split-heading";
import { Marquee } from "@/components/motion/marquee";
import { CubeDeck } from "@/components/motion/cube-deck";
import { CubeIntro } from "@/components/cube-intro";
import { RingCarousel } from "@/components/motion/ring-carousel";
import { clientProjects, personalProjects, projects } from "@/content/data/projects";
import { pick } from "@/content/i18n";
import { siteConfig } from "@/lib/site-config";
import { getPathname } from "@/i18n/navigation";
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
      {/* Intro and the client tape fill the first screen, so the cube starts below the fold. */}
      <div className="flex min-h-[calc(100svh-4rem)] flex-col pb-10">
        <section className="relative flex flex-1 items-center overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 animate-grid grid-floor" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-[3fr_2fr]">
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

        <Marquee
          variant="tape"
          // Each logo opens the live site; private systems without one open their case study.
          // One logo per client: Delta's two systems share it, the first one wins.
          items={clientProjects
            .filter(
              (p, i, all) => !p.logo || all.findIndex((q) => q.logo === p.logo) === i,
            )
            .map((p) =>
              p.logo
                ? {
                    label: p.title,
                    image: p.logo,
                    href:
                      p.links.live ??
                      getPathname({
                        locale,
                        href: { pathname: "/projects/[slug]", params: { slug: p.slug } },
                      }),
                  }
                : p.title,
            )}
        />
      </div>

      <section id="clients" className="scroll-mt-24 py-20">
        {/* On desktop the heading and the featured projects are the faces of one
            full-screen cube that turns up, right, down and left as the page scrolls. */}
        <CubeDeck
          perFace={0.6}
          faces={[
            <CubeIntro
              key="intro"
              eyebrow={t("clientEyebrow")}
              title={t("clientTitle")}
              lead={t("clientLead")}
              hint={t("cubeHint")}
              // Where each face comes from with the default turns: up, right, down, left.
              items={featured.map((project, i) => ({
                title: project.title,
                client: project.client,
                arrow: ["↓", "←", "↑", "→"][i % 4],
              }))}
            />,
            ...featured.map((project, i) => (
              <ProjectFeature key={project.slug} project={project} index={i} />
            )),
          ]}
        />
        {/* The remaining client work and the personal projects stand on neon rings that
            turn right to left with the scroll and can be dragged. */}
        <div className="mt-28 lg:mt-0">
          <RingCarousel
            items={rest.map((project, i) => (
              <Reveal
                key={project.slug}
                from={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.06}
              >
                <ProjectCard
                  project={project}
                  index={featured.length + i}
                  layout="ring"
                />
              </Reveal>
            ))}
          />
        </div>
      </section>

      <section id="personal" className="scroll-mt-24 pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CyberDivider variant={7} className="mb-20 text-white/10" />
        </div>
        <RingCarousel
          reverse
          header={
            <Reveal from="right">
              <SectionHeading
                eyebrow={t("personalEyebrow")}
                title={t("personalTitle")}
                lead={t("personalLead")}
                align="right"
              />
            </Reveal>
          }
          items={personalProjects.map((project, i) => (
            <Reveal
              key={project.slug}
              from={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.06}
            >
              <ProjectCard project={project} index={i} layout="ring" />
            </Reveal>
          ))}
        />
      </section>
    </>
  );
}
