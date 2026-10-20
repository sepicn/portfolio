export function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === "en" ? "en-GB" : "sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
