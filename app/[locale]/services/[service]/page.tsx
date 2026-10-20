import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectHref, serviceHref } from "@/i18n/paths";
import { routing } from "@/i18n/routing";
import { pick, pickList } from "@/content/i18n";
import { projects } from "@/content/data/projects";
import { serviceSlugs } from "@/content/data/service-slugs";
import { servicePageLabels as L, servicePages, services } from "@/content/data/services";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import { PageHead } from "@/components/sections/page-head";
import { SectionHead } from "@/components/sections/section-head";
import { FaqList } from "@/components/sections/faq-list";
import { ContactBlock } from "@/components/sections/contact-block";
import { absoluteUrl, breadcrumbJsonLd, graph, personId, serializeJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string; service: string }> };

const localeKey = (locale: string) => (locale === "en" ? "en" : "sr");

function findService(locale: string, slug: string) {
  return services.find((s) => serviceSlugs[s.id][localeKey(locale)] === slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, service: serviceSlugs[s.id][locale] })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, service: slug } = await params;
  const service = findService(locale, slug);
  if (!service) return {};
  const page = servicePages[service.id];
  const title = pick(page.metaTitle, locale);
  return {
    title,
    ...pageMetadata({
      locale,
      path: `/services/${service.id}`,
      title,
      description: pick(page.metaDescription, locale),
      ogKey: "services",
    }),
  };
}

const art: Record<string, { src: string; w: number; h: number }> = {
  web: { src: "/images/drawings/obj-web.webp", w: 586, h: 718 },
  "google-ads": { src: "/images/drawings/obj-ads.webp", w: 776, h: 691 },
  "meta-ads": { src: "/images/drawings/obj-meta.webp", w: 280, h: 625 },
  seo: { src: "/images/drawings/obj-seo.webp", w: 558, h: 700 },
};

