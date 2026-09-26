import { describe, expect, it } from "vitest";
import { navItems, siteConfig } from "./site-config";
import sr from "@/messages/sr.json";
import en from "@/messages/en.json";

describe("navigation", () => {
  it("has a translation for every nav item in both languages", () => {
    for (const item of navItems) {
      expect(sr.nav).toHaveProperty(item.key);
      expect(en.nav).toHaveProperty(item.key);
    }
  });

  it("uses root-relative hrefs", () => {
    for (const item of navItems) {
      expect(item.href.startsWith("/")).toBe(true);
    }
  });
});

describe("messages", () => {
  it("have the same keys in sr and en", () => {
    const flatten = (obj: Record<string, unknown>, prefix = ""): string[] =>
      Object.entries(obj).flatMap(([key, value]) =>
        value && typeof value === "object"
          ? flatten(value as Record<string, unknown>, `${prefix}${key}.`)
          : [`${prefix}${key}`],
      );
    expect(flatten(sr).sort()).toEqual(flatten(en).sort());
  });
});

describe("site config", () => {
  it("has an https site url", () => {
    expect(siteConfig.url.startsWith("https://")).toBe(true);
  });
});
