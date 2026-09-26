import { useLocale, useTranslations } from "next-intl";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/navigation";
import { SlideDeck } from "@/components/motion/slide-deck";
import { SplitHeading } from "@/components/motion/split-heading";
import { Tilt } from "@/components/motion/tilt";
import { ProjectCard } from "@/components/project-card";
import { RevealContact } from "@/components/reveal-contact";
import { pick, pickList } from "@/content/i18n";
import { featuredProjects, projects } from "@/content/data/projects";
import { services, process } from "@/content/data/services";
import { profile } from "@/content/data/profile";
import { encodeContact } from "@/lib/obfuscate";

/**
 * Four scroll-driven panels under the 3D hero, then the contact call to action as a plain
 * section. As the last deck panel it stayed on screen while the pin released, so it read as
 * appearing twice.
 */
export function HomeDeck() {
  const t = useTranslations("home");
  const locale = useLocale();
  const steps = process[locale === "en" ? "en" : "sr"];

  const intro = (
    <div className="grid items-center gap-12 md:grid-cols-[3fr_2fr]">
      <div data-layer>
        <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
          {t("introEyebrow")}
        </p>
        <SplitHeading
          text={t("introTitle")}
          className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-5xl"
          accentLast
        />
        <p className="mt-6 max-w-xl text-lg text-ink-200">
          {pick(profile.summary, locale)}
        </p>
        <p className="mt-4 max-w-xl text-ink-400">{pick(profile.availability, locale)}</p>
      </div>
      <div data-layer className="justify-self-center">
        <Tilt max={10}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-pink/50 via-neon-violet/30 to-neon-cyan/50 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.name}
              width={320}
              height={320}
              className="relative aspect-square w-60 rounded-2xl border border-white/10 object-cover sm:w-80"
            />
            <span className="absolute -right-3 -bottom-3 rounded-md border border-neon-cyan/50 bg-night-950 px-3 py-1 font-mono text-[11px] tracking-widest text-neon-cyan uppercase">
              Beograd
            </span>
          </div>
        </Tilt>
      </div>
    </div>
  );

  const servicesPanel = (
    <div>
      <div data-layer className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
          {t("servicesEyebrow")}
        </p>
        <SplitHeading
          text={t("servicesTitle")}
          className="mt-4 font-display text-3xl font-semibold text-ink-100 sm:text-5xl"
        />
        <p className="mt-4 text-lg text-ink-200">{t("servicesLead")}</p>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <li key={service.id} data-layer>
            <Tilt className="h-full">
              <Link
                href={`/services#${service.id}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-night-800/60 p-6 transition hover:border-neon-pink/60"
              >
                <span className="font-mono text-4xl font-semibold text-white/10 transition group-hover:text-neon-pink/60">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-100">
                  {pick(service.title, locale)}
                </h3>
                <p className="mt-3 flex-1 text-sm text-ink-200">
                  {pick(service.lead, locale)}
                </p>
                <ul className="mt-4 space-y-1 text-xs text-ink-400">
                  {pickList(service.includes, locale)
                    .slice(0, 2)
                    .map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-neon-cyan" />
                        {item}
                      </li>
                    ))}
                </ul>
              </Link>
            </Tilt>
          </li>
        ))}
      </ul>
    </div>
  );

  const projectsPanel = (
    <div>
      <div data-layer className="ml-auto max-w-2xl text-right">
        <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
          {t("projectsEyebrow")}
        </p>
        <SplitHeading
          text={t("projectsTitle")}
          className="mt-4 font-display text-3xl font-semibold text-ink-100 sm:text-5xl"
        />
        <p className="mt-4 text-lg text-ink-200">{t("projectsLead")}</p>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featuredProjects.map((project, i) => (
          <li key={project.slug} data-layer>
            <Tilt className="h-full">
              <ProjectCard project={project} index={i} />
            </Tilt>
          </li>
        ))}
      </ul>
      <p data-layer className="mt-6 text-right">
        <Link
          href="/projects"
          className="font-mono text-sm tracking-widest text-neon-cyan uppercase hover:underline"
        >
          {t("allProjects")} ({projects.length}){" "}
          <ArrowRightIcon
            aria-hidden="true"
            className="inline size-4 align-[-3px] transition group-hover:translate-x-0.5"
          />
        </Link>
      </p>
    </div>
  );

  const processPanel = (
    <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr]">
      <div data-layer>
        <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
          {t("processEyebrow")}
        </p>
        <SplitHeading
          text={t("processTitle")}
          className="mt-4 font-display text-3xl font-semibold text-ink-100 sm:text-5xl"
        />
      </div>
      <ol className="relative space-y-6 before:absolute before:top-3 before:bottom-3 before:left-4 before:w-px before:bg-gradient-to-b before:from-neon-pink before:via-neon-violet before:to-neon-cyan">
        {steps.map((step, i) => (
          <li key={step.title} data-layer className="relative pl-14">
            <span className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border border-neon-cyan/60 bg-night-950 font-mono text-xs text-neon-cyan shadow-neon-cyan">
              {i + 1}
            </span>
            <h3 className="font-display text-xl font-semibold text-ink-100">
              {step.title}
            </h3>
            <p className="mt-1 text-ink-200">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  const ctaPanel = (
    <div className="mx-auto max-w-3xl text-center">
      <p
        data-layer
        className="font-mono text-xs tracking-[0.3em] text-neon-pink uppercase"
      >
        {t("ctaEyebrow")}
      </p>
      <div data-layer>
        <SplitHeading
          text={t("ctaTitle")}
          className="mt-4 font-display text-4xl font-semibold text-ink-100 sm:text-6xl"
          accentLast
        />
      </div>
      <p data-layer className="mt-6 text-lg text-ink-200">
        {t("ctaBody")}
      </p>
      <div data-layer className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="rounded-md bg-neon-cyan px-6 py-3 font-medium text-night-950 shadow-neon-cyan transition hover:brightness-110"
        >
          {t("ctaContact")}
        </Link>
        <RevealContact
          kind="email"
          encoded={encodeContact(profile.email)}
          className="py-3"
        />
        <RevealContact
          kind="phone"
          encoded={encodeContact(profile.phone)}
          className="py-3"
        />
      </div>
    </div>
  );

  return (
    <>
      <SlideDeck panels={[intro, servicesPanel, projectsPanel, processPanel]} />
      <section className="relative flex min-h-[70vh] items-center py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{ctaPanel}</div>
      </section>
    </>
  );
}
