import type { AppLocale } from "@/i18n/routing";

/** A string that exists in both site languages. Content files use this everywhere. */
export type Localized = Record<AppLocale, string>;

export type LocalizedList = Record<AppLocale, string[]>;

export function pick(value: Localized, locale: string): string {
  return value[(locale as AppLocale) in value ? (locale as AppLocale) : "sr"];
}

export function pickList(value: LocalizedList, locale: string): string[] {
  return value[(locale as AppLocale) in value ? (locale as AppLocale) : "sr"];
}
