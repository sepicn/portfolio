// Captures screenshots of the public client and personal sites for the project pages.
//   public/images/projects/<slug>.webp            desktop, top of the page (card and hero)
//   public/images/projects/gallery/<slug>-2.webp  desktop, one screen further down
//   public/images/projects/gallery/<slug>-m.webp  phone view
// Run: node scripts/screenshots.mjs
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const targets = [
  ["medical-time", "https://www.medicaltime.rs/"],
  ["itexpert", "https://itexpert.rs/"],
  ["prostor-izmedju", "https://prostorizmedju.rs/"],
  ["mango", "https://mangoposlasticarnica.rs/"],
  ["vuk-studio", "https://vuk-studio.rs/"],
  ["olimp", "https://www.scolimp.rs/"],
  ["job-application-tracker", "https://job-application-tracker-two-rust.vercel.app/"],
  ["launchhub", "https://launchhub-five.vercel.app/"],
];

mkdirSync("public/images/projects/gallery", { recursive: true });
const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";
const browser = await chromium.launch();

async function dismissBanners(page) {
  for (const label of [/prihvat/i, /accept/i, /slažem/i, /^ok$/i, /razumem/i]) {
    const btn = page.getByRole("button", { name: label }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {});
      break;
    }
  }
}

for (const [slug, url] of targets) {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "sr-RS",
    userAgent: ua,
  });
  const page = await desktop.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    await dismissBanners(page);
    await page.waitForTimeout(500);
    const top = await page.screenshot({ type: "png" });
    await sharp(top)
      .resize(1600, 1000, { fit: "cover", position: "top" })
      .webp({ quality: 82 })
      .toFile(`public/images/projects/${slug}.webp`);
    await page.mouse.wheel(0, 950);
    await page.waitForTimeout(1500);
    const second = await page.screenshot({ type: "png" });
    await sharp(second)
      .resize(1600, 1000, { fit: "cover", position: "top" })
      .webp({ quality: 82 })
      .toFile(`public/images/projects/gallery/${slug}-2.webp`);
    console.log("ok desktop", slug);
  } catch (err) {
    console.log("fail desktop", slug, String(err).split("\n")[0]);
  }
  await desktop.close();

  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "sr-RS",
  });
  const mpage = await phone.newPage();
  try {
    await mpage.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await mpage.waitForTimeout(1500);
    await dismissBanners(mpage);
    await mpage.waitForTimeout(500);
    const shot = await mpage.screenshot({ type: "png" });
    await sharp(shot)
      .resize(585, 1266, { fit: "cover", position: "top" })
      .webp({ quality: 82 })
      .toFile(`public/images/projects/gallery/${slug}-m.webp`);
    console.log("ok phone", slug);
  } catch (err) {
    console.log("fail phone", slug, String(err).split("\n")[0]);
  }
  await phone.close();
}
await browser.close();
