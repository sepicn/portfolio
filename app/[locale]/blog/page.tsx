import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogHref } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";
import { PostMeta } from "@/components/blog/post-meta";
import { posts, type Locale } from "@/content/blog";
import { siteConfig } from "@/lib/site-config";
import { PageHead } from "@/components/sections/page-head";
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
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/blog",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "blog",
    }),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PageHead
        crumbs={[{ label: nav("home"), href: "/" }, { label: "Blog" }]}
        tag={t("tag")}
        title="Blog"
        lead={t("intro")}
      />

      <article className="mt-10 grid border border-ink bg-paper lg:grid-cols-[1.2fr_1fr]">
        <div className="img-load relative min-h-[240px] overflow-hidden border-b border-ink lg:min-h-[420px] lg:border-r lg:border-b-0">
          <Image
            src={`/images/blog/${lead.slug.sr}.webp`}
            fill
            alt=""
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 lg:p-8">
          <div>
            <PostMeta
              category={t(`categories.${lead.category}`)}
              minutes={t("minutes", { n: lead.minutes })}
              date={lead.date}
              locale={locale}
            />
            <h2 className="mt-5 text-[clamp(2rem,3.4vw,3.4rem)] leading-[1] tracking-[-0.04em]">
              {lead.title[l]}
            </h2>
            <p className="mt-4 text-[17px] leading-[1.55] text-ink-2">
              {lead.description[l]}
            </p>
          </div>
          <Link
            href={blogHref(lead.slug[l])}
            className="flex min-h-14 items-center justify-between bg-ink px-5 font-mono text-[13px] tracking-[0.05em] text-paper uppercase transition-colors hover:bg-blue"
          >
            {t("read")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>

      <ul className="mt-7 grid border-t border-l border-ink md:grid-cols-2">
        {rest.map((p) => (
          <li key={p.slug.sr} className="border-r border-b border-ink bg-paper">
            <Link
              href={blogHref(p.slug[l])}
              className="group flex h-full flex-col transition-colors hover:bg-blue-soft"
            >
              <div className="img-load relative aspect-[16/9] overflow-hidden border-b border-ink">
                <Image
                  src={`/images/blog/${p.slug.sr}.webp`}
                  fill
                  alt=""
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5 lg:p-6">
                <PostMeta
                  size="sm"
                  category={t(`categories.${p.category}`)}
                  minutes={t("minutes", { n: p.minutes })}
                  date={p.date}
                  locale={locale}
                />
                <h2 className="mt-3.5 text-[23px] leading-[1.15] tracking-[-0.025em] group-hover:text-blue">
                  {p.title[l]}
                </h2>
                <p className="mt-2 text-[15px] leading-[1.5] text-ink-2">
                  {p.description[l]}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
