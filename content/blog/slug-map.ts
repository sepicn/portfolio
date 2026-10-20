export const blogSlugs: { sr: string; en: string }[] = [
  { sr: "fiskalizacija-ips-web-aplikacija", en: "fiscalization-ips-payments-web-app" },
  { sr: "koliko-kosta-izrada-sajta", en: "how-much-does-a-website-cost-serbia" },
  { sr: "negativne-kljucne-reci-google-ads", en: "negative-keywords-google-ads" },
  { sr: "sajt-na-pet-jezika-i18n-hreflang", en: "five-language-website-i18n-hreflang" },
  { sr: "site-health-90-98", en: "site-health-90-to-98" },
];

export function blogSlug(value: string, locale: string): string {
  const pair = blogSlugs.find((p) => p.sr === value || p.en === value);
  if (!pair) return value;
  return locale === "en" ? pair.en : pair.sr;
}
