import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogHref } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { posts, type Locale } from "@/content/blog";
import { siteConfig } from "@/lib/site-config";
import { PageHead } from "@/components/sections/page-head";
import { absoluteUrl, breadcrumbJsonLd, graph, personId, serializeJsonLd, websiteId } from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({ locale, path: "/blog", title: t("metaTitle"), description: t("metaDescription"), ogKey: "blog" }),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const l = (locale === "en" ? "en" : "sr") as Locale;
  const [lead, ...rest] = posts;

  const jsonLd = graph(
    {
      "@type": "Blog",
      "@id": `${absoluteUrl(locale, "/blog")}#blog`,
      url: absoluteUrl(locale, "/blog"),
      name: t("metaTitle"),
      description: t("metaDescription"),
      inLanguage: l === "sr" ? "sr-Latn-RS" : "en",
      isPartOf: { "@id": websiteId },
      author: { "@id": personId },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title[l],
        url: absoluteUrl(locale, `/blog/${p.slug[l]}`),
        datePublished: p.date,
      })),
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      ["Blog", "/blog"],
    ]),
  );

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <PageHead crumbs={[{ label: nav("home"), href: "/" }, { label: "Blog" }]} tag={t("tag")} title="Blog" lead={t("intro")} />

      <article className="mt-10 grid border border-ink bg-paper lg:grid-cols-[1.2fr_1fr]">
        <div className="relative grid min-h-[260px] place-items-center border-b border-ink bg-bg lg:min-h-[420px] lg:border-r lg:border-b-0">
          <span className="absolute top-5 left-6 font-mono text-[12px] text-blue">B-01 · {t(`categories.${lead.category}`)}</span>
          <Image src="/images/drawings/obj-web.webp" width={586} height={718} alt="" priority className="max-h-[300px] w-auto" />
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 lg:p-8">
          <div>
            <p className="flex flex-wrap gap-4 font-mono text-[12px] tracking-[0.05em] text-ink-2 uppercase">
              <span className="text-blue">{t(`categories.${lead.category}`)}</span>
              <span>{t("minutes", { n: lead.minutes })}</span>
              <time dateTime={lead.date}>{formatDate(lead.date, locale)}</time>
            </p>
            <h2 className="mt-4 text-[clamp(2rem,3.4vw,3.4rem)] leading-[1] tracking-[-0.04em]">{lead.title[l]}</h2>
            <p className="mt-4 text-[17px] leading-[1.55] text-ink-2">{lead.description[l]}</p>
          </div>
          <Link href={blogHref(lead.slug[l])} className="flex min-h-14 items-center justify-between bg-ink px-5 font-mono text-[13px] tracking-[0.05em] text-paper uppercase transition-colors hover:bg-blue">
            {t("read")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>

      <ul className="mt-7 grid border-t border-l border-ink md:grid-cols-2">
        {rest.map((p, i) => (
          <li key={p.slug.sr} className="border-r border-b border-ink bg-paper">
            <Link href={blogHref(p.slug[l])} className="group grid h-full grid-cols-[72px_1fr] transition-colors hover:bg-blue-soft lg:grid-cols-[140px_1fr]">
              <div className="flex flex-col justify-between border-r border-rule p-4 lg:p-5">
                <span className="text-[40px] leading-[0.8] font-light tracking-[-0.05em] text-blue lg:text-[64px]">0{i + 2}</span>
                <span className="font-mono text-[11px] text-ink-2">{t("minutes", { n: p.minutes })}</span>
              </div>
              <div className="p-5 lg:p-6">
                <p className="flex flex-wrap gap-3 font-mono text-[12px] tracking-[0.05em] text-ink-2 uppercase">
                  <span className="text-blue">{t(`categories.${p.category}`)}</span>
                  <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                </p>
                <h2 className="mt-2.5 text-[23px] leading-[1.15] tracking-[-0.025em] group-hover:text-blue">{p.title[l]}</h2>
                <p className="mt-2 text-[15px] leading-[1.5] text-ink-2">{p.description[l]}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
