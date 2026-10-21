"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavLinks } from "./nav-links";
import { LocaleSwitcher } from "./locale-switcher";
import { cvPdf } from "@/lib/cv";

export function MobileBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.menu = "open";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      delete document.documentElement.dataset.menu;
    };
  }, [open]);

  const cell =
    "flex min-h-[52px] items-center justify-center border-r border-rule-dark font-mono text-[13px] tracking-[0.05em] uppercase";

  return (
    <div className="lg:hidden">
      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className="dark-sheet fixed inset-0 z-40 flex flex-col justify-end px-5 pb-28"
        >
          <nav aria-label={t("main")} className="flex flex-col">
            <NavLinks
              onNavigate={() => setOpen(false)}
              className="border-b border-rule-dark py-4 text-[34px] font-medium tracking-[-0.03em] aria-[current=page]:text-blue-2"
            />
          </nav>
          <div className="mt-6 flex items-center justify-between font-mono text-[13px] uppercase">
            <LocaleSwitcher className="flex text-paper" />
            <Link href="/cv" onClick={() => setOpen(false)} className="text-paper/80">
              CV
            </Link>
          </div>
        </div>
      ) : null}
      <nav
        aria-label={t("quick")}
        className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 border border-ink bg-ink text-paper shadow-[0_12px_30px_-10px_oklch(0.2_0.04_265/0.5)]"
      >
        <button
          type="button"
          className={cell}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t("closeMenu") : t("menuShort")}
        </button>
        <a href={cvPdf(locale)} className={cell}>
          CV
        </a>
        <Link
          href="/contact"
          className={`${cell} border-r-0 bg-blue`}
          onClick={() => setOpen(false)}
        >
          {t("write")}
        </Link>
      </nav>
    </div>
  );
}
