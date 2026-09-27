// Tracks when each page's content last changed, for <lastmod> in the sitemap.
//
// Every route has a fingerprint: a hash of its page file, the data it renders and its
// message namespaces in both languages. When the fingerprint differs from the one stored
// in lib/lastmod.json, the route gets today's date; otherwise its date stays. So the date
// moves only when the page really changes, not on every deploy.
//
//   node scripts/lastmod.mjs          update lib/lastmod.json (runs before every build)
//   node scripts/lastmod.mjs --check  exit 1 if it is out of date (part of npm run check)
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const OUT = "lib/lastmod.json";
const check = process.argv.includes("--check");

const messages = {
  sr: JSON.parse(readFileSync("messages/sr.json", "utf8")),
  en: JSON.parse(readFileSync("messages/en.json", "utf8")),
};
const read = (file) => readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const page = (dir) => `app/[locale]${dir}/page.tsx`;
const data = (name) => `content/data/${name}.ts`;

// One project's entry in content/data/projects.ts, so editing one case study does not
// touch the dates of the others.
const projectsSource = read(data("projects"));
const projectChunks = projectsSource.split(/\n  \{\n/);
const slugs = [...projectsSource.matchAll(/\n {4}slug: "([^"]+)"/g)].map((m) => m[1]);
const projectChunk = (slug) =>
  projectChunks.find((chunk) => chunk.includes(`slug: "${slug}"`)) ?? "";

/** route -> { files, namespaces, extra } */
const routes = {
  "/": {
    files: [page(""), data("projects"), data("services"), data("profile")],
    namespaces: ["home", "site"],
  },
  "/projects": { files: [page("/projects"), data("projects")], namespaces: ["projects"] },
  "/services": { files: [page("/services"), data("services")], namespaces: ["services"] },
  "/about": {
    files: [page("/about"), data("profile"), data("experience")],
    namespaces: ["about"],
  },
  "/cv": {
    files: [page("/cv"), data("profile"), data("experience"), data("projects")],
    namespaces: ["cv"],
  },
  "/contact": { files: [page("/contact")], namespaces: ["contact", "contactForm"] },
  "/privacy": { files: [page("/privacy")], namespaces: ["privacy"] },
  ...Object.fromEntries(
    slugs.map((slug) => [
      `/projects/${slug}`,
      {
        files: [page("/projects/[slug]")],
        namespaces: ["projectPage"],
        extra: projectChunk(slug),
      },
    ]),
  ),
};

function fingerprint({ files, namespaces, extra = "" }) {
  const hash = createHash("sha256");
  for (const file of files) hash.update(read(file));
  for (const ns of namespaces) {
    hash.update(JSON.stringify(messages.sr[ns] ?? null));
    hash.update(JSON.stringify(messages.en[ns] ?? null));
  }
  hash.update(extra);
  return hash.digest("hex").slice(0, 16);
}

const stored = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const now = new Date().toISOString().slice(0, 10);
const next = {};
const changed = [];
for (const [route, spec] of Object.entries(routes)) {
  const hash = fingerprint(spec);
  const previous = stored[route];
  if (previous?.hash === hash) {
    next[route] = previous;
  } else {
    next[route] = { hash, date: now };
    changed.push(route);
  }
}
const removed = Object.keys(stored).filter((route) => !(route in routes));

if (check) {
  if (changed.length || removed.length) {
    console.error(
      `lib/lastmod.json is out of date (${[...changed, ...removed].join(", ")}). Run: node scripts/lastmod.mjs`,
    );
    process.exit(1);
  }
  console.log("lastmod: up to date");
} else {
  writeFileSync(OUT, `${JSON.stringify(next, null, 2)}\n`);
  console.log(
    changed.length
      ? `lastmod: ${changed.length} route(s) dated ${now}`
      : "lastmod: no changes",
  );
}
