import { profile, skillGroups } from "@/content/data/profile";
import { pick } from "@/content/i18n";
import { localePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";


export const personId = `${siteConfig.url}/#person`;
export const websiteId = `${siteConfig.url}/#website`;
export const businessId = `${siteConfig.url}/#business`;

export const absoluteUrl = (locale: string, path: string) =>
  `${siteConfig.url}${localePath(locale, path) === "/" ? "" : localePath(locale, path)}`;

export function personJsonLd(locale: string) {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: "Nikola Sepic",
    jobTitle: pick(profile.title, locale),
    description: pick(profile.summary, locale).split(". ")[0] + ".",
    url: siteConfig.url,
    image: `${siteConfig.url}${profile.photo}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belgrade",
      addressCountry: "RS",
    },
    sameAs: [profile.github, profile.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Singidunum University",
      url: "https://singidunum.ac.rs",
    },
    worksFor: { "@id": businessId },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: locale === "sr" ? "upiti za saradnju" : "project enquiries",
      url: absoluteUrl(locale, "/contact"),
      availableLanguage: ["sr", "en"],
      areaServed: "RS",
    },
    knowsLanguage: ["sr", "en"],
    knowsAbout: skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
  };
}

const businessText = {
  sr: "Izrada sajtova i web aplikacija, Google Ads, Meta Ads i SEO. Freelance iz Beograda, uživo ili remote.",
  en: "Websites and web apps, Google Ads, Meta Ads and SEO. Freelance from Belgrade, in person or remote.",
};

export function businessJsonLd(locale: string) {
  return {
    "@type": "ProfessionalService",
    "@id": businessId,
    name: siteConfig.name,
    url: siteConfig.url,
    founder: { "@id": personId },
    image: `${siteConfig.url}${profile.photo}`,
    description: pick(businessText, locale),
    areaServed: [
      { "@type": "City", name: "Belgrade" },
      { "@type": "Country", name: "Serbia" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    knowsLanguage: ["sr", "en"],
    sameAs: [siteConfig.github, siteConfig.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belgrade",
      addressCountry: "RS",
    },
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

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
