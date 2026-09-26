import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/content/data/profile";
import { pick } from "@/content/i18n";
import { RevealContact } from "@/components/reveal-contact";
import { encodeContact } from "@/lib/obfuscate";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    ...pageMetadata({
      locale,
      path: "/contact",
      title: t("metaTitle"),
      description: t("metaDescription"),
      ogKey: "contact",
    }),
  };
}

export default function ContactPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contact");

  const links = [
    { label: "LinkedIn", value: "linkedin.com/in/sepicn", href: profile.linkedin },
    { label: "GitHub", value: "github.com/sepicn", href: profile.github },
  ];

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-28 sm:px-6 md:grid-cols-2">
        <Reveal from="left">
          <div className="space-y-3">
            <RevealContact
              variant="row"
              kind="email"
              encoded={encodeContact(profile.email)}
            />
            <RevealContact
              variant="row"
              kind="phone"
              encoded={encodeContact(profile.phone)}
            />
            <RevealContact
              variant="row"
              kind="whatsapp"
              encoded={encodeContact(profile.phone)}
            />
          </div>
          <ul className="mt-3 space-y-3">
            {links.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  className="flex min-h-[3.75rem] items-center justify-between rounded-xl border border-white/10 px-4 py-3 transition hover:border-neon-cyan/50"
                >
                  <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
                    {c.label}
                  </span>
                  <span className="text-ink-100">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-400">
            {t("location")} · {pick(profile.availability, locale)}
          </p>
        </Reveal>
        <Reveal from="right" delay={0.1}>
          <ContactForm encodedEmail={encodeContact(profile.email)} />
        </Reveal>
      </div>
    </>
  );
}
