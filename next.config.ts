import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

// Google Tag Manager, GA4 and Google Ads endpoints, plus vercel.live for the preview toolbar.
const google = [
  "https://www.googletagmanager.com",
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.googleadservices.com",
  "https://googleads.g.doubleclick.net",
  "https://*.doubleclick.net",
  "https://www.google.com",
  "https://*.g.doubleclick.net",
].join(" ");

// Next inlines its bootstrap scripts and GTM injects inline tags, so script-src keeps
// unsafe-inline; the rest of the policy still blocks foreign scripts, framing, plugins
// and base-tag or form hijacking. wasm-unsafe-eval is for the Draco mesh decoder, blob:
// workers and URLs are how three.js decodes the room model.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' ${google} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${google}`,
  "font-src 'self' data:",
  `connect-src 'self' data: blob: ${google} https://vercel.live wss://ws-us3.pusher.com`,
  "worker-src 'self' blob:",
  `frame-src ${google} https://vercel.live`,
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Dev needs eval for React Refresh, so the policy only applies to production builds.
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
