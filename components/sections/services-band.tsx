import { Link } from "@/i18n/navigation";
import { serviceHref } from "@/i18n/paths";
import { services } from "@/content/data/services";
import { home } from "@/content/data/home";
import { pick } from "@/content/i18n";
import { SectionHead } from "./section-head";
import { ServiceArt } from "./service-art";

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
              <ServiceArt id={s.id} dark className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-4deg]" />
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
