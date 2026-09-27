"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Reveal } from "./reveal";

const Arrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="cta-arrow h-3 w-5"
  >
    <path d="M0 6H18M13 1L18 6L13 11" />
  </svg>
);

/**
 * Last stop before the footer: contact and CV as two neon buttons. Skipped on the pages those
 * buttons lead to, and on home, which closes with its own contact block.
 */
export function FooterCta() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  if (["/", "/contact", "/cv"].includes(pathname)) return null;

  return (
    <section
      aria-labelledby="footer-cta"
      className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6"
    >
      <Reveal className="footer-cta relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="footer-cta-grid pointer-events-none absolute inset-0"
        />
        <p className="relative font-mono text-xs tracking-[0.3em] text-neon-pink uppercase">
          {t("ctaEyebrow")}
          <span className="ml-1 inline-block animate-blink">_</span>
        </p>
        <h2
          id="footer-cta"
          className="relative mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-5xl"
        >
          {t("ctaTitle")}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-base text-ink-200 sm:text-lg">
          {t("ctaBody")}
        </p>
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <span className="cta-glow cta-glow-cyan">
            <Link
              href="/contact"
              className="cta-btn cta-btn-primary inline-flex items-center gap-3 notch px-7 py-3.5 font-mono text-sm font-semibold tracking-[0.18em] text-night-950 uppercase [--n:12px]"
            >
              <span className="cta-label">{t("ctaContact")}</span>
              <Arrow />
            </Link>
          </span>
          <span className="cta-glow cta-glow-pink">
            <Link
              href="/cv"
              className="cta-btn cta-btn-ghost inline-flex items-center gap-3 notch-alt px-7 py-3.5 font-mono text-sm font-semibold tracking-[0.18em] text-neon-pink uppercase [--n:12px] [--nc:var(--color-neon-pink)]"
            >
              <span className="cta-label">{t("ctaCv")}</span>
              <Arrow />
            </Link>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
