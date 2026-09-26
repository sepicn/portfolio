// Renders the logo mark in Blender and writes every size the site uses:
// the header mark, the favicon (app/icon.png) and the Apple touch icon.
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const blender =
  process.env.BLENDER_BIN ??
  "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe";
execFileSync(blender, ["-b", "-P", "blender/render_logo.py"], { stdio: "inherit" });

const logo = "blender/out/logo.png";
await sharp(logo)
  .resize(192, 192)
  .webp({ quality: 90, alphaQuality: 95 })
  .toFile("public/images/logo.webp");

/** The mark on a dark rounded tile, so it reads on light and dark browser tabs alike. */
async function tile(size, file) {
  const radius = Math.round(size * 0.22);
  const inset = Math.round(size * 0.06);
  const background = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#0b0416"/></svg>`,
  );
  const mark = await sharp(logo)
    .resize(size - inset * 2, size - inset * 2)
    .toBuffer();
  await sharp(background)
    .composite([{ input: mark, left: inset, top: inset }])
    .png()
    .toFile(file);
}
await tile(512, "app/icon.png");
// Apple touch icons must be opaque; iOS rounds the corners itself.
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0b0416" } })
  .composite([
    { input: await sharp(logo).resize(160, 160).toBuffer(), left: 10, top: 10 },
  ])
  .png()
  .toFile("app/apple-icon.png");
console.log("logo updated: public/images/logo.webp, app/icon.png, app/apple-icon.png");
