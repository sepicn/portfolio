import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { pageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Hero3D } from "@/components/hero/hero-3d";
import { HomeDeck } from "@/components/home/home-deck";
import { Marquee } from "@/components/motion/marquee";
import {
  graph,
  personJsonLd,
  websiteJsonLd,
  serializeJsonLd,
} from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return pageMetadata({
    locale,
    path: "/",
    title: t("metaTitle"),
    description: t("description"),
    ogKey: "home",
  });
}

const ticker = [
  "TypeScript",
  "React 19",
  "Next.js 16",
  "Vue 3",
  "Nuxt 4",
  "Laravel 12",
  "Tailwind 4",
  "Google Ads",
  "Meta Ads",
  "GA4",
  "GTM",
  "SEO",
  "Three.js",
  "Blender",
];

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");
  const jsonLd = graph(websiteJsonLd(locale), personJsonLd(locale));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <section className="relative">
        <Hero3D
          overlay={
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] bg-gradient-to-r from-night-950/90 via-night-950/40 to-transparent md:block" />
              <div className="pointer-events-none absolute inset-x-0 top-[38%] mx-auto max-w-6xl -translate-y-1/2 px-4 sm:px-6">
                <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
                  sepic.me
                </p>
                <h1 className="mt-3 max-w-md font-display text-3xl font-semibold tracking-tight text-ink-100 text-glow-pink sm:text-4xl lg:text-5xl">
                  {t("title")}
                </h1>
                <p className="mt-4 max-w-sm text-sm text-ink-200 sm:text-base">
                  {t("hint")}
                </p>
              </div>
            </>
          }
        />
      </section>

      <Marquee items={ticker} />

      <HomeDeck />

      <div className="h-24" />
    </>
  );
}
