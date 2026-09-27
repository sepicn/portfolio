// Builds every CV file from content/cv/variants.ts, one page each.
//   public/cv/Nikola_Sepic_CV[_EN].pdf|docx                         the download on sepic.me/cv
//   ~/Desktop/CVs/<variant>/Nikola_Sepic_<file>_CV[_EN].docx          ATS version, no photo
//   ~/Desktop/CVs/<variant>/Nikola_Sepic_<file>_CV[_EN].pdf           with photo
//   ~/Desktop/CVs/<variant>/Nikola_Sepic_<file>_CV[_EN]_nophoto.pdf   for ATS portals and
//                                                                      markets that expect no photo
//   ~/Desktop/CVs/<variant>/Cover_Letter[_EN].txt
// The application CVs go outside the repo (override with CV_OUT): they are sent, not hosted.
// No server needed; the PDF is printed from generated HTML with Playwright.
// Run: npm run cv   (CV_PREVIEW=<dir> also writes PNG previews of each PDF)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import {
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Tab,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";
import { profile, education, certificates, languages } from "../content/data/profile.ts";
import { experience } from "../content/data/experience.ts";
import { variants, siteVariant } from "../content/cv/variants.ts";
import { letters } from "../content/cv/letters.ts";

// Application CVs live outside the repo so they are never committed or published.
const OUT = process.env.CV_OUT ?? join(homedir(), "Desktop", "CVs");
const LANGS = ["sr", "en"];
const ACCENT = "1F4E79";

const pick = (v, l) => v[l] ?? v.sr;
const period = (start, end, l) => {
  const f = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    return new Date(y, m - 1, 1)
      .toLocaleDateString(l === "en" ? "en-GB" : "sr-Latn-RS", { month: "short", year: "numeric" })
      .replace(/\.$/, "");
  };
  return `${f(start)} – ${end ? f(end) : l === "en" ? "Present" : "danas"}`;
};

// Standard section names only: ATS parsers map these exact headings.
const headings = {
  sr: { summary: "Profil", skills: "Veštine", experience: "Radno iskustvo", projects: "Projekti", education: "Obrazovanje" },
  en: { summary: "Summary", skills: "Skills", experience: "Work Experience", projects: "Projects", education: "Education" },
};
const extraLabels = {
  sr: { certificates: "Sertifikati", languages: "Jezici" },
  en: { certificates: "Certifications", languages: "Languages" },
};

// The three certificates that matter for a developer role, in one line.
const certLine = [0, 1, 3]
  .map((i) => certificates[i])
  .map((c) => `${c.title} (${c.org}, ${c.year})`)
  .join("; ");

function resolve(v, l) {
  return {
    headline: pick(v.headline, l),
    summary: pick(v.summary, l),
    skills: v.skills.map((s) => ({ label: pick(s.label, l), items: s.items })),
    jobs: v.jobs.map((j) => {
      const job = experience.find((e) => e.id === j.id);
      if (!job) throw new Error(`Unknown job ${j.id} in ${v.id}`);
      return {
        role: pick(j.role ?? job.role, l),
        company: job.company,
        location: pick(job.location, l),
        period: period(job.start, job.end, l),
        stack: j.stack,
        bullets: j.bullets[l],
      };
    }),
    projects: v.projects.map((p) => ({ ...p, line: pick(p.line, l) })),
    education: education.map((e) => ({
      degree: pick(e.degree, l),
      school: pick(e.school, l),
      period: e.period,
      note: v.educationNote ? pick(v.educationNote, l) : null,
    })),
    certificates: certLine,
    languages: languages.map((x) => `${pick(x.name, l)} (${pick(x.level, l)})`).join(", "),
  };
}

const contacts = (l) => [
  pick(profile.location, l),
  profile.email,
  profile.phone,
  "sepic.me",
  "linkedin.com/in/sepicn",
  "github.com/sepicn",
];

// ---------------------------------------------------------------------------
// DOCX: plain paragraphs only (no tables, text boxes, headers or footers), so every ATS
// reads it top to bottom. Right-aligned dates use a tab stop, which parsers read as a space.

