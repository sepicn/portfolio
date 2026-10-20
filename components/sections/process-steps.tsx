import Image from "next/image";
import { home } from "@/content/data/home";
import { pick } from "@/content/i18n";
import { ProcessPin } from "@/components/motion/process-pin";

export const processArt = [
  { src: "/images/drawings/st-1-poruka.webp", w: 692, h: 416 },
  { src: "/images/drawings/st-2-nacrt.webp", w: 802, h: 472 },
  { src: "/images/drawings/st-3-gradim.webp", w: 472, h: 872 },
  { src: "/images/drawings/st-4-sajt.webp", w: 476, h: 616 },
  { src: "/images/drawings/st-5-ljudi.webp", w: 854, h: 499 },
];

export function ProcessSteps({ locale }: { locale: string }) {
  const total = home.process.length;
  return (
    <ProcessPin steps={total} label={pick(home.processTag, locale)}>
      <div className="wrap flex h-full flex-col pt-24 lg:pt-10">
        <div data-reveal className="mb-8 grid items-end gap-4 lg:mb-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="tag">{pick(home.processTag, locale)}</p>
            <h2 id="process-title" className="mt-3 text-display">
              {pick(home.processTitle, locale)}
            </h2>
          </div>
          <p className="max-w-[46ch] text-[16px] leading-[1.55] text-ink-2 lg:text-[18px]">
            {pick(home.processLead, locale)}
          </p>
        </div>

        <div className="grid flex-1 border border-ink bg-paper lg:min-h-0 lg:grid-cols-[1fr_1.1fr]">
          <div aria-hidden="true" className="relative hidden border-r border-ink lg:block">
            {processArt.map((a, i) => (
              <Image
                key={a.src}
                src={a.src}
                width={a.w}
                height={a.h}
                alt=""
                data-art={i}
                sizes="40vw"
                className="process-art absolute inset-[12%] m-auto max-h-[76%] max-w-[76%] object-contain"
              />
            ))}
            <div className="absolute inset-x-8 bottom-6 flex items-center gap-4 font-mono text-[12px] text-blue">
              <div className="relative h-0.5 flex-1 bg-rule">
                <i className="process-bar absolute inset-y-0 left-0 w-full origin-left bg-blue" />
              </div>
              <span className="process-count tabular-nums">01 / 0{total}</span>
            </div>
          </div>

          <ol className="flex flex-col justify-center gap-3 p-4 lg:overflow-hidden lg:p-8">
            {home.process.map((step, i) => (
              <li
                key={step.title.en}
                data-step={i}
                className="process-step grid grid-cols-[54px_1fr] items-start gap-4 border border-rule bg-bg p-4 lg:grid-cols-[64px_1fr] lg:p-5"
              >
                <span className="text-[40px] leading-[0.9] font-light tracking-[-0.04em] text-ink-2 lg:text-[44px]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[21px] tracking-[-0.02em]">{pick(step.title, locale)}</h3>
                  <p className="mt-1 text-[15px] leading-[1.5] text-ink-2">{pick(step.body, locale)}</p>
                </div>
                <Image
                  src={processArt[i].src}
                  width={processArt[i].w}
                  height={processArt[i].h}
                  alt=""
                  sizes="60vw"
                  className="col-span-2 mx-auto mt-2 max-h-36 w-auto lg:hidden"
                />
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 text-[18px] leading-[1.5] font-medium lg:mt-4 lg:mb-6">{pick(home.processOutro, locale)}</p>
      </div>
    </ProcessPin>
  );
}
