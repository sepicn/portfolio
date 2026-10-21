import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { projects, type Project } from "@/content/data/projects";
import { pick } from "@/content/i18n";
import { siteConfig } from "@/lib/site-config";
import { PageHead } from "@/components/sections/page-head";
import { ProjectSheets, type Sheet } from "@/components/projects/project-sheets";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  personId,
  serializeJsonLd,
  websiteId,
} from "@/lib/structured-data";

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

function group(p: Project): Sheet["group"] {
  if (p.kind === "personal") return "personal";
  if (p.kind === "saas") return "saas";
  return "client";
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const kindLabel = {
    client: t("kindClient"),
    saas: t("kindSaas"),
    personal: t("kindPersonal"),
  };
  const sheets: Sheet[] = projects.map((p, i) => ({
    slug: p.slug,
    no: `L-${String(i + 1).padStart(2, "0")}`,
    title: p.title,
    year: p.year.replace(/\s.\s/, "-"),
    group: group(p),
    kindLabel: kindLabel[group(p)],
    tagline: pick(p.tagline, locale),
    image: p.image,
    stack: p.stack,
  }));

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
      [nav("projects"), "/projects"],
    ]),
  );

  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PageHead
        crumbs={[{ label: nav("home"), href: "/" }, { label: nav("projects") }]}
        tag={t("tag", { count: projects.length })}
        title={t("title")}
        lead={t("intro")}
      />
      <ProjectSheets
        sheets={sheets}
        filters={[
          { key: "all", label: t("filterAll") },
          { key: "client", label: t("filterClient") },
          { key: "saas", label: t("filterSaas") },
          { key: "personal", label: t("filterPersonal") },
        ]}
      />
    </div>
  );
}
