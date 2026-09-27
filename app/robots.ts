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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: answerEngines, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
