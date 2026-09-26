import { profile, skillGroups } from "@/content/data/profile";
import { pick } from "@/content/i18n";
import { localePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

// Email and phone stay out of structured data on purpose: it is plain text in the HTML,
// and the site keeps both away from scrapers (see RevealContact).

export const personId = `${siteConfig.url}/#person`;
export const websiteId = `${siteConfig.url}/#website`;

export const absoluteUrl = (locale: string, path: string) =>
  `${siteConfig.url}${localePath(locale, path) === "/" ? "" : localePath(locale, path)}`;

export function personJsonLd(locale: string) {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    jobTitle: pick(profile.title, locale),
    url: siteConfig.url,
    image: `${siteConfig.url}${profile.photo}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belgrade",
      addressCountry: "RS",
    },
    sameAs: [profile.github, profile.linkedin],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Singidunum University" },
    knowsAbout: skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
  };
}

export function websiteJsonLd(locale: string) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale === "sr" ? "sr-Latn-RS" : "en",
    publisher: { "@id": personId },
  };
}

/** Breadcrumb trail; each item is [name, locale-less path]. */
export function breadcrumbJsonLd(locale: string, items: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(locale, path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * Serialises JSON-LD for a <script> tag. JSON.stringify leaves "<" alone, so a value
 * containing "</script>" would close the tag; escaping it keeps the payload inert.
 */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
