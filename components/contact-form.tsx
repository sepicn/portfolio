"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RevealContact } from "./reveal-contact";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

type Props = { encodedEmail: string };

/** Posts to /api/contact, which relays the message by email. Falls back to revealing the address. */
export function ContactForm({ encodedEmail }: Props) {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
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
    "mt-2 w-full rounded-md border border-white/10 bg-night-950 px-3 py-2 text-ink-100 focus:border-neon-cyan focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-night-800/40 p-7"
    >
      <label className="block">
        <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
          {t("name")}
        </span>
        <input name="name" required minLength={2} autoComplete="name" className={field} />
      </label>
      <label className="mt-5 block">
        <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
          {t("email")}
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </label>
      <label className="mt-5 block">
        <span className="font-mono text-xs tracking-widest text-ink-400 uppercase">
          {t("message")}
        </span>
        <textarea name="message" required minLength={10} rows={6} className={field} />
      </label>
      {/* Honeypot, hidden from people, tempting for bots. */}
      <label className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 rounded-md bg-neon-pink px-6 py-3 font-medium text-night-950 shadow-neon-pink transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>
      <p className="mt-4 min-h-6 text-sm" role="status" aria-live="polite">
        {status === "sent" ? <span className="text-neon-cyan">{t("sent")}</span> : null}
        {status === "error" ? <span className="text-neon-red">{t("error")}</span> : null}
        {status === "unavailable" ? (
          <span className="flex flex-wrap items-center gap-3 text-ink-200">
            {t("unavailable")} <RevealContact kind="email" encoded={encodedEmail} />
          </span>
        ) : null}
      </p>
      <p className="mt-2 text-xs text-ink-400">{t("note")}</p>
    </form>
  );
}
