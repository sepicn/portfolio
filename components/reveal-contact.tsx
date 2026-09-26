"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Kind = "email" | "phone" | "whatsapp";

type Props = {
  kind: Kind;
  /** Base64 of the real value, so crawlers reading the HTML see nothing useful. */
  encoded: string;
  /** "button" is a compact pill for inline use, "row" is a full-width list row. */
  variant?: "button" | "row";
  className?: string;
};

function decode(value: string) {
  return new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0)));
}

function hrefFor(kind: Kind, value: string) {
  if (kind === "email") return `mailto:${value}`;
  if (kind === "phone") return `tel:${value.replace(/\s+/g, "")}`;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

/** Shows a "reveal" control; the address only exists in the DOM after a click. */
export function RevealContact({
  kind,
  encoded,
  variant = "button",
  className = "",
}: Props) {
  const t = useTranslations("reveal");
  const [value, setValue] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const reveal = () => setValue(decode(encoded));
  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  if (variant === "row") {
    const label =
      kind === "email"
        ? t("labelEmail")
        : kind === "phone"
          ? t("labelPhone")
          : "WhatsApp";
    return (
      <div
        className={`flex min-h-[3.75rem] items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3 transition hover:border-neon-cyan/50 ${className}`}
      >
        <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
          {label}
        </span>
        {value === null ? (
          <button
            type="button"
            onClick={reveal}
            className="rounded-md border border-neon-cyan/50 px-3 py-1.5 font-mono text-xs text-neon-cyan transition hover:bg-neon-cyan/10"
          >
            {t(kind)}
          </button>
        ) : (
          <span className="flex min-w-0 items-center gap-3">
            <a
              href={hrefFor(kind, value)}
              target={kind === "whatsapp" ? "_blank" : undefined}
              rel="noopener"
              className="truncate text-ink-100 hover:text-neon-cyan"
            >
              {kind === "whatsapp" ? t("openWhatsapp") : value}
            </a>
            {kind !== "whatsapp" ? (
              <button
                type="button"
                onClick={copy}
                className="shrink-0 rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-ink-300 transition hover:border-neon-pink/60 hover:text-neon-pink"
              >
                {copied ? t("copied") : t("copy")}
              </button>
            ) : null}
          </span>
        )}
      </div>
    );
  }

  if (value === null) {
    return (
      <button
        type="button"
        onClick={reveal}
        className={`rounded-md border border-neon-cyan/50 px-4 py-2 font-mono text-sm text-neon-cyan transition hover:bg-neon-cyan/10 ${className}`}
      >
        {t(kind)}
      </button>
    );
  }

  return (
    <a
      href={hrefFor(kind, value)}
      target={kind === "whatsapp" ? "_blank" : undefined}
      rel="noopener"
      className={`inline-block rounded-md border border-neon-pink/60 px-4 py-2 font-mono text-sm text-ink-100 hover:text-neon-pink ${className}`}
    >
      {kind === "whatsapp" ? t("openWhatsapp") : value}
    </a>
  );
}
