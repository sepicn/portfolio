import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { navItems } from "@/lib/site-config";
import { projects } from "@/content/data/projects";
import { services } from "@/content/data/services";
import { absoluteUrl } from "@/lib/structured-data";
import lastmod from "@/lib/lastmod.json";

// Paths below are internal routes; absoluteUrl turns them into each locale's public URL
// (/projects/mango -> /projekti/mango in Serbian, /en/projects/mango in English).
const localizedUrl = absoluteUrl;

function priorityOf(href: string) {
  if (href === "/") return 1;
  if (href === "/privacy") return 0.3;
  if (href.startsWith("/services/")) return 0.8;
  return href.startsWith("/projects/") ? 0.6 : 0.7;
}

// Dates come from lib/lastmod.json (scripts/lastmod.mjs), which moves a page's date only
// when its content changes, so search engines can trust <lastmod>.
const dates: Record<string, { date: string }> = lastmod;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...navItems.map((item) => item.href),
    "/privacy",
    ...services.map((s) => `/services/${s.id}`),
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
