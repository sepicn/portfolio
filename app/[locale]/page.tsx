import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { pageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import {
  siBlender,
  siGoogleads,
  siGoogleanalytics,
  siGooglesearchconsole,
  siGoogletagmanager,
  siLaravel,
  siMeta,
  siNextdotjs,
  siNuxt,
  siReact,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVuedotjs,
} from "simple-icons";
import { Link } from "@/i18n/navigation";
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

// Search has no brand of its own, so SEO borrows the Search Console mark.
const ticker = (
  [
    ["TypeScript", siTypescript],
    ["React 19", siReact],
    ["Next.js 16", siNextdotjs],
    ["Vue 3", siVuedotjs],
    ["Nuxt 4", siNuxt],
    ["Laravel 12", siLaravel],
    ["Tailwind 4", siTailwindcss],
    ["Google Ads", siGoogleads],
    ["Meta Ads", siMeta],
    ["GA4", siGoogleanalytics],
    ["GTM", siGoogletagmanager],
    ["SEO", siGooglesearchconsole],
    ["Three.js", siThreedotjs],
    ["Blender", siBlender],
  ] as const
).map(([label, icon]) => ({ label, logo: icon.path }));

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
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-night-950/95 via-night-950/75 to-transparent md:block" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-gradient-to-b from-night-950/90 via-night-950/70 to-transparent md:hidden" />
              <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto max-w-6xl px-4 sm:px-6 lg:top-28">
                <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
                  {t("heroEyebrow")}
                </p>
                <h1 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink-100 text-glow-pink sm:text-4xl lg:text-5xl">
                  {t("title")}
                </h1>
                <p className="mt-4 max-w-md text-base text-ink-100 sm:text-lg">
                  {t("heroLead")}
                </p>
                <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-neon-cyan notch px-5 py-2.5 font-medium text-night-950 transition [--n:10px] hover:brightness-110"
                  >
                    {t("ctaContact")}
                  </Link>
                  <Link
                    href="/projects"
                    className="notch border border-neon-cyan/60 bg-night-950/60 px-5 py-2.5 font-medium text-neon-cyan transition [--n:10px] hover:bg-night-950/80"
                  >
                    {t("ctaProjects")}
                  </Link>
                </div>
                <p className="mt-4 hidden max-w-sm text-sm text-ink-400 md:block">
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
