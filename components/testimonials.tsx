import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { CyberFrame } from "@/components/cyber-frame";
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
          <Reveal key={item.name} delay={i * 0.1} className="h-full">
            <CyberFrame
              as="figure"
              variant={[1, 6, 9, 4][i % 4]}
              tone="spin"
              edgeClassName="h-full"
              className="bg-night-800 p-7"
            >
              <blockquote className="text-lg leading-relaxed text-ink-100">
                „{pick(item.quote, locale)}“
              </blockquote>
              <figcaption className="mt-5 text-ink-400">
                <span className="text-ink-200">{item.name}</span>,{" "}
                {pick(item.role, locale)}
              </figcaption>
            </CyberFrame>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
