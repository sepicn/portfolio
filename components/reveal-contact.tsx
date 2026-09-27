"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CyberFrame } from "@/components/cyber-frame";

type Kind = "email" | "phone" | "whatsapp";

/** Each contact row gets its own silhouette. */
const rowShape: Record<Kind, number> = { email: 3, phone: 5, whatsapp: 7 };

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
      <CyberFrame
        variant={rowShape[kind]}
        scale={0.45}
        edgeClassName={`hover:bg-neon-cyan/50 ${className}`}
        className="flex min-h-[3.625rem] items-center justify-between gap-4 bg-night-900 px-4 py-3"
      >
        <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
          {label}
        </span>
        {value === null ? (
          <button
            type="button"
            onClick={reveal}
            className="border border-neon-cyan/50 notch px-3 py-1.5 font-mono text-xs text-neon-cyan transition [--n:6px] [--nc:rgba(0,229,255,0.5)] hover:bg-neon-cyan/10"
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
                data-cursor="copy"
                className="shrink-0 border border-white/10 notch-one px-2 py-1 font-mono text-[11px] text-ink-300 transition [--nc:rgba(255,255,255,0.1)] hover:border-neon-pink/60 hover:text-neon-pink hover:[--nc:rgba(255,45,149,0.6)]"
              >
                {copied ? t("copied") : t("copy")}
              </button>
            ) : null}
          </span>
        )}
      </CyberFrame>
    );
  }

  if (value === null) {
    return (
      <button
        type="button"
        onClick={reveal}
        className={`border border-neon-cyan/50 notch-alt px-4 py-2 font-mono text-sm text-neon-cyan transition [--n:8px] [--nc:rgba(0,229,255,0.5)] hover:bg-neon-cyan/10 ${className}`}
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
      className={`inline-block border border-neon-pink/60 notch px-4 py-2 font-mono text-sm text-ink-100 [--n:8px] [--nc:rgba(255,45,149,0.6)] hover:text-neon-pink ${className}`}
    >
      {kind === "whatsapp" ? t("openWhatsapp") : value}
    </a>
  );
}
