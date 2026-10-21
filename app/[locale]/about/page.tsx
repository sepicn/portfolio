import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { pick, pickList } from "@/content/i18n";
import { certificates, education, languages, profile } from "@/content/data/profile";
import { experience } from "@/content/data/experience";
import { graph, personJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { PageHead } from "@/components/sections/page-head";
import { SectionHead } from "@/components/sections/section-head";
import { SkillProof } from "@/components/sections/skill-proof";
import { AboutMe } from "@/components/sections/about-me";
import { home } from "@/content/data/home";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/about",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "about",
    }),
  };
}

const months = {
  sr: [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "avg",
    "sep",
    "okt",
    "nov",
    "dec",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const m = months[locale === "en" ? "en" : "sr"];
  const date = (v: string | null) => {
    if (!v) return pick(home.now, locale);
    const [y, mo] = v.split("-");
    return `${m[Number(mo) - 1]} ${y}`;
  };

  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph(personJsonLd(locale))) }}
      />
      <PageHead
        crumbs={[{ label: nav("home"), href: "/" }, { label: nav("about") }]}
        tag={pick(profile.title, locale)}
        title={t("title")}
        lead={pick(home.who, locale)}
      />

      <section className="pt-20 lg:pt-28">
        <AboutMe locale={locale} />
      </section>

      <section aria-labelledby="exp-title" className="pt-24 lg:pt-32">
        <SectionHead
          id="exp-title"
          tag={t("experienceEyebrow")}
          title={t("experienceTitle")}
        />
        <ol className="border-x border-t border-ink">
          {experience.map((job) => (
            <li
              key={job.id}
              className="grid gap-4 border-b border-ink bg-paper px-5 py-8 lg:grid-cols-[240px_1fr] lg:gap-12 lg:px-8 lg:py-10"
            >
              <div>
                <p className="font-mono text-[13px] text-blue">
                  {date(job.start)} · {date(job.end)}
                </p>
                <p className="mt-2 text-[15px] text-ink-2">
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener"
                      className="underline-offset-4 hover:text-blue hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                  , {pick(job.location, locale)}
                </p>
              </div>
              <div>
                <h3 className="text-[28px] leading-[1.1] tracking-[-0.03em]">
                  {pick(job.role, locale)}
                </h3>
                <ul className="mt-5 max-w-[68ch] space-y-3 text-[16px] leading-[1.6]">
                  {pickList(job.bullets, locale)
                    .slice(0, 3)
                    .map((b) => (
                      <li key={b} className="grid grid-cols-[16px_1fr] gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[0.75em] h-px w-3 bg-blue"
                        />
                        {b}
                      </li>
                    ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <li
                      key={s}
                      className="border border-rule px-2 py-1 font-mono text-[12px] text-ink-2"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills-title" className="pt-24 lg:pt-32">
        <SectionHead
          id="skills-title"
          tag={pick(home.skillsTag, locale)}
          title={pick(home.skillsTitle, locale)}
          lead={pick(home.skillsLead, locale)}
        />
        <SkillProof locale={locale} />
      </section>

      <section
        aria-labelledby="edu-title"
        className="grid gap-10 pt-24 lg:grid-cols-3 lg:pt-32"
      >
        <div>
          <p className="tag">{t("educationEyebrow")}</p>
          <h2 id="edu-title" className="mt-3 text-title">
            {t("educationTitle")}
          </h2>
          {education.map((e) => (
            <div key={e.period} className="mt-6 border border-ink bg-paper p-5">
              <p className="font-mono text-[13px] text-blue">
                {e.period.replace(/\s.\s/, " · ")}
              </p>
              <h3 className="mt-2 text-[20px] tracking-[-0.02em]">
                {pick(e.degree, locale)}
              </h3>
              <p className="mt-1 text-[15px] text-ink-2">{pick(e.school, locale)}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="tag">{t("certificatesEyebrow")}</p>
          <h2 className="mt-3 text-title">{t("certificatesTitle")}</h2>
          <ul className="mt-6 border-t border-rule">
            {certificates.map((c) => (
              <li key={c.title} className="border-b border-rule py-3">
                <a href={c.url} target="_blank" rel="noopener" className="group block">
                  <span className="text-[16px] font-medium group-hover:text-blue">
                    {c.title} ↗
                  </span>
                  <span className="mt-0.5 block font-mono text-[12px] text-ink-2">
                    {c.org} · {c.year}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="tag">{t("languages")}</p>
          <h2 className="mt-3 text-title">{t("languages")}</h2>
          <ul className="mt-6 border-t border-rule">
            {languages.map((l) => (
              <li
                key={l.name.en}
                className="flex justify-between border-b border-rule py-3 text-[16px]"
              >
                <span className="font-medium">{pick(l.name, locale)}</span>
                <span className="text-ink-2">{pick(l.level, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
