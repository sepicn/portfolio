import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { pick, pickList } from "@/content/i18n";
import {
  certificates,
  education,
  languages,
  profile,
  skillGroups,
} from "@/content/data/profile";
import { experience } from "@/content/data/experience";
import { projects } from "@/content/data/projects";
import lastmod from "@/lib/lastmod.json";
import { siteConfig } from "@/lib/site-config";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  personJsonLd,
  serializeJsonLd,
} from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/cv",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "cv",
    }),
  };
}

function period(start: string, end: string | null, locale: string) {
  const f = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString(
      locale === "en" ? "en-GB" : "sr-Latn-RS",
      {
        month: "short",
        year: "numeric",
      },
    );
  };
  return `${f(start)} · ${end ? f(end) : locale === "en" ? "present" : "danas"}`;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 grid gap-3 border-t border-ink pt-5 lg:grid-cols-[200px_1fr] lg:gap-10 print:mt-6">
      <h2 className="font-mono text-[12px] tracking-[0.1em] text-blue uppercase print:text-black">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default async function CvPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cv" });
  const cvProjects = [
    ...projects.filter((p) => p.kind === "saas"),
    ...projects.filter((p) => p.kind === "personal"),
  ].slice(0, 4);
  const en = locale === "en";
  const jsonLd = graph(
    {
      "@type": "ProfilePage",
      "@id": `${absoluteUrl(locale, "/cv")}#page`,
      url: absoluteUrl(locale, "/cv"),
      name: t("metaTitle"),
      inLanguage: en ? "en" : "sr-Latn-RS",
      dateModified: lastmod["/cv"].date,
      mainEntity: personJsonLd(locale),
    },
    breadcrumbJsonLd(locale, [
      [siteConfig.name, "/"],
      ["CV", "/cv"],
    ]),
  );

  return (
    <div className="wrap pt-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="flex flex-col gap-4 border border-ink bg-paper p-5 lg:flex-row lg:items-center lg:justify-between print:hidden">
        <p className="text-[16px] text-ink-2">{t("intro")}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={en ? "/cv/Nikola_Sepic_CV_EN.pdf" : "/cv/Nikola_Sepic_CV.pdf"}
            download
            className="btn btn-primary"
          >
            {t("downloadPdf")} ↓
          </a>
          <a
            href={en ? "/cv/Nikola_Sepic_CV_EN.docx" : "/cv/Nikola_Sepic_CV.docx"}
            download
            className="btn btn-ghost"
          >
            {t("downloadDocx")} ↓
          </a>
        </div>
      </div>

      <article className="mx-auto mt-8 max-w-5xl border border-ink bg-paper px-5 py-8 lg:px-14 lg:py-14 print:border-0 print:p-0">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.045em]">
              {profile.name}
            </h1>
            <p className="mt-3 text-[19px] text-blue print:text-black">
              {pick(profile.cvTitle, locale)}
            </p>
          </div>
          <address className="space-y-1 text-[15px] not-italic">
            <p>{pick(profile.location, locale)}</p>
            <p>
              <a href={`mailto:${profile.email}`} className="hover:text-blue">
                {profile.email}
              </a>
            </p>
            <p>
              <a href={profile.phoneHref} className="hover:text-blue">
                {profile.phone}
              </a>
            </p>
            <p className="font-mono text-[13px]">
              <a href={profile.website} className="hover:text-blue">
                sepic.me
              </a>{" "}
              ·{" "}
              <a href={profile.linkedin} className="hover:text-blue">
                linkedin.com/in/sepicn
              </a>{" "}
              ·{" "}
              <a href={profile.github} className="hover:text-blue">
                github.com/sepicn
              </a>
            </p>
          </address>
        </header>

        <Section title={t("sections.summary")}>
          <p className="text-[16px] leading-[1.65]">{pick(profile.cvSummary, locale)}</p>
        </Section>

        <Section title={t("sections.skills")}>
          <dl className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.id}>
                <dt className="font-medium">{pick(g.label, locale)}</dt>
                <dd className="mt-1 text-[15px] leading-[1.55] text-ink-2">
                  {g.skills.map((s) => s.name).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={t("sections.experience")}>
          <ol className="space-y-8">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[20px] tracking-[-0.02em]">
                    {pick(job.role, locale)}{" "}
                    <span className="text-ink-2">· {job.company}</span>
                  </h3>
                  <span className="font-mono text-[12px] text-ink-2">
                    {period(job.start, job.end, locale)} · {pick(job.location, locale)}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-[1.6]">
                  {pick(job.summary, locale)}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-[1.55] text-ink-2 marker:text-blue">
                  {pickList(job.bullets, locale).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section title={t("sections.projects")}>
          <ul className="space-y-5">
            {cvProjects.map((p) => (
              <li key={p.slug}>
                <h3 className="text-[18px]">
                  {p.title}{" "}
                  <span className="font-mono text-[12px] text-ink-2">
                    {p.stack.slice(0, 5).join(" · ")}
                  </span>
                </h3>
                <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">
                  {pick(p.tagline, locale)} {pickList(p.did, locale)[0]}
                </p>
                <p className="mt-0.5 font-mono text-[12px] text-ink-3">
                  {[p.links.live, p.links.repo].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("sections.education")}>
          {education.map((e) => (
            <div key={e.period}>
              <h3 className="text-[18px]">{pick(e.degree, locale)}</h3>
              <p className="text-[15px] text-ink-2">
                {pick(e.school, locale)} · {e.period.replace(/\s.\s/, " · ")}
              </p>
            </div>
          ))}
          <p className="mt-4 text-[15px] text-ink-2">
            <span className="font-medium text-ink">{t("sections.languages")}: </span>
            {languages
              .map((l) => `${pick(l.name, locale)} (${pick(l.level, locale)})`)
              .join(", ")}
          </p>
        </Section>

        <Section title={t("sections.certificates")}>
          <ul className="space-y-1 text-[15px]">
            {certificates.map((c) => (
              <li key={c.url}>
                {c.title}{" "}
                <span className="text-ink-2">
                  · {c.org}, {c.year}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </div>
  );
}
