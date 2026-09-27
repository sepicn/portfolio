import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// AI search and answer engines read the site on behalf of users (ChatGPT search runs on
// Bing's index plus OAI-SearchBot). They are allowed by "*" already; naming them keeps
// that decision explicit if the default ever tightens.
const answerEngines = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

// Crawlers that collect text for training models. Allowed on purpose: for a one-person
// brand it helps when assistants already know who Nikola is and what he does. Common
// Crawl (CCBot) also feeds many of them and had no copy of the site. To opt out, move
// this list to a rule with disallow: "/".
const modelTraining = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: answerEngines, allow: "/", disallow: "/api/" },
      { userAgent: modelTraining, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
