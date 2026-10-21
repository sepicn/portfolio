import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectHref, serviceHref } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";
import { pick, pickList } from "@/content/i18n";
import { faq, process, servicePages, services } from "@/content/data/services";
import { projects } from "@/content/data/projects";
import { siteConfig } from "@/lib/site-config";
import { PageHead } from "@/components/sections/page-head";
import { SectionHead } from "@/components/sections/section-head";
import { FaqList } from "@/components/sections/faq-list";
import { ContactBlock } from "@/components/sections/contact-block";
import { ServiceArt } from "@/components/sections/service-art";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  businessJsonLd,
  graph,
  personId,
  serializeJsonLd,
} from "@/lib/structured-data";

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

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const key = locale === "en" ? "en" : "sr";
  const titles = new Map(projects.map((p) => [p.slug, p.title]));

  const jsonLd = graph(
    {
      ...businessJsonLd(locale),
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${absoluteUrl(locale, `/services/${s.id}`)}#service`,
          name: pick(servicePages[s.id].h1, locale),
          description: pick(s.lead, locale),
          url: absoluteUrl(locale, `/services/${s.id}`),
          provider: { "@id": personId },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq[key].map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [nav("services"), "/services"],
    ]),
  );

  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PageHead
        crumbs={[{ label: nav("home"), href: "/" }, { label: nav("services") }]}
        tag={t("tag")}
        title={t("title")}
        lead={t("intro")}
      />

      <div className="mt-10 border-t border-ink">
        {services.map((s, i) => (
          <section
            key={s.id}
            aria-labelledby={`svc-${s.id}`}
            className="grid gap-6 border-b border-ink py-10 lg:grid-cols-[180px_1.2fr_1fr] lg:gap-10 lg:py-14"
          >
            <ServiceArt id={s.id} size={140} />
            <div>
              <p className="font-mono text-[13px] text-blue">0{i + 1}</p>
              <h2 id={`svc-${s.id}`} className="mt-2 text-title">
                {pick(s.title, locale)}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-ink-2">
                {pick(s.lead, locale)}
              </p>
              <Link href={serviceHref(s.id, locale)} className="btn btn-primary mt-6">
                {t("more")} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div>
              <h3 className="label">{t("includes")}</h3>
              <ul className="mt-3 border-t border-rule">
                {pickList(s.includes, locale).map((item) => (
                  <li key={item} className="border-b border-rule py-2.5 text-[15px]">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap items-center gap-1.5 text-[14px] text-ink-2">
                <span className="mr-1">{t("examples")}:</span>
                {s.examples
                  .filter((slug) => titles.has(slug))
                  .map((slug) => (
                    <Link
                      key={slug}
                      href={projectHref(slug)}
                      className="chip min-h-9 hover:border-blue hover:text-blue"
                    >
                      {titles.get(slug)}
                    </Link>
                  ))}
              </p>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="steps-title" className="pt-24 lg:pt-32">
        <SectionHead
          id="steps-title"
          tag={t("processEyebrow")}
          title={t("processTitle")}
        />
        <ol className="grid border border-ink bg-paper sm:grid-cols-2 lg:grid-cols-4">
          {process[key].map((step, i) => (
            <li
              key={step.title}
              className="border-b border-ink p-6 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <p className="text-[48px] leading-none font-light tracking-[-0.05em] text-blue">
                0{i + 1}
              </p>
              <h3 className="mt-4 text-[22px] tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq-title" className="pt-24 lg:pt-32">
        <SectionHead id="faq-title" tag="FAQ" title={t("faqTitle")} />
        <FaqList items={faq[key]} />
      </section>

      <ContactBlock locale={locale} />
    </div>
  );
}
