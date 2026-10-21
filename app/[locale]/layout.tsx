import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBar } from "@/components/mobile-bar";
import { SkipLink } from "@/components/skip-link";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SectionRuler } from "@/components/motion/section-ruler";
import { Analytics, gtmId } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-plex-sans",
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["Consolas", "Menlo", "Courier New", "monospace"],
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: "#f3f5fa",
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
  const all = await getMessages();
  const clientMessages = Object.fromEntries(
    ["nav", "consent", "contactForm", "reveal"].map((ns) => [ns, all[ns]]),
  );

  return (
    <html lang={locale} className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider messages={clientMessages}>
          <SmoothScroll />
          <SectionRuler />
          <SkipLink />
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter consent={Boolean(gtmId)} />
          <MobileBar />
          {gtmId ? <ConsentBanner /> : null}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
