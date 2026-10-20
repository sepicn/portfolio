import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { navItems } from "@/lib/site-config";
import { projects } from "@/content/data/projects";
import { services } from "@/content/data/services";
import { posts } from "@/content/blog";
import { absoluteUrl } from "@/lib/structured-data";
import lastmod from "@/lib/lastmod.json";

const localizedUrl = absoluteUrl;

function priorityOf(href: string) {
  if (href === "/") return 1;
  if (href === "/privacy") return 0.3;
  if (href.startsWith("/services/")) return 0.8;
  if (href.startsWith("/blog/")) return 0.6;
  return href.startsWith("/projects/") ? 0.6 : 0.7;
}

const dates: Record<string, { date: string }> = lastmod;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...navItems.map((item) => item.href),
    "/privacy",
    ...services.map((s) => `/services/${s.id}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug.sr}`),
  ];
  const postDates = Object.fromEntries(posts.map((p) => [`/blog/${p.slug.sr}`, p.date]));
  return paths.flatMap((href) => {
    const languages = {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, href)]),
      ),
      "x-default": localizedUrl(routing.defaultLocale, href),
    };
    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, href),
      lastModified: postDates[href] ?? dates[href]?.date,
      changeFrequency: href === "/" ? "weekly" : "monthly",
      priority: priorityOf(href),
      alternates: { languages },
    }));
  });
}
