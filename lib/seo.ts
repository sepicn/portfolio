import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { publicPath } from "@/i18n/paths";
import { siteConfig } from "@/lib/site-config";

/**
 * Public URL path of a page in one locale, given its internal path (the app/[locale]
 * folder path, e.g. "/projects/mango" or "/services/web"). Serbian URLs are translated
 * through routing.pathnames: ("sr", "/about") -> "/o-meni", ("en", "/about") -> "/en/about".
 */
export function localePath(locale: string, path: string): string {
  return publicPath(locale, path);
}

/** Canonical and hreflang entries for one page, given its locale-less path. */
export function alternatesFor(
  locale: string,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(locale, path),
    languages: Object.fromEntries([
      ...routing.locales.map((l) => [l, localePath(l, path)]),
      ["x-default", localePath(routing.defaultLocale, path)],
    ]),
  };
}

/**
 * Canonical, hreflang, Open Graph and Twitter tags for one page.
 * Next replaces a parent's `openGraph` object instead of merging it, so every page sets the full set.
 * `ogKey` names the image rendered by scripts/og.mjs: public/og/{locale}-{ogKey}.jpg
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  ogKey,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  ogKey: string;
}): Metadata {
  const socialTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
  const image = {
    url: `/og/${locale}-${ogKey}.jpg`,
    width: 1200,
    height: 630,
    alt: socialTitle,
  };
  return {
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: path.startsWith("/projects/") ? "article" : "website",
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      locale: locale === "sr" ? "sr_RS" : "en_US",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === "sr" ? "sr_RS" : "en_US")),
      url: localePath(locale, path),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
