import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { projects } from "../content/data/projects.ts";

const posts = (
  await Promise.all(
    readdirSync("content/blog/posts").map((f) =>
      import(`../content/blog/posts/${f}`).then((m) => m.post),
    ),
  )
).sort((a, b) => b.date.localeCompare(a.date));

const locales = ["sr", "en"];
const pages = [
  "home",
  "projects",
  "services",
  "blog",
  "about",
  "cv",
  "contact",
  "privacy",
];
const out = "public/og";
mkdirSync(out, { recursive: true });

const dataUrl = (path) => {
  const type = path.endsWith(".png") ? "png" : "webp";
  return `data:image/${type};base64,${readFileSync(`public${path}`).toString("base64")}`;
};
const drawings = {
  home: "/images/drawings/stack-sr.webp",
  projects: "/images/drawings/stack-open.webp",
  services: "/images/drawings/obj-ads.webp",
  blog: "/images/drawings/st-2-nacrt.webp",
  about: "/images/drawings/st-3-gradim.webp",
  cv: "/images/drawings/st-2-nacrt.webp",
  contact: "/images/drawings/st-1-poruka.webp",
  privacy: "/images/drawings/obj-seo.webp",
  post: "/images/drawings/obj-web.webp",
};
const esc = (s) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const cut = (s, n) =>
  s.length > n
    ? `${s
        .slice(0, n)
        .replace(/\s+\S*$/, "")
        .replace(/[.,;:]$/, "")}...`
    : s;

function html({ tag, title, subtitle, shot, drawing, sheet }) {
  const art = shot
    ? `<div class="shot"><img src="${shot}"></div>`
    : `<div class="art"><img src="${drawing}"></div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; color: #1c2340; font-family: "IBM Plex Sans", sans-serif;
    background-color: #f3f5fa;
    background-image: linear-gradient(rgba(47,79,214,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(47,79,214,.07) 1px, transparent 1px),
      linear-gradient(rgba(47,79,214,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(47,79,214,.14) 1px, transparent 1px);
    background-size: 24px 24px, 24px 24px, 120px 120px, 120px 120px; }
  .frame { position: absolute; inset: 28px; border: 2px solid #1c2340; display: grid; grid-template-columns: ${shot ? "1fr 520px" : "1fr 420px"}; }
  .copy { padding: 52px 56px; display: flex; flex-direction: column; border-right: 2px solid #1c2340; }
  .tag { font: 500 20px "IBM Plex Mono", monospace; letter-spacing: .05em; text-transform: uppercase; color: #2f4fd6; }
  h1 { margin-top: 22px; font-weight: 500; font-size: ${title.length > 34 ? 58 : 76}px; line-height: .98; letter-spacing: -.045em; }
  h1 i { font-style: normal; color: #2f4fd6; }
  p { margin-top: 24px; font-size: 25px; line-height: 1.4; color: #4a5378; max-width: 30ch; }
  .foot { margin-top: auto; display: flex; gap: 14px; align-items: center; font: 500 20px "IBM Plex Mono", monospace; }
  .foot .dot { width: 10px; height: 10px; border-radius: 50%; background: #2fa866; }
  .foot span { color: #4a5378; }
  .side { position: relative; overflow: hidden; background: #f8fafd; }
  .art { position: absolute; inset: 44px; display: grid; place-items: center; }
  .art img { max-width: 100%; max-height: 100%; }
  .shot { position: absolute; inset: 40px 0 40px 40px; border: 2px solid #1c2340; border-right: 0; overflow: hidden; background: #fff; }
  .shot img { width: 100%; height: 100%; object-fit: cover; object-position: left top; }
  .block { position: absolute; right: 0; bottom: 0; display: flex; border-top: 2px solid #1c2340; border-left: 2px solid #1c2340; background: #f3f5fa;
    font: 400 15px "IBM Plex Mono", monospace; }
  .block div { padding: 8px 14px; border-right: 2px solid #1c2340; }
  .block div:last-child { border-right: 0; }
  .block small { display: block; font-size: 11px; color: #6b7394; letter-spacing: .08em; text-transform: uppercase; }
</style></head><body>
  <div class="frame">
    <div class="copy">
      <div class="tag">${esc(tag)}</div>
      <h1>${esc(title)}<i>.</i></h1>
      ${subtitle ? `<p>${esc(subtitle)}</p>` : ""}
      <div class="foot"><span class="dot"></span><b>Nikola Šepić</b><span>sepic.me</span></div>
    </div>
    <div class="side">${art}
      <div class="block"><div><small>List</small>${esc(sheet)}</div><div><small>Crtao</small>N.Š.</div></div>
    </div>
  </div>
</body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let count = 0;

async function render(file, opts) {
  await page.setContent(html(opts), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/${file}`, type: "jpeg", quality: 84 });
  count++;
}

