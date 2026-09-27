import type { AppLocale } from "@/i18n/routing";

/**
 * URL slug of each service page per locale. Kept apart from services.ts so the router
 * helpers (and the client-side locale switcher) can translate slugs without pulling in
 * the page copy.
 */
export const serviceSlugs = {
  web: { sr: "izrada-sajtova", en: "web-development" },
  "google-ads": { sr: "google-ads", en: "google-ads" },
  "meta-ads": { sr: "meta-ads", en: "meta-ads" },
  seo: { sr: "seo", en: "seo" },
} as const satisfies Record<string, Record<AppLocale, string>>;

export type ServiceId = keyof typeof serviceSlugs;

const localeOf = (locale: string): AppLocale => (locale === "en" ? "en" : "sr");

/** Service id for an id or a slug in any locale, or undefined when nothing matches. */
export function serviceIdOf(value: string): ServiceId | undefined {
  return (Object.keys(serviceSlugs) as ServiceId[]).find(
    (id) =>
      id === value || Object.values(serviceSlugs[id]).some((slug) => slug === value),
  );
}

/** The slug of a service in one locale; accepts the id or a slug from any locale. */
export function serviceSlug(value: string, locale: string): string {
  const id = serviceIdOf(value);
  return id ? serviceSlugs[id][localeOf(locale)] : value;
}
