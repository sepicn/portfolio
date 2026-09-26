import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Reveal } from "@/components/reveal";
import { pick, pickList } from "@/content/i18n";
import {
  profile,
  skillGroups,
  education,
  certificates,
  languages,
} from "@/content/data/profile";
import { experience } from "@/content/data/experience";
import { projects } from "@/content/data/projects";
import { FloatingProp } from "@/components/ambient/floating-prop";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: true },
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
      { month: "short", year: "numeric" },
    );
  };
  return `${f(start)} – ${end ? f(end) : locale === "en" ? "present" : "danas"}`;
}

/**
 * The CV as a page: same data as the rest of the site, printable (print stylesheet in
 * globals.css), with the classic contact block because a CV has to be reachable.
 */
export default function CvPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("cv");
  const cvProjects = projects.filter((p) => p.kind === "personal").slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 pt-12 pb-28 sm:px-6">
      <Reveal className="no-print">
        <div className="neon-frame flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-night-800/50 p-5">
          <div className="flex items-center gap-4">
            <FloatingProp
              src="/images/props/floppy.webp"
              glow="cyan"
              className="hidden w-20 shrink-0 sm:block"
            />
            <p className="text-ink-200">{t("intro")}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={
                locale === "en" ? "/cv/Nikola_Sepic_CV_EN.pdf" : "/cv/Nikola_Sepic_CV.pdf"
              }
              download
              className="rounded-md bg-neon-cyan px-4 py-2 font-medium text-night-950 shadow-neon-cyan"
            >
              {t("downloadPdf")}
            </a>
            <a
              href={
                locale === "en"
                  ? "/cv/Nikola_Sepic_CV_EN.docx"
                  : "/cv/Nikola_Sepic_CV.docx"
              }
              download
              className="rounded-md border border-white/15 px-4 py-2 font-medium text-ink-100 hover:border-neon-pink/60"
            >
              {t("downloadDocx")}
            </a>
          </div>
        </div>
      </Reveal>

      <article className="cv mt-10 rounded-2xl border border-white/10 bg-night-900/80 p-8 sm:p-12 print:border-0 print:bg-white print:p-0 print:text-black">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-8 print:border-black/20">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-100 print:text-black">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-neon-cyan print:text-black">
              {pick(profile.cvTitle, locale)}
            </p>
          </div>
          <address className="space-y-1 text-sm text-ink-200 not-italic print:text-black">
            <p>{pick(profile.location, locale)}</p>
            <p>
              <a href={`mailto:${profile.email}`} className="hover:text-neon-cyan">
                {profile.email}
              </a>
            </p>
            <p>
              <a href={profile.phoneHref} className="hover:text-neon-cyan">
                {profile.phone}
              </a>
            </p>
            <p>
              <a href={profile.website} className="hover:text-neon-cyan">
                sepic.me
              </a>{" "}
              ·{" "}
              <a href={profile.linkedin} className="hover:text-neon-cyan">
                linkedin.com/in/sepicn
              </a>{" "}
              ·{" "}
              <a href={profile.github} className="hover:text-neon-cyan">
                github.com/sepicn
              </a>
            </p>
          </address>
        </header>

        <Section title={t("sections.summary")}>
          <p className="text-ink-200 print:text-black">
            {pick(profile.cvSummary, locale)}
          </p>
        </Section>

        <Section title={t("sections.skills")}>
          <dl className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.id}>
                <dt className="font-mono text-xs tracking-widest text-neon-pink uppercase print:text-black">
                  {pick(g.label, locale)}
                </dt>
                <dd className="mt-1 text-sm text-ink-200 print:text-black">
                  {g.skills.map((s) => s.name).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={t("sections.experience")}>
          <ol className="space-y-7">
            {experience.map((job) => (
              <li key={job.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink-100 print:text-black">
                    {pick(job.role, locale)}{" "}
                    <span className="font-normal text-ink-400 print:text-black">
                      · {job.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-ink-400 print:text-black">
                    {period(job.start, job.end, locale)} · {pick(job.location, locale)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-200 print:text-black">
                  {pick(job.summary, locale)}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-200 print:text-black">
                  {pickList(job.bullets, locale).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section title={t("sections.projects")}>
          <ul className="space-y-4">
            {cvProjects.map((p) => (
              <li key={p.slug}>
                <h3 className="font-display text-base font-semibold text-ink-100 print:text-black">
                  {p.title}{" "}
                  <span className="font-mono text-xs font-normal text-ink-400 print:text-black">
                    {p.stack.slice(0, 5).join(" · ")}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-ink-200 print:text-black">
                  {pick(p.tagline, locale)} {pickList(p.did, locale)[0]}
                </p>
                <p className="text-xs text-ink-400 print:text-black">
                  {[p.links.live, p.links.repo].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid gap-8 sm:grid-cols-2">
          <Section title={t("sections.education")}>
            {education.map((e) => (
              <div key={e.period}>
                <h3 className="font-semibold text-ink-100 print:text-black">
                  {pick(e.degree, locale)}
                </h3>
                <p className="text-sm text-ink-200 print:text-black">
                  {pick(e.school, locale)} · {e.period}
                </p>
              </div>
            ))}
            <h3 className="mt-6 font-mono text-xs tracking-widest text-neon-pink uppercase print:text-black">
              {t("sections.languages")}
            </h3>
            <p className="mt-1 text-sm text-ink-200 print:text-black">
              {languages
                .map((l) => `${pick(l.name, locale)} (${pick(l.level, locale)})`)
                .join(", ")}
            </p>
          </Section>
          <Section title={t("sections.certificates")}>
            <ul className="space-y-1 text-sm text-ink-200 print:text-black">
              {certificates.map((c) => (
                <li key={c.url}>
                  {c.title} · {c.org}, {c.year}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="mb-4 font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase print:text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}
