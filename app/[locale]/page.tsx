import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { featured, home } from "@/content/data/home";
import { projects } from "@/content/data/projects";
import { pick } from "@/content/i18n";
import { Hero } from "@/components/sections/hero";
import { SectionHead } from "@/components/sections/section-head";
import { ProjectFeature } from "@/components/sections/project-feature";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServicesBand } from "@/components/sections/services-band";
import { Jobs } from "@/components/sections/jobs";
import { SkillProof } from "@/components/sections/skill-proof";
import { AboutMe } from "@/components/sections/about-me";
import { ContactBlock } from "@/components/sections/contact-block";
import { CountUp } from "@/components/motion/count-up";
import {
  businessJsonLd,
  graph,
  personJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return pageMetadata({
    locale,
    path: "/",
    title: t("metaTitle"),
    description: t("description"),
    ogKey: "home",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = graph(websiteJsonLd(locale), personJsonLd(locale), businessJsonLd(locale));
  const total = String(projects.length);
  const facts = home.facts.map((f, i) => (i === 0 ? { ...f, value: total } : f));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="wrap">
        <Hero locale={locale} />
        <dl className="grid grid-cols-2 border-x border-b border-ink bg-paper lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label.en}
              className={`border-ink px-4 py-5 lg:border-r lg:px-6 lg:py-[26px] lg:last:border-r-0 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
            >
              <dt className="sr-only">{pick(f.label, locale)}</dt>
              <dd>
                <b className="block text-[clamp(2.4rem,4vw,4rem)] leading-none font-medium tracking-[-0.04em]">
                  <CountUp value={f.value} />
                </b>
                <span className="mt-2 block text-[15px] leading-[1.4] text-ink-2">
                  {pick(f.label, locale)}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <section id="projekti" data-ruler={pick(home.projectsTag, locale)} aria-labelledby="projects-title" className="scroll-mt-6 pt-24 lg:pt-36">
          <SectionHead
            id="projects-title"
            tag={pick(home.projectsTag, locale)}
            title={pick(home.projectsTitle, locale)}
            lead={pick(home.projectsLead, locale)}
          />
          {featured.map((f, i) => {
            const project = projects.find((p) => p.slug === f.slug);
            if (!project) return null;
            return (
              <ProjectFeature
                key={f.slug}
                project={project}
                locale={locale}
                kind={pick(f.copy.kind, locale)}
                body={f.copy.body.map((b) => pick(b, locale))}
                kpis={f.copy.kpis.map((k) => ({ value: k.value, label: pick(k.label, locale) }))}
                cta={pick(home.story, locale)}
                reverse={i % 2 === 1}
              />
            );
          })}
          <Link href="/projects" className="btn btn-ghost mt-4">
            {pick(home.allProjects, locale).replace("16", total)} <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>

      <ProcessSteps locale={locale} />
      <ServicesBand locale={locale} />

      <div className="wrap">
        <section id="iskustvo" data-ruler={pick(home.jobsTag, locale)} aria-labelledby="jobs-title" className="scroll-mt-6 pt-24 lg:pt-36">
          <SectionHead
            id="jobs-title"
            tag={pick(home.jobsTag, locale)}
            title={pick(home.jobsTitle, locale)}
            lead={pick(home.jobsLead, locale)}
          />
          <Jobs locale={locale} />
        </section>

        <section id="vestine" data-ruler={pick(home.skillsTag, locale)} aria-labelledby="skills-title" className="scroll-mt-6 pt-24 lg:pt-36">
          <SectionHead
            id="skills-title"
            tag={pick(home.skillsTag, locale)}
            title={pick(home.skillsTitle, locale)}
            lead={pick(home.skillsLead, locale)}
          />
          <SkillProof locale={locale} />
        </section>

        <section id="o-meni" data-ruler={pick(home.meTag, locale)} className="scroll-mt-6 pt-24 lg:pt-36">
          <AboutMe locale={locale} />
        </section>

        <ContactBlock locale={locale} />
      </div>
    </>
  );
}
