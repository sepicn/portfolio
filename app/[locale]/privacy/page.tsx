import type { Metadata } from "next";
import { useMessages, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/privacy",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "privacy",
    }),
  };
}

export default function PrivacyPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("privacy");
  const sections = (useMessages().privacy as { sections: { h: string; p: string }[] })
    .sections;

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-3xl space-y-10 px-4 pb-28 sm:px-6">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl font-semibold text-ink-100">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-ink-200">{s.p}</p>
          </section>
        ))}
        <p className="font-mono text-xs text-ink-400">{t("updated")}</p>
      </div>
    </>
  );
}
