import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { home } from "@/content/data/home";
import { pick } from "@/content/i18n";
import { profile } from "@/content/data/profile";
import { cvPdf } from "@/lib/cv";
import { Hero3D } from "@/components/hero/hero-3d";

export function Hero({ locale }: { locale: string }) {
  const layers = home.layers.map((l) => pick(l, locale));
  return (
    <section className="grid border-x border-b border-ink lg:min-h-[calc(100svh-80px)] lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col justify-between gap-8 border-b border-ink px-[18px] pt-6 pb-6 lg:border-r lg:border-b-0 lg:px-10 lg:pt-12 lg:pb-9">
        <div>
          <p className="tag">{pick(home.kicker, locale)}</p>
          <h1 className="hero-title mt-5 text-hero">
            {pick(home.titleBefore, locale)} <span className="strike">{pick(home.titleStrike, locale)}</span>
            <br />
            <span className="hero-new text-blue">{pick(home.titleBlue, locale)}</span> {pick(home.titleAfter, locale)}
          </h1>
          <div className="mt-7 grid max-w-[600px] grid-cols-[56px_1fr] gap-3.5 lg:mt-9 lg:grid-cols-[72px_1fr] lg:gap-[18px]">
            <Image
              src={profile.photo}
              alt=""
              width={144}
              height={144}
              priority
              className="size-14 border border-ink object-cover grayscale lg:size-[72px]"
            />
            <p className="text-[16px] leading-[1.55] text-ink-2 lg:text-[17px]">{pick(home.who, locale)}</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <Link href="/projects" className="btn btn-primary">
            {pick(home.ctaProjects, locale)} <span aria-hidden="true">→</span>
          </Link>
          <a href={cvPdf(locale)} className="btn btn-ghost border-t-0 lg:border-t lg:border-l-0">
            {pick(home.ctaCv, locale)}
          </a>
        </div>
      </div>
      <figure className="hero-art relative overflow-hidden px-[18px] pt-4 pb-5 lg:min-h-[520px] lg:p-0">
        <Image
          src="/images/drawings/stack.webp"
          width={838}
          height={983}
          alt=""
          priority
          sizes="(min-width: 1024px) 38vw, 240px"
          className="hero-poster img-load mx-auto h-auto w-[240px] object-contain transition-opacity duration-700 lg:absolute lg:top-1/2 lg:left-[5%] lg:h-auto lg:max-h-[84%] lg:w-[54%] lg:-translate-y-1/2"
        />
        <Hero3D />
        <ol className="hidden lg:block" aria-label={pick(home.drawingNote, locale)}>
          {[...layers].reverse().map((label, i) => (
            <li
              key={label}
              className="absolute right-[5%] flex -translate-y-1/2 flex-row-reverse items-center gap-2.5 font-mono text-[13px] before:h-px before:w-[110px] before:bg-blue"
              style={{ top: `var(--layer-${layers.length - 1 - i}, ${18 + i * 18.4}%)` }}
            >
              <span>
                <b className="font-medium text-blue">0{layers.length - i}</b> {label}
              </span>
            </li>
          ))}
        </ol>
        <ol className="mt-2.5 grid grid-cols-2 gap-x-3.5 gap-y-2 font-mono text-[13px] lg:hidden">
          {layers.map((label, i) => (
            <li key={label}>
              <b className="mr-1.5 font-medium text-blue">0{i + 1}</b>
              {label}
            </li>
          ))}
        </ol>
        <figcaption className="absolute bottom-0 left-0 hidden border-t border-r border-ink bg-bg px-3.5 py-2.5 font-mono text-[12px] text-ink-2 lg:block">
          {pick(home.drawingNote, locale)}
        </figcaption>
      </figure>
    </section>
  );
}
