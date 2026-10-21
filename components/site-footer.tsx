import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { serviceHref } from "@/i18n/paths";
import { services } from "@/content/data/services";
import { pick } from "@/content/i18n";
import { siteConfig } from "@/lib/site-config";
import { cvPdf } from "@/lib/cv";
import { BelgradeClock } from "./belgrade-clock";
import { ConsentSettingsButton } from "./consent-banner";
import { BackToTopLink } from "./back-to-top";

export function SiteFooter({ consent }: { consent: boolean }) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const col = "border-rule-dark px-7 py-8";
  const h5 =
    "mb-4 font-mono text-[11px] font-medium tracking-[0.1em] text-blue-2 uppercase";
  const li = "py-1.5 text-[16px] text-paper/85 transition-colors hover:text-blue-2";

  return (
    <footer className="dark-sheet relative mt-32 overflow-hidden border-t border-ink">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 border-b border-rule-dark lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div
            className={`${col} col-span-2 border-b lg:col-span-1 lg:border-r lg:border-b-0`}
          >
            <p className={h5}>{t("nextStep")}</p>
            <p className="text-[clamp(26px,2.4vw,36px)] leading-[1.1] font-medium tracking-[-0.03em]">
              {t("ctaLine1")}
              <br />
              <span className="text-blue-2">{t("ctaLine2")}</span>
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center gap-3 border border-blue-2 px-[18px] font-mono text-[13px] tracking-[0.08em] uppercase transition-colors hover:bg-blue-2 hover:text-ink"
            >
              {t("ctaButton")} →
            </Link>
          </div>
          <div className={`${col} border-r`}>
            <p className={h5}>{t("pages")}</p>
            <ul>
              {(["projects", "services", "blog", "about", "contact"] as const).map(
                (k) => (
                  <li key={k}>
                    <Link href={`/${k}`} className={li}>
                      {nav(k)}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link href="/cv" className={li}>
                  CV
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${col} lg:border-r`}>
            <p className={h5}>{nav("services")}</p>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={serviceHref(s.id, locale)} className={li}>
                    {pick(s.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${col} col-span-2 border-t lg:col-span-1 lg:border-t-0`}>
            <p className={h5}>{t("online")}</p>
            <ul>
              <li>
                <a
                  href={siteConfig.github}
                  rel="me noopener"
                  target="_blank"
                  className={li}
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  rel="me noopener"
                  target="_blank"
                  className={li}
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={cvPdf(locale)} className={li}>
                  {t("cvPdf")} ↓
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className="relative px-[18px] pt-10">
          <div className="absolute inset-x-[18px] top-5 flex h-px justify-center bg-blue-2/50 before:absolute before:-top-[5px] before:left-0 before:h-[11px] before:w-px before:bg-blue-2/70 after:absolute after:-top-[5px] after:right-0 after:h-[11px] after:w-px after:bg-blue-2/70">
            <span className="relative -top-2 bg-ink px-2.5 font-mono text-[11px] tracking-[0.08em] text-blue-2">
              BEOGRAD · 44.81°N 20.46°E
            </span>
          </div>
          <p className="text-[clamp(5rem,21vw,24rem)] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_oklch(0.72_0.15_265/0.7)]">
            Šepić<span className="text-blue-2 [-webkit-text-stroke:0]">.</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-rule-dark px-7 py-4 pb-24 font-mono text-[12px] tracking-[0.04em] text-paper/70 lg:flex-row lg:justify-between lg:pb-4">
          <span>© {new Date().getFullYear()} Nikola Šepić</span>
          <span className="flex items-center gap-2">
            <span className="size-[7px] rounded-full bg-ok" aria-hidden="true" />
            {t("clock")} <BelgradeClock />
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-paper">
              {t("privacy")}
            </Link>
            {consent ? <ConsentSettingsButton label={t("cookies")} /> : null}
            <BackToTopLink label={t("backToTop")} />
          </span>
        </div>
      </div>
    </footer>
  );
}
