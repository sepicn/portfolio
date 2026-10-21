"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Kind = "email" | "phone" | "whatsapp";

function decode(value: string) {
  return new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0)));
}

function hrefFor(kind: Kind, value: string) {
  if (kind === "email") return `mailto:${value}`;
  if (kind === "phone") return `tel:${value.replace(/\s+/g, "")}`;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

export function RevealContact({
  kind,
  encoded,
  variant = "button",
}: {
  kind: Kind;
  encoded: string;
  variant?: "button" | "row";
}) {
  const t = useTranslations("reveal");
  const [value, setValue] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const shown =
    value === null ? (
      <button
        type="button"
        onClick={() => setValue(decode(encoded))}
        className="min-h-11 border border-ink bg-paper px-4 font-mono text-[13px] transition-colors hover:bg-ink hover:text-paper"
      >
        {t(kind)}
      </button>
    ) : (
      <span className="flex min-w-0 items-center gap-3">
        <a
          href={hrefFor(kind, value)}
          target={kind === "whatsapp" ? "_blank" : undefined}
          rel="noopener"
          className="truncate text-[18px] font-medium underline-offset-4 hover:text-blue hover:underline"
        >
          {kind === "whatsapp" ? t("openWhatsapp") : value}
        </a>
        {kind !== "whatsapp" ? (
          <button
            type="button"
            onClick={copy}
            className="min-h-9 shrink-0 border border-rule px-2.5 font-mono text-[12px] text-ink-2 hover:border-blue hover:text-blue"
          >
            {copied ? t("copied") : t("copy")}
          </button>
        ) : null}
      </span>
    );

  if (variant === "button") return shown;

  const label =
    kind === "email" ? t("labelEmail") : kind === "phone" ? t("labelPhone") : "WhatsApp";
  return (
    <div className="flex min-h-[68px] items-center justify-between gap-4 border-b border-rule py-3">
      <span className="label">{label}</span>
      {shown}
    </div>
  );
}
