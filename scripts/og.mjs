// Renders the Open Graph images (1200x630 JPEG) for every page and case study, in both languages.
// Background is the Blender render of the room; project cards use the real screenshot.
//   public/og/{locale}-{key}.jpg   key = home | projects | services | about | cv | contact | privacy | project-{slug}
// Run: node scripts/og.mjs   (no server needed, reads files straight from public/)
import { mkdirSync, readFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { projects } from "../content/data/projects.ts";

const locales = ["sr", "en"];
const pages = ["home", "projects", "services", "about", "cv", "contact", "privacy"];
const out = "public/og";
mkdirSync(out, { recursive: true });

const dataUrl = (path) =>
  `data:image/webp;base64,${readFileSync(`public${path}`).toString("base64")}`;
const room = dataUrl("/images/room-preview.webp");
const accents = {
  pink: "#ff2d95",
  cyan: "#00e5ff",
  violet: "#a66bff",
  sun: "#ff8c42",
  yellow: "#ffd60a",
};
const esc = (s) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

function html({ eyebrow, title, subtitle, accent = "#ff2d95", shot }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500&family=Inter:wght@400;500&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #07030f; color: #f3ecff; font-family: Inter, sans-serif; }
  .bg { position: absolute; inset: 0; background: url(${room}) center 40% / cover; filter: saturate(1.1); }
  .shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7,3,15,.96) 0%, rgba(7,3,15,.88) 45%, rgba(7,3,15,.35) 100%); }
  .scan { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px); }
  .grid { position: absolute; left: 0; right: 0; bottom: 0; height: 120px;
    background: linear-gradient(transparent, rgba(255,45,149,.18)),
      repeating-linear-gradient(90deg, rgba(255,45,149,.35) 0 1px, transparent 1px 60px);
    mask-image: linear-gradient(transparent, #000); }
  .copy { position: absolute; left: 72px; top: 0; bottom: 0; width: ${shot ? 600 : 820}px; display: flex; flex-direction: column; justify-content: center; }
  .eyebrow { font: 500 20px 'JetBrains Mono', monospace; letter-spacing: .18em; text-transform: uppercase; color: ${accent}; }
  h1 { margin-top: 18px; font: 700 ${shot ? 64 : 76}px/1.02 'Space Grotesk', sans-serif; letter-spacing: -.02em; text-shadow: 0 0 28px ${accent}66; }
  p { margin-top: 22px; font-size: 25px; line-height: 1.4; color: #d9cdf0; }
  .foot { position: absolute; left: 72px; bottom: 44px; display: flex; gap: 18px; align-items: center; font: 500 20px 'JetBrains Mono', monospace; color: #bfb2dc; }
  .foot b { color: #f3ecff; font-weight: 500; }
  .dot { width: 10px; height: 10px; border-radius: 50%; background: ${accent}; box-shadow: 0 0 12px ${accent}; }
  .crt { position: absolute; right: 56px; top: 110px; width: 470px; padding: 18px; border-radius: 22px;
    background: linear-gradient(160deg, #2f1a55, #160a2e); box-shadow: 0 0 0 2px ${accent}55, 0 0 60px ${accent}40; }
  .crt img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; border-radius: 12px; }
</style></head><body>
  <div class="bg"></div><div class="shade"></div><div class="grid"></div><div class="scan"></div>
  <div class="copy">
    <div class="eyebrow">${esc(eyebrow)}</div>
    <h1>${esc(title)}</h1>
    ${subtitle ? `<p>${esc(subtitle)}</p>` : ""}
  </div>
  ${shot ? `<div class="crt"><img src="${shot}"></div>` : ""}
  <div class="foot"><span class="dot"></span><b>Nikola Šepić</b><span>sepic.me</span></div>
</body></html>`;
}

const cut = (s, n) => (s.length > n ? `${s.slice(0, n).replace(/\s+\S*$/, "")}…` : s);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let count = 0;

async function render(file, opts) {
  await page.setContent(html(opts), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/${file}`, type: "jpeg", quality: 82 });
  count++;
}

for (const locale of locales) {
  const m = JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));
  for (const key of pages) {
    const isHome = key === "home";
    await render(`${locale}-${key}.jpg`, {
      eyebrow: isHome ? m.site.tagline : (m.nav[key] ?? m.footer[key]),
      title: isHome ? m.site.name : m[key].title,
      subtitle: cut(isHome ? m.site.description : m[key].intro, 120),
    });
  }
  for (const p of projects) {
    await render(`${locale}-project-${p.slug}.jpg`, {
      eyebrow: p.stack.slice(0, 3).join(" · "),
      title: p.title,
      subtitle: cut(p.tagline[locale] ?? p.tagline.sr, 110),
      accent: accents[p.accent],
      shot: p.image ? dataUrl(p.image) : undefined,
    });
  }
}

await browser.close();
console.log(`wrote ${count} images to ${out}`);
