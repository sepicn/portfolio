import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { routing } from "@/i18n/routing";
import { projects } from "@/content/data/projects";
import { alternatesFor, localePath, pageMetadata } from "./seo";

describe("localePath", () => {
  it("keeps the default locale at the root and prefixes the others", () => {
    expect(localePath("sr", "/")).toBe("/");
    expect(localePath("sr", "/about")).toBe("/about");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/about")).toBe("/en/about");
  });
});

describe("alternatesFor", () => {
  it("lists every locale plus x-default", () => {
    const alt = alternatesFor("en", "/projects");
    expect(alt.canonical).toBe("/en/projects");
    expect(alt.languages).toEqual({
      sr: "/projects",
      en: "/en/projects",
      "x-default": "/projects",
    });
  });
});

describe("pageMetadata", () => {
  it("points Open Graph at the rendered image for that locale", () => {
    const meta = pageMetadata({
      locale: "en",
      path: "/about",
      title: "About",
      description: "d",
      ogKey: "about",
    });
    expect(meta.openGraph?.title).toBe("About | Nikola Šepić");
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/og/en-about.jpg", width: 1200, height: 630 }),
    ]);
  });
});

describe("Open Graph images", () => {
  // Rendered by `npm run og`; this fails when a page or project is added without re-running it.
  const keys = [
    "home",
    "projects",
    "services",
    "about",
    "cv",
    "contact",
    ...projects.map((p) => `project-${p.slug}`),
  ];
  it.each(routing.locales.flatMap((l) => keys.map((k) => `${l}-${k}.jpg`)))(
    "%s exists",
    (file) => {
      expect(existsSync(`public/og/${file}`)).toBe(true);
    },
  );
});
