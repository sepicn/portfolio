import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  localePrefix: "as-needed",
  localeDetection: false,
  // hreflang alternates come from page metadata with the canonical host; the header
  // version would use the request host and contradict the canonical on preview URLs.
  alternateLinks: false,
  // Keys are the internal routes (the app/[locale] folders), values the public URLs.
  // Serbian gets Serbian words; English keeps the folder names. Service slugs differ per
  // locale too, see i18n/paths.ts.
  pathnames: {
    "/": "/",
    "/projects": { sr: "/projekti", en: "/projects" },
    "/projects/[slug]": { sr: "/projekti/[slug]", en: "/projects/[slug]" },
    "/services": { sr: "/usluge", en: "/services" },
    "/services/[service]": { sr: "/usluge/[service]", en: "/services/[service]" },
    "/about": { sr: "/o-meni", en: "/about" },
    "/contact": { sr: "/kontakt", en: "/contact" },
    "/cv": "/cv",
    "/privacy": { sr: "/privatnost", en: "/privacy" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
