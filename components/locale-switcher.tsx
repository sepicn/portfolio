"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, type AppHref } from "@/i18n/navigation";
import { serviceSlug } from "@/content/data/service-slugs";

export function LocaleSwitcher() {
  const locale = useLocale();
  // The internal route ("/projects/[slug]"), not the public URL; with the current params
  // Link builds the other language's localized URL.
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("nav");
  const target = locale === "sr" ? "en" : "sr";

  const routeParams = Object.fromEntries(
    Object.entries(params)
      .filter(([key]) => key !== "locale")
      .map(([key, value]) => {
        const v = Array.isArray(value) ? value.join("/") : (value ?? "");
        // Service slugs are translated too: /usluge/izrada-sajtova <-> /en/services/web-development.
        return [key, key === "service" ? serviceSlug(v, target) : v];
      }),
  );
  const href = (
    pathname.includes("[") ? { pathname, params: routeParams } : pathname
  ) as AppHref;

  return (
    <Link
      href={href}
      locale={target}
      hrefLang={target}
      aria-label={`${t("language")}: ${t("switchTo")}`}
      className="ml-2 rounded-md border border-neon-cyan/40 px-3 py-1.5 font-mono text-xs tracking-widest text-neon-cyan uppercase transition-colors hover:bg-neon-cyan/10"
    >
      {target}
    </Link>
  );
}
