import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

// Unknown paths under a locale (/en/whatever) would otherwise fall through to the root
// not-found page, outside the locale layout: no navigation, no title and the wrong lang.
// Throwing here renders app/[locale]/not-found.tsx inside the layout instead.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notFound" });
  return { title: t("title"), robots: { index: false, follow: true } };
}

export default function CatchAll() {
  notFound();
}