function docx(v, l) {
  const d = resolve(v, l);
  const H = headings[l];
  const X = extraLabels[l];
  const font = "Calibri";
  const size = 20;
  const run = (text, o = {}) => new TextRun({ text, font, size, ...o });
  const para = (children, after = 60, extra = {}) => new Paragraph({ children, spacing: { after }, ...extra });
  const rightTab = { tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }] };
  const dated = (children, date, after) =>
    para([...children, new TextRun({ font, size: 19, color: "5B6470", children: [new Tab(), date] })], after, rightTab);
  const h = (text) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: text.toUpperCase(), font, size: 21, bold: true, color: ACCENT })],
      spacing: { before: 160, after: 70 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "C9D3DE", space: 2 } },
    });
  const bullet = (text) => new Paragraph({ children: [run(text)], bullet: { level: 0 }, spacing: { after: 30 } });
  const labelled = (label, text) => para([run(`${label}: `, { bold: true }), run(text)], 40);

  const blocks = {
    summary: () => [h(H.summary), para([run(d.summary)], 40)],
    skills: () => [h(H.skills), ...d.skills.map((s) => labelled(s.label, s.items))],
    experience: () => [
      h(H.experience),
      ...d.jobs.flatMap((j) => [
        dated([run(j.role, { bold: true }), run(` | ${j.company}`)], j.period, 10),
        para([run(`${j.location} | ${j.stack}`, { italics: true, size: 18, color: "5B6470" })], 30),
        ...j.bullets.map(bullet),
        para([], 30),
      ]),
    ],
    projects: () =>
      d.projects.length
        ? [
            h(H.projects),
            ...d.projects.map((p) =>
              para(
                [run(p.title, { bold: true }), run(` | ${p.stack}: `, { color: "5B6470" }), run(`${p.line} ${p.link}`)],
                40,
              ),
            ),
          ]
        : [],
    education: () => [
      h(H.education),
      ...d.education.flatMap((e) => [
        dated([run(e.degree, { bold: true }), run(` | ${e.school}`)], e.period, 30),
        ...(e.note ? [para([run(e.note)], 40)] : []),
      ]),
      labelled(X.certificates, d.certificates),
      labelled(X.languages, d.languages),
    ],
  };

  return new Document({
    creator: profile.name,
    title: `${profile.name} CV`,
    styles: { default: { document: { run: { font, size } } } },
    sections: [
      {
        properties: { page: { margin: { top: 680, bottom: 680, left: 800, right: 800 } } },
        children: [
          para([new TextRun({ text: profile.name, font, size: 40, bold: true, color: "111111" })], 20),
          para([run(d.headline, { size: 23, bold: true, color: ACCENT })], 30),
          para([run(contacts(l).join(" | "), { size: 18 })], 60),
          ...v.order.flatMap((s) => blocks[s]()),
        ],
      },
    ],
  });
}

