import { describe, expect, it } from "vitest";
import { posts } from "@/content/blog";
import { blogSlugs } from "@/content/blog/slug-map";
import { localizedPathname } from "@/i18n/paths";

describe("blog", () => {
  it("has a slug map entry for every post", () => {
    const fromPosts = posts.map((p) => `${p.slug.sr}|${p.slug.en}`).sort();
    const fromMap = blogSlugs.map((p) => `${p.sr}|${p.en}`).sort();
    expect(fromMap).toEqual(fromPosts);
  });

  it("translates the slug between locales", () => {
    const post = posts[0];
    expect(localizedPathname("en", `/blog/${post.slug.sr}`)).toBe(
      `/blog/${post.slug.en}`,
    );
    expect(localizedPathname("sr", `/blog/${post.slug.en}`)).toBe(
      `/blog/${post.slug.sr}`,
    );
  });

  it("uses no em or en dashes", () => {
    expect(JSON.stringify(posts)).not.toMatch(/[–—]/);
  });
});
