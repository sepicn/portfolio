import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Reveal } from "@/components/reveal";
import { CyberFrame } from "@/components/cyber-frame";
import { SectionHeading } from "@/components/section-heading";
import { pick, pickList } from "@/content/i18n";
import {
  profile,
  skillGroups,
  education,
  certificates,
  languages,
  personal,
} from "@/content/data/profile";
import { experience } from "@/content/data/experience";
import { graph, personJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { NeonHorizon } from "@/components/ambient/neon-horizon";
import { TerminalLog } from "@/components/ambient/terminal-log";
import { Marquee } from "@/components/motion/marquee";

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

const levelDot: Record<string, string> = {
  daily: "bg-neon-pink shadow-neon-pink",
  solid: "bg-neon-cyan",
  working: "bg-ink-600",
};

function formatPeriod(start: string, end: string | null, locale: string) {
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString(
      locale === "en" ? "en-GB" : "sr-Latn-RS",
      {
        month: "short",
        year: "numeric",
      },
    );
  };
  return `${fmt(start)} – ${end ? fmt(end) : locale === "en" ? "present" : "danas"}`;
}

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");

  const jsonLd = graph(personJsonLd(locale));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 md:grid-cols-[3fr_2fr]">
        <Reveal from="left">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg text-ink-200">{pick(profile.summary, locale)}</p>
          <p className="mt-4 text-ink-200">{pick(personal, locale)}</p>
          <p className="mt-4 text-ink-400">{pick(profile.availability, locale)}</p>
        </Reveal>
        <Reveal from="right" delay={0.15} className="relative justify-self-center">
          {/* The portrait in a slowly rotating neon frame, with a soft glow behind it. */}
          <div className="relative">
            <div className="absolute -inset-6 animate-glow rounded-[2rem] bg-gradient-to-br from-neon-pink/40 via-neon-violet/25 to-neon-cyan/40 blur-2xl" />
            <CyberFrame variant={8} tone="spin" hollow className="p-[2px]">
              <Image
                src={profile.photo}
                sizes="(max-width: 640px) 256px, 320px"
                preload
                alt={profile.name}
                width={320}
                height={320}
                className="aspect-square w-64 object-cover sm:w-80"
                style={{ clipPath: "inherit" }}
              />
            </CyberFrame>
          </div>
        </Reveal>
      </section>

      <Marquee
        variant="outline"
        items={[
          "cat",
          "books",
          "gym",
          "code",
          "shoes",
          "gameboy",
          "hifi",
          "book",
          "cassettes",
          "speaker",
        ].map((name) => ({ icon: `/images/icons/${name}.webp`, label: name }))}
      />

      <section id="experience" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow={t("experienceEyebrow")}
              title={t("experienceTitle")}
            />
          </Reveal>
          <ol className="mt-12 space-y-10">
            {experience.map((job, i) => (
              <Reveal key={job.id} as="li" from={i % 2 === 0 ? "left" : "right"}>
                <CyberFrame
                  variant={[0, 5, 9, 2, 6, 10, 3][i % 7]}
                  className="grid gap-4 bg-night-900 p-7 md:grid-cols-[1fr_2fr]"
                >
                  <div>
                    <p className="font-mono text-xs tracking-widest text-neon-cyan uppercase">
                      {formatPeriod(job.start, job.end, locale)}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink-100">
                      {pick(job.role, locale)}
                    </h3>
                    <p className="mt-1 text-ink-400">
                      {job.companyUrl ? (
                        <a
                          href={job.companyUrl}
                          target="_blank"
                          rel="noopener"
                          className="hover:text-neon-cyan"
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                      {" · "}
                      {pick(job.location, locale)}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <li
                          key={s}
                          className="border border-white/10 notch-one px-2 py-0.5 font-mono text-xs text-ink-200 [--n:5px] [--nc:rgba(255,255,255,0.1)]"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-ink-200">{pick(job.summary, locale)}</p>
                    <ul className="mt-4 space-y-2">
                      {pickList(job.bullets, locale).map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-ink-200">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon-pink" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CyberFrame>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <TerminalLog
              className="order-2 md:order-1"
              lines={[
                "> git push origin main",
                "  main -> main (1 commit)",
                "> npm run build",
                "  compiled in 4.7s, 44 pages",
                "> lighthouse sepic.me",
                "  performance 99 · seo 100 · a11y 100",
                "> gtm: consent mode v2",
                "  tags fire only after consent",
                "> google-ads: campaign live",
                "  conversions tracked in GA4",
                "> blender -b -P build_room.py",
                "  room.glb 870 KB, 7 tour stops",
                "> deploy medicaltime.rs",
                "  ok",
              ]}
            />
            <Reveal from="right" className="order-1 md:order-2">
              <SectionHeading
                eyebrow={t("skillsEyebrow")}
                title={t("skillsTitle")}
                lead={t("skillsLead")}
                align="right"
              />
            </Reveal>
          </div>
          <ul className="mt-6 flex flex-wrap justify-end gap-5 font-mono text-xs tracking-widest text-ink-400 uppercase">
            {(["daily", "solid", "working"] as const).map((level) => (
              <li key={level} className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${levelDot[level]}`} />
                {t(`level.${level}`)}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.id} from={i % 2 === 0 ? "left" : "right"}>
                <CyberFrame
                  variant={[1, 10, 4, 7][i % 4]}
                  scale={0.8}
                  edgeClassName="h-full"
                  className="bg-night-900 p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-ink-100">
                    {pick(group.label, locale)}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.skills.map((s) => (
                      <li key={s.name} className="flex items-center gap-3 text-ink-200">
                        <span
                          className={`size-2 shrink-0 rounded-full ${levelDot[s.level]}`}
                        />
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </CyberFrame>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NeonHorizon />
      <section id="education" className="scroll-mt-24 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2">
          <Reveal from="left">
            <SectionHeading eyebrow={t("educationEyebrow")} title={t("educationTitle")} />
            {education.map((e, i) => (
              <CyberFrame
                key={e.period}
                variant={6 + i}
                tone="violet"
                edgeClassName="mt-8"
                className="bg-night-900 p-6"
              >
                <p className="font-mono text-xs tracking-widest text-neon-cyan uppercase">
                  {e.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-100">
                  {pick(e.degree, locale)}
                </h3>
                <p className="mt-1 text-ink-400">{pick(e.school, locale)}</p>
                <ul className="mt-4 space-y-1 text-sm text-ink-200">
                  {pickList(e.notes, locale).map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </CyberFrame>
            ))}
            <h3 className="mt-10 font-mono text-xs tracking-widest text-ink-400 uppercase">
              {t("languages")}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-4 text-ink-200">
              {languages.map((l) => (
                <li key={l.name.en}>
                  {pick(l.name, locale)}{" "}
                  <span className="text-ink-400">({pick(l.level, locale)})</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <SectionHeading
              eyebrow={t("certificatesEyebrow")}
              title={t("certificatesTitle")}
            />
            <ul className="mt-8 space-y-3">
              {certificates.map((c, i) => (
                <li key={c.url}>
                  <a href={c.url} target="_blank" rel="noopener" className="group block">
                    <CyberFrame
                      variant={i * 3 + 1}
                      scale={0.5}
                      edgeClassName="group-hover:bg-neon-cyan/50"
                      className="flex items-center justify-between gap-4 bg-night-900 p-4"
                    >
                      <span>
                        <span className="block text-ink-100">{c.title}</span>
                        <span className="text-sm text-ink-400">{c.org}</span>
                      </span>
                      <span className="font-mono text-sm text-neon-cyan">{c.year}</span>
                    </CyberFrame>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
