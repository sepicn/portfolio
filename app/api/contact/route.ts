import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const MAX_BODY_BYTES = 16 * 1024;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
  // Honeypot: real users never fill this, bots usually do.
  company: z.string().max(200).optional(),
  locale: z.enum(["sr", "en"]).default("sr"),
});

// Small in-memory limiter: 5 messages per IP per hour. It only lives as long as the
// serverless instance, so the real ceiling is a Vercel Firewall rate-limit rule on
// /api/contact; this catches bursts that hit a warm instance.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep memory bounded if someone rotates IPs: drop the oldest entries.
  if (hits.size > MAX_TRACKED_IPS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return false;
}

/** Vercel sets these itself and strips client-supplied copies, unlike a raw x-forwarded-for. */
function clientIp(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Only accept posts from our own pages; blocks other sites submitting the form. */
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

const oneLine = (value: string) => value.replace(/[\r\n\t]+/g, " ");

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "invalid" }, { status: 415 });
  }
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
  }
  // Unknown IPs share one bucket instead of skipping the limiter.
  const ip = clientIp(request);
  if (limited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }
  let body: unknown = null;
  try {
    body = JSON.parse(raw);
  } catch {
    body = null;
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const { name, email, message, locale, company } = parsed.data;
  // Pretend success for bots so they do not learn to skip the honeypot.
  if (company) return NextResponse.json({ ok: true });

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM ?? "sepic.me <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to: [process.env.CONTACT_TO ?? siteConfig.email],
    replyTo: email,
    subject: `[sepic.me] ${oneLine(name)}`,
    text: `${message}\n\n---\n${oneLine(name)} <${email}>\nlocale: ${locale}\nip: ${ip}`,
  });
  if (error) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
