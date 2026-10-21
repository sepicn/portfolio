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
import { HorizontalPin } from "@/components/motion/horizontal-pin";
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
  const jsonLd = graph(
    websiteJsonLd(locale),
    personJsonLd(locale),
    businessJsonLd(locale),
  );
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
      </div>

      <HorizontalPin
        id="projekti"
        ruler={pick(home.projectsTag, locale)}
        labelledBy="projects-title"
        className="scroll-mt-6 pt-24 lg:pt-0"
        trackClassName="gap-5 px-[clamp(16px,3vw,48px)] pb-2 lg:gap-8"
        head={
          <div className="wrap">
            <SectionHead
              id="projects-title"
              tag={pick(home.projectsTag, locale)}
              title={pick(home.projectsTitle, locale)}
              lead={pick(home.projectsLead, locale)}
            />
          </div>
        }
      >
        {featured.map((f, i) => {
          const project = projects.find((p) => p.slug === f.slug);
          if (!project) return null;
          return (
            <div key={f.slug} className="hpin-item w-[88vw] lg:w-[min(960px,62vw)]">
              <ProjectFeature
                project={project}
                locale={locale}
                kind={pick(f.copy.kind, locale)}
                body={f.copy.body.map((b) => pick(b, locale))}
                features={f.copy.features.map((x) => pick(x, locale))}
                cta={pick(home.story, locale)}
                reverse={i % 2 === 1}
              />
            </div>
          );
        })}
        <div className="hpin-item w-[70vw] lg:w-[min(520px,36vw)]">
          <Link
            href="/projects"
            className="group dark-sheet flex h-full min-h-[320px] flex-col justify-between border border-ink p-7 lg:min-h-[480px]"
          >
            <span className="tag text-blue-2">{pick(home.projectsTag, locale)}</span>
            <span className="text-[clamp(2.4rem,4vw,4.4rem)] leading-[0.95] tracking-[-0.045em]">
              {pick(home.allProjects, locale).replace("16", total)}
            </span>
            <span
              aria-hidden="true"
              className="text-[64px] text-blue-2 transition-transform duration-500 ease-out-expo group-hover:translate-x-3"
            >
              →
            </span>
          </Link>
        </div>
      </HorizontalPin>

      <ProcessSteps locale={locale} />
      <ServicesBand locale={locale} />

      <div className="wrap">
        <section
          id="iskustvo"
          data-ruler={pick(home.jobsTag, locale)}
          aria-labelledby="jobs-title"
          className="scroll-mt-6 pt-24 lg:pt-36"
        >
          <SectionHead
            id="jobs-title"
            tag={pick(home.jobsTag, locale)}
            title={pick(home.jobsTitle, locale)}
            lead={pick(home.jobsLead, locale)}
          />
          <Jobs locale={locale} />
        </section>

        <section
          id="vestine"
          data-ruler={pick(home.skillsTag, locale)}
          aria-labelledby="skills-title"
          className="scroll-mt-6 pt-24 lg:pt-36"
        >
          <SectionHead
            id="skills-title"
            tag={pick(home.skillsTag, locale)}
            title={pick(home.skillsTitle, locale)}
            lead={pick(home.skillsLead, locale)}
          />
          <SkillProof locale={locale} />
        </section>

        <section
          id="o-meni"
          data-ruler={pick(home.meTag, locale)}
          className="scroll-mt-6 pt-24 lg:pt-36"
        >
          <AboutMe locale={locale} />
        </section>

        <ContactBlock locale={locale} />
      </div>
    </>
  );
}
