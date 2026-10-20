import Image from "next/image";
import type { Block } from "@/content/blog";
import { HorizontalPin } from "@/components/motion/horizontal-pin";
import { Blocks, slugify } from "./blocks";

export type Section = { heading: string | null; blocks: Block[] };
export type Layout = "split" | "rail" | "magazine" | "rail-dark" | "timeline" | "bento";

export const layoutBySlug: Record<string, Layout> = {
  "ai-pise-kod-brze-od-mene": "split",
  "fiskalizacija-ips-web-aplikacija": "rail",
  "koliko-kosta-izrada-sajta": "magazine",
  "negativne-kljucne-reci-google-ads": "rail-dark",
  "sajt-na-pet-jezika-i18n-hreflang": "timeline",
  "site-health-90-98": "bento",
};

export function toSections(blocks: Block[]): Section[] {
  const out: Section[] = [{ heading: null, blocks: [] }];
  for (const b of blocks) {
    if (b.type === "h2") out.push({ heading: b.text, blocks: [] });
    else out[out.length - 1].blocks.push(b);
  }
  return out.filter((s) => s.heading || s.blocks.length);
}

function Heading({ text, index, dark = false }: { text: string; index: number; dark?: boolean }) {
  return (
    <h2 id={slugify(text)} className="scroll-mt-6 text-[clamp(24px,2.6vw,32px)] leading-[1.15] tracking-[-0.03em]">
      <span aria-hidden="true" className={`mb-2 block font-mono text-[12px] tracking-[0.06em] ${dark ? "text-blue-2" : "text-blue"}`}>
        {String(index).padStart(2, "0")}
      </span>
      {text}
    </h2>
  );
}

function Panel({ section, index, className = "" }: { section: Section; index: number; className?: string }) {
  return (
    <section data-reveal className={`border border-ink bg-paper px-5 py-6 lg:px-9 lg:py-8 ${className}`}>
      {section.heading ? <Heading text={section.heading} index={index} /> : null}
      <div className={section.heading ? "mt-4" : ""}>
        <Blocks blocks={section.blocks} />
      </div>
    </section>
  );
}

function Answer({ text, label, dark = false }: { text: string; label: string; dark?: boolean }) {
  return (
    <div data-reveal className={`border p-5 lg:p-6 ${dark ? "border-rule-dark bg-paper/5" : "border-ink bg-bg"}`}>
      <p className={`tag mb-2 ${dark ? "text-blue-2" : ""}`}>{label}</p>
      <p className="text-[17px] leading-[1.6] lg:text-[18px]">{text}</p>
    </div>
  );
}

function Hero({ src, alt, priority = true, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return (
    <figure className={`img-load relative overflow-hidden border border-ink bg-paper ${className}`}>
      <Image src={src} alt={alt} width={1600} height={893} priority={priority} sizes="(min-width: 1024px) 80vw, 100vw" className="h-auto w-full" />
    </figure>
  );
}

export function ArticleBody({
  layout,
  sections,
  image,
  alt,
  answer,
  answerLabel,
}: {
  layout: Layout;
  sections: Section[];
  image: string;
  alt: string;
  answer: string;
  answerLabel: string;
}) {
  const intro = sections[0]?.heading ? null : sections[0];
  const rest = intro ? sections.slice(1) : sections;

  if (layout === "split") {
    return (
      <div className="grid gap-8 pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Hero src={image} alt={alt} />
          <div className="mt-6">
            <Answer text={answer} label={answerLabel} />
          </div>
        </div>
        <div className="space-y-5">
          {intro ? <Panel section={intro} index={0} /> : null}
          {rest.map((s, i) => (
            <Panel key={s.heading} section={s} index={i + 1} />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "rail" || layout === "rail-dark") {
    const dark = layout === "rail-dark";
    return (
      <>
        <div className="grid gap-6 pt-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10">
          <Hero src={image} alt={alt} />
          <div className="space-y-5">
            <Answer text={answer} label={answerLabel} />
            {intro ? <Panel section={intro} index={0} /> : null}
          </div>
        </div>
        <HorizontalPin
          className={`mt-14 ${dark ? "dark-sheet -mx-[clamp(16px,3vw,48px)] border-y border-ink" : "-mx-[clamp(16px,3vw,48px)]"}`}
          trackClassName="gap-5 px-[clamp(16px,3vw,48px)] pb-8 lg:pb-0"
          head={<div className={dark ? "pt-10 lg:pt-0" : ""} />}
        >
          {rest.map((s, i) => (
            <section
              key={s.heading}
              className={`hpin-item flex w-[86vw] flex-col border p-6 lg:w-[min(560px,40vw)] lg:p-8 ${dark ? "border-rule-dark bg-paper/[0.04] text-paper [&_p]:text-paper/85" : "border-ink bg-paper"}`}
            >
              {s.heading ? <Heading text={s.heading} index={i + 1} dark={dark} /> : null}
              <div className="mt-4 [&_p]:text-[16px] [&_p]:lg:text-[17px]">
                <Blocks blocks={s.blocks} />
              </div>
            </section>
          ))}
        </HorizontalPin>
      </>
    );
  }

  if (layout === "magazine") {
    return (
      <div className="pt-10">
        <Hero src={image} alt={alt} className="-mx-[clamp(16px,3vw,48px)] border-x-0" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Answer text={answer} label={answerLabel} />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {intro ? <Panel section={intro} index={0} className="lg:col-span-8 lg:col-start-3" /> : null}
          {rest.map((s, i) => (
            <Panel
              key={s.heading}
              section={s}
              index={i + 1}
              className={i % 3 === 0 ? "lg:col-span-7" : i % 3 === 1 ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-8 lg:col-start-3"}
            />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "timeline") {
    return (
      <div className="pt-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
          <Answer text={answer} label={answerLabel} />
          <Hero src={image} alt={alt} />
        </div>
        {intro ? <Panel section={intro} index={0} className="mt-10 lg:ml-[96px]" /> : null}
        <ol className="relative mt-10 space-y-6 border-l-2 border-blue pl-6 lg:ml-10 lg:pl-14">
          {rest.map((s, i) => (
            <li key={s.heading} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-6 -left-[39px] grid size-8 place-items-center border-2 border-blue bg-bg font-mono text-[12px] text-blue lg:-left-[73px] lg:size-10"
              >
                {i + 1}
              </span>
              <Panel section={s} index={i + 1} />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="pt-10">
      <div className="grid gap-5 lg:grid-cols-6">
        <Hero src={image} alt={alt} className="lg:col-span-4" />
        <div className="lg:col-span-2">
          <Answer text={answer} label={answerLabel} />
        </div>
        {intro ? <Panel section={intro} index={0} className="lg:col-span-6" /> : null}
        {rest.map((s, i) => (
          <Panel
            key={s.heading}
            section={s}
            index={i + 1}
            className={[ "lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-4", "lg:col-span-4", "lg:col-span-2", "lg:col-span-6" ][i % 7]}
          />
        ))}
      </div>
    </div>
  );
}
