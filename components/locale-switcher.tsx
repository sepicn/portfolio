"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, type AppHref } from "@/i18n/navigation";
import { translateRouteParam } from "@/i18n/paths";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("nav");
  const target = locale === "sr" ? "en" : "sr";

  const routeParams = Object.fromEntries(
    Object.entries(params)
      .filter(([key]) => key !== "locale")
      .map(([key, value]) => {
        const v = Array.isArray(value) ? value.join("/") : (value ?? "");
        return [key, translateRouteParam(pathname, key, v, locale, target)];
      }),
  );
  const required = [...pathname.matchAll(/\[(\w+)\]/g)].map((m) => m[1]);
  const complete = required.every((key) => routeParams[key]);
  const href = (
    required.length === 0 ? pathname : complete ? { pathname, params: routeParams } : "/"
  ) as AppHref;

  return (
    <Link
      href={href}
      locale={target}
      hrefLang={target}
      title={t("switchTo")}
      className={`items-center gap-1.5 transition-colors hover:text-blue ${className}`}
    >
      <span className="sr-only">{t("language")}: </span>
      <span className={locale === "sr" ? "text-blue" : "text-ink-2"}>SR</span>
      <span aria-hidden="true" className="text-ink-3">
        /
      </span>
      <span className={locale === "en" ? "text-blue" : "text-ink-2"}>EN</span>
    </Link>
  );
}
