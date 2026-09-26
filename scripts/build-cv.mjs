// Builds the downloadable CV files from the same data the site uses.
//   public/cv/Nikola_Sepic_CV.pdf       printed from the /cv page (needs a running server)
//   public/cv/Nikola_Sepic_CV.docx      single-column ATS layout built with the docx library
//   public/cv/Nikola_Sepic_CV_EN.pdf / _EN.docx   English versions
// Run: node scripts/build-cv.mjs [baseUrl]
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import {
  profile,
  skillGroups,
  education,
  certificates,
  languages,
} from "../content/data/profile.ts";
import { experience } from "../content/data/experience.ts";
import { projects } from "../content/data/projects.ts";

const base = process.argv[2] ?? "http://localhost:3100";
mkdirSync("public/cv", { recursive: true });

const pick = (v, l) => v[l] ?? v.sr;
const period = (start, end, l) => {
  const f = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString(l === "en" ? "en-GB" : "sr-Latn-RS", {
      month: "short",
      year: "numeric",
    });
  };
  return `${f(start)} – ${end ? f(end) : l === "en" ? "present" : "danas"}`;
};
const labels = {
  sr: {
    summary: "SAŽETAK",
    skills: "VEŠTINE",
    experience: "ISKUSTVO",
    projects: "IZABRANI LIČNI PROJEKTI",
    education: "OBRAZOVANJE",
    languages: "JEZICI",
    certificates: "SERTIFIKATI",
  },
  en: {
    summary: "SUMMARY",
    skills: "SKILLS",
    experience: "EXPERIENCE",
    projects: "SELECTED PERSONAL PROJECTS",
    education: "EDUCATION",
    languages: "LANGUAGES",
    certificates: "CERTIFICATIONS",
  },
};

function docxFor(l) {
  const L = labels[l];
  const font = "Calibri";
  const p = (text, opts = {}) =>
    new Paragraph({
      children: [new TextRun({ text, font, size: 22, ...opts })],
      spacing: { after: 80 },
    });
  const h = (text) =>
    new Paragraph({
      text,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 100 },
    });
  const bullet = (text) =>
    new Paragraph({
      children: [new TextRun({ text, font, size: 21 })],
      bullet: { level: 0 },
      spacing: { after: 40 },
    });
  const children = [
    new Paragraph({
      children: [new TextRun({ text: profile.name, font, size: 40, bold: true })],
      alignment: AlignmentType.LEFT,
      spacing: { after: 40 },
    }),
    p(pick(profile.cvTitle, l), { size: 24 }),
    p(
      `${pick(profile.location, l)} | ${profile.email} | ${profile.phone} | sepic.me | linkedin.com/in/sepicn | github.com/sepicn`,
      { size: 20 },
    ),
    h(L.summary),
    p(pick(profile.cvSummary, l)),
    h(L.skills),
    ...skillGroups.map((g) =>
      p(`${pick(g.label, l)}: ${g.skills.map((s) => s.name).join(", ")}`),
    ),
    h(L.experience),
  ];
  for (const job of experience) {
    children.push(
      p(
        `${pick(job.role, l)} | ${job.company} | ${pick(job.location, l)} | ${period(job.start, job.end, l)}`,
        { bold: true },
      ),
    );
    children.push(p(pick(job.summary, l)));
    for (const b of job.bullets[l] ?? job.bullets.sr) children.push(bullet(b));
  }
  children.push(h(L.projects));
  for (const pr of projects.filter((x) => x.kind === "personal").slice(0, 3)) {
    children.push(p(`${pr.title} | ${pr.stack.slice(0, 5).join(", ")}`, { bold: true }));
    children.push(
      p(
        `${pick(pr.tagline, l)} ${(pr.did[l] ?? pr.did.sr)[0]} ${[pr.links.live, pr.links.repo].filter(Boolean).join(" ")}`,
      ),
    );
  }
  children.push(h(L.education));
  for (const e of education)
    children.push(p(`${pick(e.degree, l)} | ${pick(e.school, l)} | ${e.period}`));
  children.push(h(L.languages));
  children.push(
    p(languages.map((x) => `${pick(x.name, l)} (${pick(x.level, l)})`).join(", ")),
  );
  children.push(h(L.certificates));
  for (const c of certificates) children.push(bullet(`${c.title}, ${c.org}, ${c.year}`));
  return new Document({
    creator: profile.name,
    title: `${profile.name} CV`,
    styles: {
      default: { document: { run: { font, size: 22 } } },
      paragraphStyles: [
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 24, bold: true, font, color: "1a1a1a" },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } },
        },
        children,
      },
    ],
  });
}

for (const l of ["sr", "en"]) {
  const suffix = l === "en" ? "_EN" : "";
  const buffer = await Packer.toBuffer(docxFor(l));
  writeFileSync(`public/cv/Nikola_Sepic_CV${suffix}.docx`, buffer);
  console.log("docx", l, buffer.length, "bytes");
}

const browser = await chromium.launch();
for (const l of ["sr", "en"]) {
  const suffix = l === "en" ? "_EN" : "";
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.goto(`${base}${l === "en" ? "/en" : ""}/cv`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
  await page.waitForTimeout(800);
  await page.pdf({
    path: `public/cv/Nikola_Sepic_CV${suffix}.pdf`,
    format: "A4",
    printBackground: false,
    margin: { top: "14mm", bottom: "14mm", left: "14mm", right: "14mm" },
  });
  console.log("pdf", l);
  await page.close();
}
await browser.close();
