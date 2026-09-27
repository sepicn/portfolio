import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { CyberFrame } from "@/components/cyber-frame";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/content/data/profile";
import { pick } from "@/content/i18n";
import { RevealContact } from "@/components/reveal-contact";
import { encodeContact } from "@/lib/obfuscate";
import { FloatingProp } from "@/components/ambient/floating-prop";
import { SignalLed } from "@/components/ambient/signal-led";
import { Marquee } from "@/components/motion/marquee";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  personId,
  serializeJsonLd,
  websiteId,
} from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/contact",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "contact",
    }),
  };
}

export default function ContactPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contact");
  const navT = useTranslations("nav");
  const jsonLd = graph(
    {
      "@type": "ContactPage",
      "@id": `${absoluteUrl(locale, "/contact")}#page`,
      url: absoluteUrl(locale, "/contact"),
      name: t("metaTitle"),
      description: t("metaDescription"),
      inLanguage: locale === "sr" ? "sr-Latn-RS" : "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [navT("contact"), "/contact"],
    ]),
  );

  const links = [
    { label: "LinkedIn", value: "linkedin.com/in/sepicn", href: profile.linkedin },
    { label: "GitHub", value: "github.com/sepicn", href: profile.github },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PageIntro
        title={t("title")}
        intro={t("intro")}
        aside={<FloatingProp src="/images/props/telephone.webp" glow="pink" priority />}
      >
        <SignalLed label={t("signal")} className="mt-6" />
      </PageIntro>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-28 sm:px-6 md:grid-cols-2">
        <Reveal from="left">
          <div className="space-y-3">
            <RevealContact
              variant="row"
              kind="email"
              encoded={encodeContact(profile.email)}
            />
            <RevealContact
              variant="row"
              kind="phone"
              encoded={encodeContact(profile.phone)}
            />
            <RevealContact
              variant="row"
              kind="whatsapp"
              encoded={encodeContact(profile.phone)}
            />
          </div>
          <ul className="mt-3 space-y-3">
            {links.map((c, i) => (
              <li key={c.label}>
                <a href={c.href} target="_blank" rel="noopener" className="group block">
                  <CyberFrame
                    variant={[0, 8, 4, 1][i % 4]}
                    scale={0.45}
                    edgeClassName="group-hover:bg-neon-cyan/50"
                    className="flex min-h-[3.625rem] items-center justify-between bg-night-900 px-4 py-3"
                  >
                    <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
                      {c.label}
                    </span>
                    <span className="text-ink-100">{c.value}</span>
                  </CyberFrame>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-400">
            {t("location")} · {pick(profile.availability, locale)}
          </p>
          <h2 className="mt-10 text-xl font-semibold text-ink-100">{t("howTitle")}</h2>
          <p className="mt-3 leading-relaxed text-ink-300">{t("how")}</p>
          <h2 className="mt-8 text-xl font-semibold text-ink-100">{t("areaTitle")}</h2>
          <p className="mt-3 leading-relaxed text-ink-300">{t("area")}</p>
        </Reveal>
        <Reveal from="right" delay={0.1}>
          <ContactForm encodedEmail={encodeContact(profile.email)} />
        </Reveal>
      </div>
      <Marquee
        reverse
        variant="caution"
        className="mb-16"
        items={
          locale === "en"
            ? [
                "Websites",
                "Web apps",
                "Google Ads",
                "Meta Ads",
                "SEO",
                "Freelance",
                "Full-time",
                "Belgrade",
                "Remote",
              ]
            : [
                "Sajtovi",
                "Web aplikacije",
                "Google Ads",
                "Meta Ads",
                "SEO",
                "Freelance",
                "Stalni posao",
                "Beograd",
                "Remote",
              ]
        }
      />
    </>
  );
}
