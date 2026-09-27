import type { Localized } from "../i18n";

export type Testimonial = {
  /** The client's own words, as they approved them. Never paraphrase or invent. */
  quote: Localized;
  name: string;
  /** Role and company, e.g. "direktor, Medical Time". */
  role: Localized;
  /** Case study slug this quote is about, so it also shows on that page. */
  project?: string;
};

// Quotes from real clients only, each approved by the person for publishing with their
// name. The testimonials section stays hidden while this list is empty.
//
// No Review or AggregateRating markup: Google treats reviews a business publishes about
// itself as self-serving and does not show them as rich results. The quotes are there for
// visitors and as trust signals in the page text.
export const testimonials: Testimonial[] = [];
