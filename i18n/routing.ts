import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  localePrefix: "as-needed",
  localeDetection: false,
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/projects": { sr: "/projekti", en: "/projects" },
    "/projects/[slug]": { sr: "/projekti/[slug]", en: "/projects/[slug]" },
    "/services": { sr: "/usluge", en: "/services" },
    "/services/[service]": { sr: "/usluge/[service]", en: "/services/[service]" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/about": { sr: "/o-meni", en: "/about" },
    "/contact": { sr: "/kontakt", en: "/contact" },
    "/cv": "/cv",
    "/privacy": { sr: "/privatnost", en: "/privacy" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