for (const locale of locales) {
  const m = JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));
  for (const key of pages) {
    const isHome = key === "home";
    const intro =
      { blog: m.blog?.intro, home: m.site.description }[key] ?? m[key]?.intro ?? "";
    await render(`${locale}-${key}.jpg`, {
      tag: isHome ? m.site.tagline : (m.nav[key] ?? m[key]?.title ?? key),
      title: isHome ? m.site.name : key === "blog" ? "Blog" : m[key].title,
      subtitle: cut(intro, 110),
      drawing: dataUrl(drawings[key]),
      sheet: key.toUpperCase().slice(0, 8),
    });
  }
  for (const [i, p] of projects.entries()) {
    await render(`${locale}-project-${p.slug}.jpg`, {
      tag: p.stack.slice(0, 3).join(" · "),
      title: p.title,
      subtitle: cut(p.tagline[locale] ?? p.tagline.sr, 100),
      shot: p.image ? dataUrl(p.image) : undefined,
      drawing: dataUrl(drawings.projects),
      sheet: `L-${String(i + 1).padStart(2, "0")}`,
    });
  }
  for (const [i, post] of posts.entries()) {
    await render(`${locale}-post-${post.slug.sr}.jpg`, {
      tag: `Blog · ${post.minutes} min`,
      title: post.title[locale],
      subtitle: "",
      drawing: dataUrl(drawings.post),
      sheet: `B-${String(i + 1).padStart(2, "0")}`,
    });
  }
}

const iconSvg = (
  size,
  radius,
) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="#1c2340"/>
  <path d="M0 16H64M0 32H64M0 48H64M16 0V64M32 0V64M48 0V64" stroke="#9db1ff" stroke-opacity=".18" stroke-width="1"/>
  <rect x="5" y="5" width="54" height="54" rx="${Math.max(radius - 4, 0)}" fill="none" stroke="#9db1ff" stroke-opacity=".55" stroke-width="1.5"/>
</svg>`;

async function icon(size, radius, file) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<!doctype html><html><head><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600&display=block" rel="stylesheet">
<style>*{margin:0}body{width:${size}px;height:${size}px;position:relative;background:transparent}
svg{position:absolute;inset:0;width:100%;height:100%}
b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:600 ${Math.round(size * 0.4)}px/1 "IBM Plex Sans",sans-serif;letter-spacing:-.06em;color:#f3f5fa;padding-top:${Math.round(size * 0.04)}px}
b i{font-style:normal;color:#5b78e8}</style></head><body>${iconSvg(size, radius)}<b>N<i>Š</i></b></body></html>`,
    { waitUntil: "networkidle" },
  );
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: "png", omitBackground: true });
  if (file) writeFileSync(file, buf);
  return buf;
}

await icon(512, 14, "app/icon.png");
await icon(180, 0, "app/apple-icon.png");
const small = await Promise.all(
  [16, 32, 48].map((s) =>
    icon(s * 4, 12).then((b) => sharp(b).resize(s, s).png().toBuffer()),
  ),
);
const header = Buffer.alloc(6 + 16 * small.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(small.length, 4);
let offset = header.length;
small.forEach((png, i) => {
  const size = [16, 32, 48][i];
  const e = 6 + i * 16;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(png.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
writeFileSync("app/favicon.ico", Buffer.concat([header, ...small]));

await browser.close();
console.log(`wrote ${count} OG images and the icons`);
