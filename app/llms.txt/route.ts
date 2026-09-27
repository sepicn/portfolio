import { profile } from "@/content/data/profile";
import { projects } from "@/content/data/projects";
import { services } from "@/content/data/services";
import { absoluteUrl } from "@/lib/structured-data";

// llms.txt (llmstxt.org): a short Markdown map of the site for language models. Google
// says it does not use it, so this is a cheap extra, generated from the same data as the
// pages so it never drifts from them.
export const dynamic = "force-static";

export function GET() {
  const url = (path: string) => absoluteUrl("en", path);
  const sr = (path: string) => absoluteUrl("sr", path);
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.summary.en}`,
    "",
    "Freelance web developer and digital marketer based in Belgrade, Serbia, working with clients in Belgrade and remotely. " +
      "The site is bilingual: Serbian (default, no prefix) and English (/en). Contact is by phone or email through the contact page; replies come as soon as possible, usually the same day.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title.en}](${url("/services")}): ${s.lead.en}`),
    "",
    "## Case studies",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${url(`/projects/${p.slug}`)}): ${p.description.en}`,
    ),
    "",
    "## Pages",
    "",
    `- [Home](${url("/")}) / [Početna](${sr("/")})`,
    `- [Projects](${url("/projects")}) / [Projekti](${sr("/projects")})`,
    `- [Services](${url("/services")}) / [Usluge](${sr("/services")})`,
    `- [About](${url("/about")}) / [O meni](${sr("/about")})`,
    `- [CV](${url("/cv")}) / [CV](${sr("/cv")})`,
    `- [Contact](${url("/contact")}) / [Kontakt](${sr("/contact")})`,
    "",
    "## Profiles",
    "",
    `- [GitHub](${profile.github})`,
    `- [LinkedIn](${profile.linkedin})`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