// ---------------------------------------------------------------------------
// PDF: the same content as HTML, one column, printed by Chromium. Text stays real text.

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function html(v, l, photo, fontPt) {
  const d = resolve(v, l);
  const H = headings[l];
  const X = extraLabels[l];
  const sec = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`;
  const row = (title, sub, date) =>
    `<div class="row"><h3>${esc(title)} <span class="at">| ${esc(sub)}</span></h3><span class="date">${esc(date)}</span></div>`;
  const blocks = {
    summary: () => sec(H.summary, `<p>${esc(d.summary)}</p>`),
    skills: () => sec(H.skills, d.skills.map((s) => `<p class="kv"><b>${esc(s.label)}:</b> ${esc(s.items)}</p>`).join("")),
    experience: () =>
      sec(
        H.experience,
        d.jobs
          .map(
            (j) => `<div class="job">${row(j.role, j.company, j.period)}
  <p class="sub">${esc(j.location)} · ${esc(j.stack)}</p>
  <ul>${j.bullets.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`,
          )
          .join(""),
      ),
    projects: () =>
      d.projects.length
        ? sec(
            H.projects,
            d.projects
              .map(
                (p) =>
                  `<p class="proj"><b>${esc(p.title)}</b> <span class="muted">| ${esc(p.stack)}:</span> ${esc(p.line)} <span class="link">${esc(p.link)}</span></p>`,
              )
              .join(""),
          )
        : "",
    education: () =>
      sec(
        H.education,
        d.education
          .map((e) => row(e.degree, e.school, e.period) + (e.note ? `<p class="note">${esc(e.note)}</p>` : ""))
          .join("") +
          `<p class="kv first"><b>${esc(X.certificates)}:</b> ${esc(d.certificates)}</p>` +
          `<p class="kv"><b>${esc(X.languages)}:</b> ${esc(d.languages)}</p>`,
      ),
  };

  return `<!doctype html><html lang="${l === "sr" ? "sr-Latn" : "en"}"><head><meta charset="utf-8">
<title>${esc(profile.name)} CV</title>
<style>
  @page { size: A4; margin: 11mm 13mm; }
  :root { --accent: #${ACCENT}; --muted: #5b6470; --rule: #cfd8e3; }
  * { box-sizing: border-box; }
  html { font-size: ${fontPt}pt; }
  body { margin: 0; font-family: Calibri, Carlito, "Segoe UI", Arial, sans-serif; line-height: 1.32; color: #1b1f24; }
  header { display: flex; align-items: center; gap: 5mm; padding-bottom: 3mm; border-bottom: 2px solid var(--accent); }
  header .id { flex: 1; min-width: 0; }
  h1 { margin: 0; font-size: 2.25rem; line-height: 1.05; letter-spacing: -.2px; color: #111; }
  .headline { margin: 1.2mm 0 1.6mm; font-size: 1.12rem; font-weight: 700; color: var(--accent); }
  .contact { margin: 0; font-size: .9rem; color: #333; display: flex; flex-wrap: wrap; column-gap: 1.1em; row-gap: .3mm; }
  .contact span { white-space: nowrap; }
  .photo { width: 24mm; height: 24mm; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent); flex-shrink: 0; }
  section { margin-top: 3.4mm; }
  h2 { margin: 0 0 1.4mm; padding-bottom: .8mm; font-size: .98rem; letter-spacing: 1.3px; text-transform: uppercase; color: var(--accent); border-bottom: .75px solid var(--rule); }
  h3 { margin: 0; font-size: 1.02rem; }
  p { margin: 0; }
  .kv { margin-bottom: .5mm; }
  .kv.first { margin-top: 1.2mm; }
  .job { margin-bottom: 2.2mm; }
  .job:last-child { margin-bottom: 0; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
  .at { font-weight: 400; color: #333; }
  .date { font-size: .9rem; color: var(--muted); white-space: nowrap; }
  .sub { font-size: .88rem; color: var(--muted); font-style: italic; margin: .2mm 0 .6mm; }
  ul { margin: 0; padding-left: 4.2mm; }
  li { margin-bottom: .45mm; padding-left: .5mm; }
  li::marker { color: var(--accent); }
  .proj { margin-bottom: .8mm; }
  .muted { color: var(--muted); }
  .link { color: var(--accent); font-size: .9rem; white-space: nowrap; }
  .note { color: #333; margin-top: .3mm; }
</style></head><body>
<header>
  <div class="id">
    <h1>${esc(profile.name)}</h1>
    <p class="headline">${esc(d.headline)}</p>
    <p class="contact">${contacts(l).map((c) => `<span>${esc(c)}</span>`).join(" ")}</p>
  </div>
  ${photo ? `<img class="photo" src="${photo}" alt="">` : ""}
</header>
${v.order.map((s) => blocks[s]()).join("\n")}
</body></html>`;
}

const photoUri = `data:image/webp;base64,${readFileSync(`public${profile.photo}`).toString("base64")}`;
const browser = await chromium.launch();
const page = await browser.newPage();
const countPages = (pdf) => (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

/** Prints at 10.5pt and steps the size down until the CV fits on one page. */
async function onePagePdf(v, l, photo) {
  for (const pt of [10.5, 10.2, 9.9, 9.6]) {
    await page.setContent(html(v, l, photo, pt), { waitUntil: "load" });
    const pdf = await page.pdf({ format: "A4", preferCSSPageSize: true, printBackground: true });
    if (countPages(pdf) === 1) return { pdf, pt };
  }
  throw new Error(`${v.id} (${l}) does not fit on one page even at 9.6pt: cut a bullet`);
}

async function build(v, l, base, { withNoPhoto }) {
  writeFileSync(`${base}.docx`, await Packer.toBuffer(docx(v, l)));
  const { pdf, pt } = await onePagePdf(v, l, photoUri);
  writeFileSync(`${base}.pdf`, pdf);
  if (withNoPhoto) writeFileSync(`${base}_nophoto.pdf`, (await onePagePdf(v, l, null)).pdf);
  if (process.env.CV_PREVIEW) {
    await page.setViewportSize({ width: 697, height: 1050 });
    await page.setContent(html(v, l, photoUri, pt), { waitUntil: "load" });
    await page.screenshot({ path: `${process.env.CV_PREVIEW}/${v.id}-${l}.png`, fullPage: true });
  }
  return pt;
}

const report = [];
mkdirSync("public/cv", { recursive: true });
for (const l of LANGS) {
  const pt = await build(siteVariant, l, `public/cv/Nikola_Sepic_CV${l === "en" ? "_EN" : ""}`, { withNoPhoto: false });
  report.push(`${"site".padEnd(17)} ${l}  1 page at ${pt}pt`);
}
for (const v of variants) {
  const dir = `${OUT}/${v.id}`;
  mkdirSync(dir, { recursive: true });
  for (const l of LANGS) {
    const pt = await build(v, l, `${dir}/Nikola_Sepic_${v.file}_CV${l === "en" ? "_EN" : ""}`, { withNoPhoto: true });
    report.push(`${v.id.padEnd(17)} ${l}  1 page at ${pt}pt`);
    const letter = letters[v.id]?.[l];
    if (letter) writeFileSync(`${dir}/Cover_Letter${l === "en" ? "_EN" : ""}.txt`, letter);
  }
}
await browser.close();
console.log(report.join("\n"));
