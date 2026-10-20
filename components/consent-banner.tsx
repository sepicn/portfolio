"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent, type ConsentChoice } from "@/lib/consent";

export function ConsentBanner() {
  const t = useTranslations("consent");
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
      className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl border border-ink bg-paper p-5 text-[15px] text-ink-2 shadow-[0_20px_40px_-20px_oklch(0.2_0.04_265/0.45)] lg:bottom-5"
    >
      <p className="tag">{t("eyebrow")}</p>
      <p className="mt-2">
        {t("text")}{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-4">
          {t("more")}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary justify-center">
          {t("accept")}
        </button>
        <button type="button" onClick={() => choose("denied")} className="btn btn-ghost justify-center">
          {t("decline")}
        </button>
      </div>
    </section>
  );
}

export function ConsentSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className="hover:text-paper"
    >
      {label}
    </button>
  );
}
