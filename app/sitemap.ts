import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { navItems, siteConfig } from "@/lib/site-config";
import { projects } from "@/content/data/projects";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = [
    ...navItems.map((item) => item.href),
    "/privacy",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return paths.map((href) => ({
    url: localizedUrl(routing.defaultLocale, href),
    lastModified,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: priorityOf(href),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, href)]),
      ),
    },
  }));
}
