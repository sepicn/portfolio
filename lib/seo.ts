import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { publicPath } from "@/i18n/paths";
import { siteConfig } from "@/lib/site-config";

export function localePath(locale: string, path: string): string {
  return publicPath(locale, path);
}

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
