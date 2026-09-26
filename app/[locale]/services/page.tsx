import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { pick, pickList } from "@/content/i18n";
import { services, process, faq } from "@/content/data/services";
import { siteConfig } from "@/lib/site-config";
import { personId, serializeJsonLd } from "@/lib/structured-data";
import { FloatingProp } from "@/components/ambient/floating-prop";
import { NeonHorizon } from "@/components/ambient/neon-horizon";
import { Marquee } from "@/components/motion/marquee";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/services",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "services",
    }),
  };
}

export default function ServicesPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("services");
  const key = locale === "en" ? "en" : "sr";
  const steps = process[key];
  const questions = faq[key];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: `${siteConfig.url}${locale === "en" ? "/en" : ""}/services`,
      provider: { "@id": personId },
      image: `${siteConfig.url}/og/${locale}-services.jpg`,
      areaServed: [
        { "@type": "City", name: "Belgrade" },
        { "@type": "Country", name: "Serbia" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belgrade",
        addressCountry: "RS",
      },
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pick(s.title, locale),
          description: pick(s.lead, locale),
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PageIntro
        eyebrow={t("title")}
        title={t("headline")}
        intro={t("intro")}
        aside={
          <FloatingProp src="/images/props/open-sign-off.webp" glow="pink" priority>
            {/* The lit render over the unlit one, flickering like a real neon sign. */}
            <Image
              src="/images/props/open-sign.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 60vw, 360px"
              className="animate-neon object-contain"
            />
          </FloatingProp>
        }
      />
      <Marquee
        reverse
        className="mb-20"
        items={[
          "Next.js",
          "Nuxt",
          "Laravel",
          "Google Ads",
          "Meta Ads",
          "SEO",
          "GA4",
          "GTM",
          "Core Web Vitals",
          "Landing pages",
        ]}
      />

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:px-6">
        {services.map((service, i) => (
          <section key={service.id} id={service.id} className="scroll-mt-24">
            <div
              className={`grid items-start gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <Reveal from={i % 2 === 0 ? "left" : "right"}>
                <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
                  0{i + 1}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
                  {pick(service.title, locale)}
                </h2>
                <p className="mt-5 text-lg text-ink-200">{pick(service.lead, locale)}</p>
                <p className="mt-4 text-ink-400">
                  <span className="text-ink-200">{t("forWhom")}:</span>{" "}
                  {pick(service.forWhom, locale)}
                </p>
              </Reveal>
              <Reveal from={i % 2 === 0 ? "right" : "left"} delay={0.1}>
                <ul className="neon-frame rounded-2xl border border-white/5 bg-night-800/50 p-7">
                  <li className="mb-3 font-mono text-xs tracking-widest text-ink-400 uppercase">
                    {t("includes")}
                  </li>
                  {pickList(service.includes, locale).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-t border-white/5 py-3 text-ink-200"
                    >
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-neon-pink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <NeonHorizon />
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow={t("processEyebrow")} title={t("processTitle")} />
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal
                key={step.title}
                as="li"
                delay={i * 0.1}
                className="rounded-2xl border border-white/10 p-6"
              >
                <span className="font-mono text-2xl text-neon-pink">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink-200">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title={t("faqTitle")} />
          </Reveal>
          <dl className="mt-10 divide-y divide-white/5">
            {questions.map((item, i) => (
              <Reveal
                key={item.q}
                as="div"
                from={i % 2 === 0 ? "left" : "right"}
                className="py-6"
              >
                <dt className="font-display text-lg font-semibold text-ink-100">
                  {item.q}
                </dt>
                <dd className="mt-2 text-ink-200">{item.a}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-12">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-neon-pink px-6 py-3 font-medium text-night-950 shadow-neon-pink transition hover:brightness-110"
            >
              {t("cta")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
