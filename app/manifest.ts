import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

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
    background_color: "#f3f5fa",
    theme_color: "#1c2340",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
