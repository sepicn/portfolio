import type { Locale, Post } from "./types";
import { post as websiteCost } from "./posts/koliko-kosta-izrada-sajta";
import { post as negativeKeywords } from "./posts/negativne-kljucne-reci-google-ads";
import { post as siteHealth } from "./posts/site-health-90-98";
import { post as multilingual } from "./posts/sajt-na-pet-jezika-i18n-hreflang";
import { post as fiscalization } from "./posts/fiskalizacija-ips-web-aplikacija";
import { post as aiKnowledge } from "./posts/ai-pise-kod-brze-od-mene";

export type { Block, L, Locale, Post } from "./types";

export const posts: Post[] = [aiKnowledge, websiteCost, negativeKeywords, siteHealth, multilingual, fiscalization].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export function getPost(locale: Locale, slug: string): Post | undefined {
  return posts.find((p) => p.slug[locale] === slug);
}
