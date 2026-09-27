import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Serbian is the default locale, so the installed app opens on the Serbian home page.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name}: web developer i digitalni marketing`,
    short_name: "sepic.me",
    description:
      "Izrada sajtova i web aplikacija, Google Ads, Meta Ads i SEO. Freelance web developer iz Beograda.",
    lang: "sr-Latn",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#07030f",
    theme_color: "#07030f",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
