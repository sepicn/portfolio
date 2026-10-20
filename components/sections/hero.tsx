import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { home } from "@/content/data/home";
import { pick, pickList } from "@/content/i18n";
import { profile } from "@/content/data/profile";
import { cvPdf } from "@/lib/cv";
import { Hero3D } from "@/components/hero/hero-3d";

export function Hero({ locale }: { locale: string }) {
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
      <figure aria-hidden="true" className="hero-art relative h-[400px] overflow-hidden lg:h-auto lg:min-h-[520px]">
        <Image
          src={locale === "en" ? "/images/drawings/stack-en.webp" : "/images/drawings/stack-sr.webp"}
          width={locale === "en" ? 623 : 586}
          height={802}
          alt=""
          priority
          sizes="(min-width: 1024px) 38vw, 240px"
          className="hero-poster absolute top-1/2 left-1/2 h-auto max-h-[92%] w-auto max-w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-700"
        />
        <Hero3D labels={pickList(home.stackLabels, locale)} />
      </figure>
    </section>
  );
}
