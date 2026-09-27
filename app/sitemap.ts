import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { navItems, siteConfig } from "@/lib/site-config";
import { projects } from "@/content/data/projects";
import lastmod from "@/lib/lastmod.json";

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = path === "/" ? "" : path;
  return `${siteConfig.url}${prefix}${suffix}` || siteConfig.url;
}

function priorityOf(href: string) {
  if (href === "/") return 1;
  if (href === "/privacy") return 0.3;
  return href.startsWith("/projects/") ? 0.6 : 0.7;
}

// Dates come from lib/lastmod.json (scripts/lastmod.mjs), which moves a page's date only
// when its content changes, so search engines can trust <lastmod>.
const dates: Record<string, { date: string }> = lastmod;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...navItems.map((item) => item.href),
    "/privacy",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  // One entry per language, each listing every version plus x-default, as Google asks
  // for hreflang in sitemaps.
  return paths.flatMap((href) => {
    const languages = {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, href)]),
      ),
      "x-default": localizedUrl(routing.defaultLocale, href),
    };
    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, href),
      lastModified: dates[href]?.date,
      changeFrequency: href === "/" ? "weekly" : "monthly",
      priority: priorityOf(href),
      alternates: { languages },
    }));
  });
}
