"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RevealContact } from "./reveal-contact";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";
type Topic = "job" | "project" | "marketing";

export function ContactForm({ encodedEmail }: { encodedEmail: string }) {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<Topic>("job");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic, locale }),
      });
      if (res.status === 503) return setStatus("unavailable");
      if (!res.ok) return setStatus("error");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1.5 w-full border-0 border-b border-rule bg-transparent py-2 text-[18px] text-ink placeholder:text-ink-3 focus:border-blue focus:outline-none";
  const label = "block border-b border-rule px-6 py-[18px] max-lg:px-[18px]";
  const caption = "label";

  return (
    <form method="post" action="/api/contact" onSubmit={onSubmit} className="flex flex-col">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="topic" value={topic} />
      <fieldset className="border-b border-rule px-6 py-[18px] max-lg:px-[18px]">
        <legend className={`${caption} float-left mb-3 w-full`}>{t("topic")}</legend>
        <div className="clear-both flex flex-wrap gap-2.5">
          {(["job", "project", "marketing"] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={topic === k}
              onClick={() => setTopic(k)}
              className="min-h-11 border border-ink px-4 font-mono text-[13px] transition-colors aria-pressed:bg-ink aria-pressed:text-paper hover:bg-blue-soft"
            >
              {t(`topics.${k}`)}
            </button>
          ))}
        </div>
      </fieldset>
      <label className={label}>
        <span className={caption}>{t("name")}</span>
        <input name="name" required minLength={2} autoComplete="name" className={field} placeholder={t("namePlaceholder")} />
      </label>
      <label className={label}>
        <span className={caption}>{t("email")}</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="ime@firma.rs" />
      </label>
      <label className={`${label} flex-1`}>
        <span className={caption}>{t("message")}</span>
        <textarea name="message" required minLength={10} rows={5} className={`${field} resize-y`} placeholder={t("messagePlaceholder")} />
      </label>
      <label className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex min-h-[60px] items-center justify-between bg-blue px-6 font-mono text-[14px] tracking-[0.06em] text-paper uppercase transition-colors hover:bg-ink disabled:opacity-60 max-lg:px-[18px]"
      >
        <span>{status === "sending" ? t("sending") : t("send")}</span>
        <span aria-hidden="true">→</span>
      </button>
      <p className="min-h-6 px-6 pt-3 text-[15px] max-lg:px-[18px]" role="status" aria-live="polite">
        {status === "sent" ? <span className="text-blue">{t("sent")}</span> : null}
        {status === "error" ? <span className="text-ink">{t("error")}</span> : null}
        {status === "unavailable" ? (
          <span className="flex flex-wrap items-center gap-3 text-ink-2">
            {t("unavailable")} <RevealContact kind="email" encoded={encodedEmail} />
          </span>
        ) : null}
      </p>
    </form>
  );
}
