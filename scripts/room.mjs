// Full room pipeline: build and render the scene in Blender, optimise the GLB for the web,
// then copy the preview render, the phone tour stills and hotspot focus points into the app.
// A Node wrapper because cmd.exe mangles the quoted Blender path inside an npm script.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import sharp from "sharp";

const blender =
  process.env.BLENDER_BIN ??
  "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe";
const run = (cmd, args) => execFileSync(cmd, args, { stdio: "inherit", shell: false });

run(blender, ["-b", "-P", "blender/build_room.py"]);
// Called through node directly: spawning npx.cmd without a shell is refused on Windows.
run(process.execPath, [
  "node_modules/@gltf-transform/cli/bin/cli.js",
  "optimize",
  "blender/out/room.glb",
  "public/models/room.glb",
  "--compress",
  "draco",
  "--texture-compress",
  "webp",
  // The Poly Haven props ship 1K PBR maps; half that is plenty at their size on screen.
  "--texture-size",
  "512",
  // Joining, flattening or palette merging broke the hotspot names and colours.
  "--join",
  "false",
  "--flatten",
  "false",
  "--palette",
  "false",
]);

await sharp("blender/out/preview.png")
  .webp({ quality: 82 })
  .toFile("public/images/room-preview.webp");
mkdirSync("public/images/tour", { recursive: true });
for (const file of readdirSync("blender/out").filter((name) =>
  /^tour_[a-z]+[.]png$/.test(name),
)) {
  const name = file.slice("tour_".length, -".png".length);
  await sharp(`blender/out/${file}`)
    .webp({ quality: 80 })
    .toFile(`public/images/tour/${name}.webp`);
}
for (const file of readdirSync("blender/out/fly").filter((name) =>
  /^[a-z]+_[0-9]+[.]png$/.test(name),
)) {
  const [, spot, frame] = file.match(/^([a-z]+)_([0-9]+)[.]png$/);
  mkdirSync(`public/images/tour/fly/${spot}`, { recursive: true });
  await sharp(`blender/out/fly/${file}`)
    .webp({ quality: 72 })
    .toFile(`public/images/tour/fly/${spot}/${frame}.webp`);
}
copyFileSync("blender/out/views.json", "lib/room-views.json");
console.log(
  "room updated: public/models/room.glb, public/images (preview and tour), lib/room-views.json",
);
