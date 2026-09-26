import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  localePrefix: "as-needed",
  localeDetection: false,
  // hreflang alternates come from page metadata with the canonical host; the header
  // version would use the request host and contradict the canonical on preview URLs.
  alternateLinks: false,
});

export type AppLocale = (typeof routing.locales)[number];
