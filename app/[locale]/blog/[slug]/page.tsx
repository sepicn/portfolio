import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogHref } from "@/i18n/paths";
import { routing } from "@/i18n/routing";
import { getPost, posts, type Locale } from "@/content/blog";
import { profile } from "@/content/data/profile";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import { PostMeta } from "@/components/blog/post-meta";
import { ArticleBody, layoutBySlug, toSections } from "@/components/blog/layouts";
import { ReadProgress } from "@/components/blog/read-progress";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  personId,
  serializeJsonLd,
} from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string; slug: string }> };

const lc = (locale: string) => (locale === "en" ? "en" : "sr") as Locale;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug[locale] })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(lc(locale), slug);
  if (!post) return {};
  const meta = pageMetadata({
    locale,
    path: `/blog/${post.slug.sr}`,
    title: post.title[lc(locale)],
    description: post.description[lc(locale)],
    ogKey: `post-${post.slug.sr}`,
  });
  return {
    title: post.title[lc(locale)],
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = lc(locale);
  const post = getPost(l, slug);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: "blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const blocks = post.body[l];
  const index = posts.indexOf(post);
  const next = posts[(index + 1) % posts.length];
  const url = absoluteUrl(locale, `/blog/${post.slug.sr}`);

  const jsonLd = graph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: post.title[l],
      description: post.description[l],
      abstract: post.answer[l],
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: l === "sr" ? "sr-Latn-RS" : "en",
      author: { "@id": personId },
      publisher: { "@id": personId },
      mainEntityOfPage: url,
      url,
      image: `${siteConfig.url}/images/blog/${post.slug.sr}.webp`,
      timeRequired: `PT${post.minutes}M`,
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      ["Blog", "/blog"],
      [post.title[l], `/blog/${post.slug.sr}`],
    ]),
  );

  return (
    <article className="wrap">
      <ReadProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-3.5">
        <ol className="flex flex-wrap gap-2.5 font-mono text-[12px] tracking-[0.06em] text-ink-3 uppercase">
          <li>
            <Link href="/" className="hover:text-blue">
              {nav("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-blue">
              Blog
            </Link>
          </li>
        </ol>
      </nav>

      <header className="grid items-end gap-8 border-b border-ink pt-10 pb-10 lg:grid-cols-[1fr_340px] lg:gap-12 lg:pt-14">
        <div>
          <PostMeta
            category={t(`categories.${post.category}`)}
            minutes={t("minutes", { n: post.minutes })}
            date={post.date}
            locale={locale}
          />
          <h1 className="mt-6 text-[clamp(2.4rem,5.2vw,5.6rem)] leading-[0.98] tracking-[-0.045em]">
            {post.title[l]}
          </h1>
        </div>
        <div className="flex items-center gap-3.5">
          <Image
            src={profile.photo}
            alt=""
            width={112}
            height={112}
            className="size-14 border border-ink object-cover grayscale"
          />
          <p>
            <span className="block font-medium">{profile.name}</span>
            <span className="text-[14px] leading-[1.4] text-ink-2">
              {t("authorLine")}
            </span>
          </p>
        </div>
      </header>

      <ArticleBody
        layout={layoutBySlug[post.slug.sr] ?? "split"}
        sections={toSections(blocks)}
        image={`/images/blog/${post.slug.sr}.webp`}
        alt={post.title[l]}
        answer={post.answer[l]}
        answerLabel={t("answer")}
      />

      <div
        data-reveal
        className="dark-sheet mt-16 flex flex-col gap-5 border border-ink p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8"
      >
        <p className="text-[clamp(22px,2.2vw,30px)] leading-[1.2] font-medium tracking-[-0.02em]">
          {t("ctaTitle")}
        </p>
        <Link
          href="/contact"
          className="flex min-h-12 shrink-0 items-center justify-center bg-blue px-6 font-mono text-[13px] tracking-[0.05em] uppercase hover:bg-blue-2 hover:text-ink"
        >
          {t("ctaButton")} →
        </Link>
      </div>

      <Link
        href={blogHref(next.slug[l])}
        className="group mt-20 grid items-center border border-ink bg-paper p-6 transition-colors hover:bg-ink hover:text-paper lg:grid-cols-[1fr_auto] lg:p-7"
      >
        <span>
          <span className="label group-hover:text-paper/70">{t("next")}</span>
          <span className="mt-1 block text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.05] tracking-[-0.04em]">
            {next.title[l]}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="text-[56px] text-blue transition-transform duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-blue-2"
        >
          →
        </span>
      </Link>
    </article>
  );
}
