import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { pick } from "@/content/i18n";
import { testimonials } from "@/content/data/testimonials";

/** Client quotes; renders nothing until content/data/testimonials.ts has entries. */
export function Testimonials({ locale, project }: { locale: string; project?: string }) {
  const t = useTranslations("testimonials");
  const items = project
    ? testimonials.filter((q) => q.project === project)
    : testimonials;
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.1}>
            <figure className="neon-frame h-full rounded-2xl border border-white/5 bg-night-800/50 p-7">
              <blockquote className="text-lg leading-relaxed text-ink-100">
                „{pick(item.quote, locale)}“
              </blockquote>
              <figcaption className="mt-5 text-ink-400">
                <span className="text-ink-200">{item.name}</span>,{" "}
                {pick(item.role, locale)}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
