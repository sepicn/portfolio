"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Cookie consent for analytics and ads measurement. Both buttons carry the same weight,
 * nothing loads with consent before a click, and the footer link reopens it.
 */
export function ConsentBanner() {
  const t = useTranslations("consent");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading localStorage has to wait for the client, so the banner appears after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <section
      role="region"
      aria-label={t("label")}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-white/10 bg-night-900/95 p-5 text-sm text-ink-200 shadow-neon-pink backdrop-blur sm:bottom-5"
    >
      <p className="font-mono text-[11px] tracking-widest text-neon-cyan uppercase">
        {t("eyebrow")}
      </p>
      <p className="mt-2">
        {t("text")}{" "}
        <Link href="/privacy" className="text-ink-100 underline underline-offset-4">
          {t("more")}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 rounded-full border border-neon-pink/60 px-4 py-2 font-medium text-ink-100 transition hover:bg-neon-pink/15"
        >
          {t("accept")}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 rounded-full border border-neon-pink/60 px-4 py-2 font-medium text-ink-100 transition hover:bg-neon-pink/15"
        >
          {t("decline")}
        </button>
      </div>
    </section>
  );
}

/** Footer button that brings the banner back so a choice can be changed. */
export function ConsentSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className="hover:text-neon-cyan"
    >
      {label}
    </button>
  );
}
