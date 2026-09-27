import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FooterCta } from "@/components/footer-cta";
import { BackToTop } from "@/components/back-to-top";
import { SkipLink } from "@/components/skip-link";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorGlow } from "@/components/cursor-glow";
import { Analytics, gtmId } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Only small labels use the mono face, never the largest text, so it is not preloaded:
// two fewer font files competing with the page on the first load.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const title = t("metaTitle");
  // Every page sets its own canonical and hreflang. Here they would leak into pages that do
  // not, such as the 404, which then pointed its canonical at home next to Next.js noindex.
  const shared = pageMetadata({
    locale,
    path: "/",
    title,
    description: t("description"),
    ogKey: "home",
  });
  delete shared.alternates;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${t("name")}`,
    },
    ...shared,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    // The inline script below adds `js` to <html> before React hydrates, so the class differs
    // from the server's on purpose; this only silences that one attribute on this one element.
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <NextIntlClientProvider>
          <SmoothScroll />
          <CursorGlow />
          <SkipLink />
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <FooterCta />
          <SiteFooter />
          <BackToTop />
          {gtmId ? <ConsentBanner /> : null}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
