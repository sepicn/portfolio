"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/site-config";
import { LocaleSwitcher } from "./locale-switcher";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="rounded-md border border-white/10 px-3 py-2 text-sm text-ink-100"
      >
        {open ? t("closeMenu") : t("openMenu")}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-white/5 bg-night-900/95 backdrop-blur-md"
      >
        <nav aria-label="Main" className="flex flex-col gap-1 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base text-ink-100 hover:bg-white/5"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="px-1 pt-2">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}
