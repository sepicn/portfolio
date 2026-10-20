import type { Metadata } from "next";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHead } from "@/components/sections/page-head";

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

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const messages = await getMessages({ locale });
  const sections = (messages.privacy as { sections: { h: string; p: string }[] }).sections;

  return (
    <div className="wrap">
      <PageHead crumbs={[{ label: nav("home"), href: "/" }, { label: t("title") }]} tag="sepic.me" title={t("title")} lead={t("intro")} />
      <div className="max-w-3xl space-y-10 pt-12">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-[26px] tracking-[-0.02em]">{s.h}</h2>
            <p className="mt-3 text-[17px] leading-[1.65] text-ink-2">{s.p}</p>
          </section>
        ))}
        <p className="label">{t("updated")}</p>
      </div>
    </div>
  );
}
