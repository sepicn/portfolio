import { Link } from "@/i18n/navigation";
import { serviceHref } from "@/i18n/paths";
import { services } from "@/content/data/services";
import { home } from "@/content/data/home";
import { pick } from "@/content/i18n";
import { HorizontalPin } from "@/components/motion/horizontal-pin";
import { SectionHead } from "./section-head";
import { ServiceArt } from "./service-art";

export function ServicesBand({ locale }: { locale: string }) {
  return (
    <HorizontalPin
      id="usluge"
      ruler={pick(home.servicesTag, locale)}
      labelledBy="services-title"
      className="dark-sheet mt-24 scroll-mt-6 border-y border-ink lg:mt-36"
      trackClassName="gap-4 px-[clamp(16px,3vw,48px)] pb-10 lg:gap-6 lg:pb-0"
      head={
        <div className="wrap pt-10 lg:pt-0">
          <SectionHead
            id="services-title"
            dark
            tag={pick(home.servicesTag, locale)}
            title={pick(home.servicesTitle, locale)}
            lead={pick(home.servicesLead, locale)}
          />
        </div>
      }
    >
      {services.map((s) => (
        <div key={s.id} className="hpin-item w-[80vw] lg:w-[min(460px,32vw)]">
          <Link
            href={serviceHref(s.id, locale)}
            className="group flex h-full min-h-[380px] flex-col gap-5 border border-rule-dark bg-paper/[0.03] p-7 transition-colors hover:bg-paper/[0.07] lg:min-h-[440px]"
          >
            <div className="hpin-spin w-max">
              <ServiceArt
                id={s.id}
                size={150}
                dark
                className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-6deg]"
              />
            </div>
            <h3 className="text-[28px] leading-[1.1] tracking-[-0.03em]">
              {pick(s.title, locale)}
            </h3>
            <p className="text-[16px] leading-[1.55] text-paper/80">
              {pick(home.serviceCards[s.id as keyof typeof home.serviceCards], locale)}
            </p>
            <span className="mt-auto font-mono text-[13px] tracking-[0.05em] text-blue-2 uppercase">
              {pick(home.more, locale)} →
            </span>
          </Link>
        </div>
      ))}
    </HorizontalPin>
  );
}
