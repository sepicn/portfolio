// Captures the live WebGL room as the desktop hero poster, so the still shown while the
// 3D scene loads is the exact frame it fades into (same camera, lights and effects).
//   public/images/room-poster.webp
// Needs the site running: BASE=http://localhost:3000 node scripts/poster.mjs
//
// The capture is ultra-wide (8:3). The scene keeps a fixed vertical field of view, so on
// any narrower screen object-fit: cover crops the sides exactly like the camera does.
import { chromium } from "@playwright/test";
import sharp from "sharp";

const base = process.env.BASE ?? "http://localhost:3000";
const width = 3200;
const height = 1200;

const browser = await chromium.launch({
  args: ["--use-angle=default", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width, height: height + 64 } });
await page.goto(base, { waitUntil: "networkidle" });
// Start the scene with a key press rather than the mouse: pointer parallax stays centred
// and no hotspot is hovered.
await page.keyboard.press("Shift");
await page.waitForSelector("canvas", { timeout: 60_000 });
await page.waitForFunction(
  () =>
    [...document.images].some(
      (img) => img.src.includes("room-poster") && img.className.includes("opacity-0"),
    ),
  undefined,
  { timeout: 120_000 },
);
await page.waitForTimeout(2500); // let the damped camera settle and bloom stabilise
const box = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  for (const el of document.body.querySelectorAll("*")) {
    if (!el.contains(canvas) && !canvas.contains(el) && el !== canvas)
      el.style.visibility = "hidden";
  }
  const r = canvas.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});
const shot = await page.screenshot({ clip: box });
await browser.close();
await sharp(shot).webp({ quality: 80 }).toFile("public/images/room-poster.webp");
console.log(
  `poster: ${Math.round(box.width)}x${Math.round(box.height)} -> public/images/room-poster.webp`,
);
