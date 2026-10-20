import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const MAX_BODY_BYTES = 16 * 1024;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
  company: z.string().max(200).optional(),
  topic: z.enum(["job", "project", "marketing"]).default("project"),
  locale: z.enum(["sr", "en"]).default("sr"),
});

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
  if (hits.size > MAX_TRACKED_IPS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return false;
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

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

const NO_JS_TEXT = {
  sr: {
    ok: "Poruka je poslata. Javljam se uskoro.",
    fail: "Poruka nije poslata. Pišite mi direktno na mejl:",
    back: "Nazad na sajt",
  },
  en: {
    ok: "Message sent. I will get back to you soon.",
    fail: "The message was not sent. Please email me directly:",
    back: "Back to the site",
  },
};

function noJsPage(locale: "sr" | "en", ok: boolean, status: number) {
  const t = NO_JS_TEXT[locale];
  const link = (href: string, text: string) =>
    `<a style="color:#00e5ff" href="${href}">${text}</a>`;
  const mail = ok
    ? ""
    : `${link(`mailto:${siteConfig.email}`, siteConfig.email)}<br><br>`;
  const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${siteConfig.name}</title></head><body style="background:#f3f5fa;color:#1c2340;font:18px/1.5 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;padding:1rem;text-align:center"><div><p>${ok ? t.ok : t.fail}</p><p>${mail}${link(locale === "en" ? "/en" : "/", t.back)}</p></div></body></html>`;
  return new NextResponse(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const type = request.headers.get("content-type") ?? "";
  const isForm = type.includes("application/x-www-form-urlencoded");
  if (!isForm && !type.includes("application/json")) {
    return NextResponse.json({ error: "invalid" }, { status: 415 });
  }
  let pageLocale: "sr" | "en" = "sr";
  const fail = (error: string, status: number) =>
    isForm
      ? noJsPage(pageLocale, false, status)
      : NextResponse.json({ error }, { status });

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return fail("too_large", 413);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fail("mail_not_configured", 503);
  const ip = clientIp(request);
  if (limited(ip)) return fail("rate_limited", 429);

  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) return fail("too_large", 413);
  let body: unknown = null;
  if (isForm) {
    const fields = Object.fromEntries(new URLSearchParams(raw));
    if (fields.locale === "en") pageLocale = "en";
    body = fields;
  } else {
    try {
      body = JSON.parse(raw);
    } catch {
      body = null;
    }
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return fail("invalid", 400);
  const { name, email, message, locale, company, topic } = parsed.data;
  const done = () =>
    isForm ? noJsPage(locale, true, 200) : NextResponse.json({ ok: true });
  if (company) return done();

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM ?? "sepic.me <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to: [process.env.CONTACT_TO ?? siteConfig.email],
    replyTo: email,
    subject: `[sepic.me] [${topic}] ${oneLine(name)}`,
    text: `${message}\n\n---\n${oneLine(name)} <${email}>\nlocale: ${locale}\nip: ${ip}`,
  });
  if (error) {
    return fail("send_failed", 502);
  }
  return done();
}
