"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const target = locale === "sr" ? "en" : "sr";

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      aria-label={`${t("language")}: ${t("switchTo")}`}
      className="ml-2 rounded-md border border-neon-cyan/40 px-3 py-1.5 font-mono text-xs tracking-widest text-neon-cyan uppercase transition-colors hover:bg-neon-cyan/10"
    >
      {target}
    </Link>
  );
}
