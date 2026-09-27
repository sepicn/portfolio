import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/navigation";
import { serviceHref } from "@/i18n/paths";
import { SlideDeck } from "@/components/motion/slide-deck";
import { SplitHeading } from "@/components/motion/split-heading";
import { Tilt } from "@/components/motion/tilt";
import { ProjectCard } from "@/components/project-card";
import { CyberFrame, cyberClip } from "@/components/cyber-frame";
import { RevealContact } from "@/components/reveal-contact";
import { pick, pickList } from "@/content/i18n";
import { featuredProjects, projects } from "@/content/data/projects";
import { services, process } from "@/content/data/services";
import { profile } from "@/content/data/profile";
import { encodeContact } from "@/lib/obfuscate";

/** One neon per service card: its edge, the glow and number on hover, and its bullets. */
const serviceAccents = [
  {
    tone: "pink",
    edge: "group-hover:bg-neon-pink/80",
    glow: "hover:[filter:drop-shadow(0_0_12px_rgba(255,45,149,0.5))]",
    number: "group-hover:text-neon-pink",
    dot: "bg-neon-pink",
  },
  {
    tone: "cyan",
    edge: "group-hover:bg-neon-cyan/80",
    glow: "hover:[filter:drop-shadow(0_0_12px_rgba(0,229,255,0.45))]",
    number: "group-hover:text-neon-cyan",
    dot: "bg-neon-cyan",
  },
  {
    tone: "sun",
    edge: "group-hover:bg-neon-sun/80",
    glow: "hover:[filter:drop-shadow(0_0_12px_rgba(255,140,66,0.5))]",
    number: "group-hover:text-neon-sun",
    dot: "bg-neon-sun",
  },
  {
    tone: "yellow",
    edge: "group-hover:bg-neon-yellow/80",
    glow: "hover:[filter:drop-shadow(0_0_12px_rgba(255,214,10,0.4))]",
    number: "group-hover:text-neon-yellow",
    dot: "bg-neon-yellow",
  },
] as const;

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
        <p className="mt-4 max-w-xl text-ink-400">{pick(profile.openFor, locale)}</p>
      </div>
      <div data-layer className="justify-self-center">
        <Tilt max={10}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-pink/50 via-neon-violet/30 to-neon-cyan/50 blur-2xl" />
            <CyberFrame variant={9} tone="spin" hollow>
              <Image
                src={profile.photo}
                sizes="(max-width: 640px) 240px, 320px"
                alt={profile.name}
                width={320}
                height={320}
                className="aspect-square w-60 object-cover sm:w-80"
              />
            </CyberFrame>
            <span
              className="absolute -right-3 -bottom-3 bg-neon-cyan/60 p-px"
              style={{ clipPath: cyberClip(1, 0.3) }}
            >
              <span
                className="block bg-night-950 px-3 py-1 font-mono text-xs tracking-widest text-neon-cyan uppercase"
                style={{ clipPath: cyberClip(1, 0.3) }}
              >
                Beograd
              </span>
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
                href={serviceHref(service.id, locale)}
                className={`group block h-full transition duration-300 ${serviceAccents[i % 4].glow}`}
              >
                <CyberFrame
                  variant={[4, 9, 5, 8][i % 4]}
                  tone={serviceAccents[i % 4].tone}
                  edgeClassName={`h-full ${serviceAccents[i % 4].edge}`}
                  className="flex flex-col bg-night-800 p-6 pt-7"
                >
                  <span
                    aria-hidden="true"
                    className={`font-mono text-4xl font-semibold text-ink-600 transition ${serviceAccents[i % 4].number}`}
                  >
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
                          <span
                            aria-hidden="true"
                            className={`mt-1.5 size-1.5 shrink-0 rotate-45 ${serviceAccents[i % 4].dot}`}
                          />
                          {item}
                        </li>
                      ))}
                  </ul>
                </CyberFrame>
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
            <span className="absolute top-0 left-0 flex size-8 items-center justify-center bg-neon-cyan/70 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]">
              <span className="flex size-[30px] items-center justify-center bg-night-950 font-mono text-xs text-neon-cyan [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]">
                {i + 1}
              </span>
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
          className="bg-neon-cyan notch px-6 py-3 font-medium text-night-950 transition [--n:10px] hover:brightness-110"
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
