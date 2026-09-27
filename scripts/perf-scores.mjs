// Measures every live project and writes content/data/perf-scores.json, which the case
// studies show with the date and the source of the run. Re-run whenever a site changes:
//   node scripts/perf-scores.mjs            all projects with a live URL
//   node scripts/perf-scores.mjs mango      only these slugs
//
// Source: Google PageSpeed Insights (Lighthouse run by Google) when PSI_KEY is set, a
// Google Cloud API key with the PageSpeed Insights API enabled. The keyless API shares one
// daily quota between everyone and is usually exhausted, so without a key (or when the
// quota runs out) the same Lighthouse runs locally with PageSpeed's settings: mobile with
// simulated slow 4G and a 4x slower CPU, and desktop.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { projects } from "../content/data/projects.ts";

const OUT = "content/data/perf-scores.json";
const only = new Set(process.argv.slice(2));
// Sites whose speed is not Nikola's to fix (the client declined a performance job), so
// their scores are never published. Remove a slug here if that changes.
const SKIP = new Set(["olimp"]);
const categories = ["performance", "accessibility", "best-practices", "seo"];

function summarise(lh) {
  const audits = lh.audits;
  return {
    performance: Math.round(lh.categories.performance.score * 100),
    accessibility: Math.round(lh.categories.accessibility.score * 100),
    bestPractices: Math.round(lh.categories["best-practices"].score * 100),
    seo: Math.round(lh.categories.seo.score * 100),
    lcp: Math.round(audits["largest-contentful-paint"].numericValue),
    cls: Number(audits["cumulative-layout-shift"].numericValue.toFixed(3)),
    tbt: Math.round(audits["total-blocking-time"].numericValue),
  };
}

async function pagespeed(url, strategy) {
  if (!process.env.PSI_KEY) return null;
  const query = categories.map((c) => `&category=${c}`).join("");
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}${query}&key=${process.env.PSI_KEY}`;
  const res = await fetch(api, { signal: AbortSignal.timeout(120_000) });
  const body = await res.json();
  if (!res.ok) {
    console.warn(`  PageSpeed ${strategy}: ${body.error?.message ?? res.status}`);
    return null;
  }
  return summarise(body.lighthouseResult);
}

function lighthouse(url, strategy) {
  const dir = mkdtempSync(join(tmpdir(), "lh-"));
  const out = join(dir, "report.json");
  try {
    execFileSync(
      process.platform === "win32" ? "npx.cmd" : "npx",
      [
        "--yes",
        "lighthouse@12",
        url,
        "--quiet",
        "--output=json",
        `--output-path=${out}`,
        `--only-categories=${categories.join(",")}`,
        "--chrome-flags=--headless=new",
        ...(strategy === "desktop" ? ["--preset=desktop"] : []),
      ],
      { stdio: "ignore", shell: process.platform === "win32", timeout: 180_000 },
    );
    return summarise(JSON.parse(readFileSync(out, "utf8")));
  } catch (error) {
    // On Windows Lighthouse often exits non-zero while removing Chrome's temp profile,
    // after the report is already written; the report is what counts.
    if (existsSync(out)) return summarise(JSON.parse(readFileSync(out, "utf8")));
    console.warn(`  Lighthouse ${strategy}: ${error.message.split("\n")[0]}`);
    return null;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const scores = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
for (const project of projects) {
  const url = project.links.live;
  if (!url || SKIP.has(project.slug) || (only.size && !only.has(project.slug))) continue;
  console.log(`${project.slug}: ${url}`);
  let source = "pagespeed";
  let mobile = await pagespeed(url, "mobile");
  let desktop = mobile && (await pagespeed(url, "desktop"));
  if (!mobile || !desktop) {
    source = "lighthouse";
    mobile = lighthouse(url, "mobile");
    desktop = mobile && lighthouse(url, "desktop");
  }
  if (!mobile || !desktop) {
    console.warn("  skipped, keeping the previous result");
    continue;
  }
  scores[project.slug] = {
    url,
    date: new Date().toISOString().slice(0, 10),
    source,
    mobile,
    desktop,
  };
  console.log(
    `  ${source}: mobile ${mobile.performance}, desktop ${desktop.performance}`,
  );
}
writeFileSync(OUT, `${JSON.stringify(scores, null, 2)}\n`);
