import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { serviceHref } from "@/i18n/paths";
import { services } from "@/content/data/services";
import { home } from "@/content/data/home";
import { pick } from "@/content/i18n";
import { SectionHead } from "./section-head";

const art: Record<string, { src: string; w: number; h: number }> = {
  web: { src: "/images/drawings/obj-web.webp", w: 586, h: 718 },
  "google-ads": { src: "/images/drawings/obj-ads.webp", w: 776, h: 691 },
  "meta-ads": { src: "/images/drawings/obj-meta.webp", w: 280, h: 625 },
  seo: { src: "/images/drawings/obj-seo.webp", w: 558, h: 700 },
};

export function ServicesBand({ locale }: { locale: string }) {
  return (
    <section id="usluge" data-ruler={pick(home.servicesTag, locale)} aria-labelledby="services-title" className="dark-sheet scroll-mt-6 mt-24 border-y border-ink lg:mt-36">
      <div className="wrap pt-10 lg:pt-14">
        <SectionHead
          id="services-title"
          dark
          tag={pick(home.servicesTag, locale)}
          title={pick(home.servicesTitle, locale)}
          lead={pick(home.servicesLead, locale)}
        />
      </div>
      <ul className="flex snap-x snap-mandatory overflow-x-auto border-t border-rule-dark lg:grid lg:grid-cols-4 lg:overflow-visible">
        {services.map((s) => (
          <li
            key={s.id}
            className="flex-[0_0_82%] snap-start border-r border-rule-dark last:border-r-0 lg:flex-auto"
          >
            <Link
              href={serviceHref(s.id, locale)}
              className="group flex h-full flex-col gap-5 px-6 pt-7 pb-6 transition-colors hover:bg-paper/5"
            >
              <div className="grid h-[120px] w-[120px] place-items-center">
                <Image
                  src={art[s.id].src}
                  width={art[s.id].w}
                  height={art[s.id].h}
                  alt=""
                  className="max-h-full max-w-full object-contain invert hue-rotate-180 brightness-[1.15] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-4deg]"
                />
              </div>
              <h3 className="text-[26px] leading-[1.1] tracking-[-0.03em]">{pick(s.title, locale)}</h3>
              <p className="text-[15px] leading-[1.55] text-paper/80">
                {pick(home.serviceCards[s.id as keyof typeof home.serviceCards], locale)}
              </p>
              <span className="mt-auto font-mono text-[13px] tracking-[0.05em] text-blue-2 uppercase">
                {pick(home.more, locale)} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