export default async function ServicePage({ params }: Props) {
  const { locale, service: slug } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });
  const service = findService(locale, slug);
  if (!service) notFound();

  const key = localeKey(locale);
  const page = servicePages[service.id];
  const path = `/services/${service.id}`;
  const url = absoluteUrl(locale, path);
  const h1 = pick(page.h1, locale);
  const proof = page.proof
    .map((item) => ({ ...item, project: projects.find((p) => p.slug === item.slug) }))
    .filter((item) => item.project);
  const related = services.filter((s) => s.id !== service.id);

  const jsonLd = graph(
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: h1,
      serviceType: pick(service.title, locale),
      description: pick(page.metaDescription, locale),
      url,
      inLanguage: locale === "sr" ? "sr-Latn-RS" : "en",
      provider: { "@id": personId },
      areaServed: [
        { "@type": "City", name: "Belgrade" },
        { "@type": "Country", name: "Serbia" },
        { "@type": "Place", name: "Worldwide (remote)" },
      ],
      availableLanguage: ["sr", "en"],
      subjectOf: proof.map((item) => ({
        "@type": "CreativeWork",
        name: item.project!.title,
        url: absoluteUrl(locale, `/projects/${item.slug}`),
      })),
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      [nav("services"), "/services"],
      [pick(service.title, locale), path],
    ]),
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faq[key].map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  );

  return (
    <article className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <PageHead
        crumbs={[
          { label: nav("home"), href: "/" },
          { label: nav("services"), href: "/services" },
          { label: pick(service.title, locale) },
        ]}
        tag={pick(service.title, locale)}
        title={h1}
      >
        <div className="grid h-[150px] w-[150px] place-items-center lg:ml-auto">
          <Image src={art[service.id].src} width={art[service.id].w} height={art[service.id].h} alt="" priority className="max-h-full max-w-full object-contain" />
        </div>
      </PageHead>

      <div className="grid gap-10 pt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pt-16">
        <div className="space-y-5 text-[18px] leading-[1.65] lg:text-[20px]">
          {pickList(page.intro, locale).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <aside className="self-start border border-ink bg-paper">
          <div className="border-b border-ink p-5">
            <h2 className="label">{pick(L.forWhom, locale)}</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] leading-[1.5]">
              {pickList(page.forWhom, locale).map((x) => (
                <li key={x} className="grid grid-cols-[14px_1fr] gap-2.5">
                  <span aria-hidden="true" className="mt-[0.65em] h-px w-3 bg-blue" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5">
            <h2 className="label">{pick(L.notFor, locale)}</h2>
            <p className="mt-3 text-[15px] leading-[1.5] text-ink-2">{pick(page.notFor, locale)}</p>
          </div>
        </aside>
      </div>

      <section aria-labelledby="inc-title" className="pt-24 lg:pt-32">
        <SectionHead id="inc-title" tag={pick(service.title, locale)} title={pick(page.includedTitle, locale)} />
        <ul className="grid border-t border-l border-ink sm:grid-cols-2 lg:grid-cols-3">
          {page.included[key].map((item) => (
            <li key={item.title} className="border-r border-b border-ink bg-paper p-6">
              <h3 className="text-[21px] tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-ink-2">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="proc-title" className="pt-24 lg:pt-32">
        <SectionHead id="proc-title" tag={pick(L.timeline, locale)} title={pick(page.processTitle, locale)} lead={pick(page.timeline, locale)} />
        <ol className="border-l border-blue pl-6">
          {page.process[key].map((step, i) => (
            <li key={step.title} className="relative grid gap-1.5 border-b border-rule py-6 lg:grid-cols-[160px_1fr_1.4fr] lg:gap-7">
              <span aria-hidden="true" className="absolute top-[30px] -left-[30px] size-[11px] border-2 border-blue bg-bg" />
              <span className="font-mono text-[13px] text-blue">
                0{i + 1} · {step.time}
              </span>
              <h3 className="text-[22px] tracking-[-0.02em]">{step.title}</h3>
              <p className="text-[16px] leading-[1.55] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tools-title" className="grid gap-10 pt-24 lg:grid-cols-2 lg:pt-32">
        <div>
          <h2 id="tools-title" className="text-title">
            {pick(L.tools, locale)}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {page.tools.map((tool) => (
              <li key={tool} className="chip">
                {tool}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[16px] leading-[1.55] text-ink-2">{pick(page.toolsNote, locale)}</p>
        </div>
        <div>
          <h2 className="text-title">{pick(L.measure, locale)}</h2>
          <ul className="mt-6 border-t border-rule">
            {pickList(page.measure, locale).map((m) => (
              <li key={m} className="border-b border-rule py-3 text-[16px] leading-[1.5]">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {proof.length ? (
        <section aria-labelledby="proof-title" className="pt-24 lg:pt-32">
          <SectionHead id="proof-title" tag={pick(L.proofEyebrow, locale)} title={pick(L.proofTitle, locale)} />
          <ul className="grid gap-5 lg:grid-cols-3">
            {proof.map(({ slug: s, text, project }) => (
              <li key={s}>
                <Link href={projectHref(s)} className="group flex h-full flex-col border border-ink bg-paper p-6 transition-colors hover:bg-ink hover:text-paper">
                  <h3 className="text-[26px] tracking-[-0.03em]">{project!.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-ink-2 group-hover:text-paper/80">{pick(text, locale)}</p>
                  <span className="mt-auto pt-5 font-mono text-[13px] tracking-[0.05em] text-blue uppercase group-hover:text-blue-2">
                    {pick(L.proofLink, locale)} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="faq-title" className="pt-24 lg:pt-32">
        <SectionHead id="faq-title" tag="FAQ" title={pick(L.faqTitle, locale)} />
        <FaqList items={page.faq[key]} />
      </section>

      <nav aria-label={pick(L.related, locale)} className="mt-20 flex flex-wrap gap-2.5">
        <span className="label mr-2 self-center">{pick(L.related, locale)}:</span>
        {related.map((s) => (
          <Link key={s.id} href={serviceHref(s.id, locale)} className="chip min-h-11 hover:border-blue hover:text-blue">
            {pick(s.title, locale)}
          </Link>
        ))}
      </nav>

      <ContactBlock locale={locale} />
    </article>
  );
}
