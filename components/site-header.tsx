import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavLinks } from "./nav-links";
import { LocaleSwitcher } from "./locale-switcher";
import { cvPdf } from "@/lib/cv";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  return (
    <header className="wrap pt-4">
      <div className="grid grid-cols-[1fr_auto] border border-ink bg-bg font-mono text-[13px] tracking-[0.05em] uppercase lg:grid-cols-[auto_1fr_auto_auto]">
        <Link
          href="/"
          className="flex items-center border-ink px-[18px] py-3.5 font-medium lg:border-r"
        >
          N. Šepić
        </Link>
        <nav aria-label={t("main")} className="hidden items-center gap-7 px-6 lg:flex">
          <NavLinks />
        </nav>
        <LocaleSwitcher className="hidden border-l border-ink px-[18px] lg:flex" />
        <a
          href={cvPdf(locale)}
          className="flex items-center gap-2 border-l border-ink bg-ink px-[18px] py-3.5 text-paper transition-colors hover:bg-blue"
        >
          {t("cvDownload")}
        </a>
      </div>
    </header>
  );
}
