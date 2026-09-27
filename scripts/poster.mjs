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
// The ERROR sign blinks; keep shooting until a frame catches it lit, judged by how red the
// patch where it hangs is (top right of the frame).
const redness = async (png) => {
  const { data, info } = await sharp(png)
    .extract({
      left: Math.round(info0.width * 0.64),
      top: Math.round(info0.height * 0.08),
      width: Math.round(info0.width * 0.12),
      height: Math.round(info0.height * 0.1),
    })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let sum = 0;
  for (let i = 0; i < data.length; i += info.channels) sum += data[i] - data[i + 2];
  return sum / (data.length / info.channels);
};
const info0 = { width: Math.round(box.width), height: Math.round(box.height) };
let shot;
let best = -Infinity;
for (let attempt = 0; attempt < 12; attempt++) {
  const png = await page.screenshot({ clip: box });
  const red = await redness(png);
  if (red > best) {
    best = red;
    shot = png;
  }
  await page.waitForTimeout(170);
}
await browser.close();
await sharp(shot).webp({ quality: 80 }).toFile("public/images/room-poster.webp");
console.log(
  `poster: ${Math.round(box.width)}x${Math.round(box.height)} -> public/images/room-poster.webp`,
);
