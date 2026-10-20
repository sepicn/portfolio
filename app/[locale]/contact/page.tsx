import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { profile } from "@/content/data/profile";
import { pick } from "@/content/i18n";
import { encodeContact } from "@/lib/obfuscate";
import { siteConfig } from "@/lib/site-config";
import { cvPdf } from "@/lib/cv";
import { RevealContact } from "@/components/reveal-contact";
import { ContactForm } from "@/components/contact-form";
import { PageHead } from "@/components/sections/page-head";
import { breadcrumbJsonLd, businessJsonLd, graph, serializeJsonLd } from "@/lib/structured-data";

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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const jsonLd = graph(
    businessJsonLd(locale),
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [nav("contact"), "/contact"],
    ]),
  );
  const links = [
    { label: "LinkedIn", value: "linkedin.com/in/sepicn", href: siteConfig.linkedin },
    { label: "GitHub", value: "github.com/sepicn", href: siteConfig.github },
  ];

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <PageHead crumbs={[{ label: nav("home"), href: "/" }, { label: nav("contact") }]} tag={t("tag")} title={t("title")} lead={t("intro")} />

      <div className="mt-10 grid border border-ink bg-paper lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-ink px-[18px] py-6 lg:border-r lg:border-b-0 lg:px-10 lg:py-10">
          <RevealContact variant="row" kind="email" encoded={encodeContact(profile.email)} />
          <RevealContact variant="row" kind="phone" encoded={encodeContact(profile.phone)} />
          <RevealContact variant="row" kind="whatsapp" encoded={encodeContact(profile.phone)} />
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="me noopener" className="flex min-h-[68px] items-center justify-between gap-4 border-b border-rule py-3 hover:text-blue">
              <span className="label">{l.label}</span>
              <span className="text-[18px] font-medium">{l.value} ↗</span>
            </a>
          ))}
          <a href={cvPdf(locale)} className="flex min-h-[68px] items-center justify-between gap-4 border-b border-rule py-3 hover:text-blue">
            <span className="label">CV</span>
            <span className="text-[18px] font-medium">PDF ↓</span>
          </a>
          <h2 className="mt-10 text-[24px] tracking-[-0.02em]">{t("areaTitle")}</h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-ink-2">{t("area")}</p>
          <p className="mt-4 font-mono text-[13px] text-ink-2">
            {t("location")} · {pick(profile.availability, locale)}
          </p>
        </div>
        <ContactForm encodedEmail={encodeContact(profile.email)} />
      </div>
    </div>
  );
}
