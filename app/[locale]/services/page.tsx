import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { CyberFrame } from "@/components/cyber-frame";
import { CyberDivider } from "@/components/cyber-divider";
import { SectionHeading } from "@/components/section-heading";
import { pick, pickList } from "@/content/i18n";
import { services, process, faq } from "@/content/data/services";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/content/data/projects";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  businessId,
  graph,
  personId,
  serializeJsonLd,
} from "@/lib/structured-data";
import { FloatingProp } from "@/components/ambient/floating-prop";
import { NeonHorizon } from "@/components/ambient/neon-horizon";
import { Marquee } from "@/components/motion/marquee";
import { Testimonials } from "@/components/testimonials";

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

  const navT = useTranslations("nav");
  const jsonLd = graph(
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: siteConfig.name,
      url: absoluteUrl(locale, "/services"),
      founder: { "@id": personId },
      image: `${siteConfig.url}/og/${locale}-services.jpg`,
      description: t("metaDescription"),
      // Belgrade in person, everywhere else remotely.
      areaServed: [
        { "@type": "City", name: "Belgrade" },
        { "@type": "Country", name: "Serbia" },
        { "@type": "Place", name: "Worldwide (remote)" },
      ],
      knowsLanguage: ["sr", "en"],
      sameAs: [siteConfig.github, siteConfig.linkedin],
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
      "@type": "FAQPage",
      mainEntity: questions.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [navT("services"), "/services"],
    ]),
  );

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
        variant="terminal"
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
                <p className="mt-4 text-ink-400">
                  <span className="text-ink-200">{t("examples")}:</span>{" "}
                  {service.examples.map((slug, j) => {
                    const project = projects.find((p) => p.slug === slug);
                    if (!project) return null;
                    return (
                      <span key={slug}>
                        {j > 0 ? ", " : ""}
                        <Link
                          href={`/projects/${slug}`}
                          className="text-neon-cyan underline-offset-4 hover:underline"
                        >
                          {project.title}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              </Reveal>
              <Reveal from={i % 2 === 0 ? "right" : "left"} delay={0.1}>
                <CyberFrame
                  as="ul"
                  variant={[3, 8, 5, 9][i % 4]}
                  tone="spin"
                  className="bg-night-800 p-7"
                >
                  <li className="mb-3 font-mono text-xs tracking-widest text-ink-400 uppercase">
                    {t("includes")}
                  </li>
                  {pickList(service.includes, locale).map((item, j) => (
                    <li key={item} className="text-ink-200">
                      <CyberDivider variant={i * 3 + j} className="text-white/10" />
                      <span className="flex gap-3 py-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rotate-45 bg-neon-pink"
                        />
                        {item}
                      </span>
                    </li>
                  ))}
                </CyberFrame>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <Testimonials locale={locale} />
      <NeonHorizon />
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow={t("processEyebrow")} title={t("processTitle")} />
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 0.1}>
                <CyberFrame
                  variant={[6, 1, 10, 4][i % 4]}
                  scale={0.7}
                  edgeClassName="h-full"
                  className="bg-night-900 p-6"
                >
                  <span className="font-mono text-2xl text-neon-pink">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-200">{step.body}</p>
                </CyberFrame>
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
          <dl className="mt-10">
            {questions.map((item, i) => (
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
          <Reveal className="mt-12">
            <Link
              href="/contact"
              className="inline-block bg-neon-pink notch-alt px-6 py-3 font-medium text-night-950 transition [--n:10px] hover:brightness-110"
            >
              {t("cta")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
