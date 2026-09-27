import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Serbian public URLs (i18n/routing.ts pathnames).
const routes = [
  "/",
  "/projekti",
  "/usluge",
  "/usluge/izrada-sajtova",
  "/usluge/google-ads",
  "/usluge/meta-ads",
  "/usluge/seo",
  "/o-meni",
  "/cv",
  "/kontakt",
  "/privatnost",
];

for (const route of routes) {
  test(`renders ${route} in Serbian and passes axe`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "sr");
    await expect(page.locator("h1")).toBeVisible();
    // [data-reveal] content is hidden until hydration un-hides it; axe must see the settled page.
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("English version is served under /en", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toContainText("Websites and Google Ads");
});

test("language switcher keeps the current page", async ({ page }) => {
  await page.goto("/usluge/izrada-sajtova");
  const menuButton = page.getByRole("button", { name: /meni|menu/i });
  if (await menuButton.isVisible()) await menuButton.click();
  await page
    .getByRole("link", { name: /English/ })
    .filter({ visible: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/en\/services\/web-development$/);
});

test("old Serbian URLs with English slugs redirect permanently", async ({ request }) => {
  for (const [from, to] of [
    ["/projects", "/projekti"],
    ["/projects/medical-time", "/projekti/medical-time"],
    ["/services", "/usluge"],
    ["/about", "/o-meni"],
    ["/contact", "/kontakt"],
    ["/privacy", "/privatnost"],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status(), from).toBe(308);
    expect(response.headers().location, from).toMatch(new RegExp(`${to}$`));
  }
});

test("skip link is the first focusable element", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveAttribute("href", "#content");
});

test("sitemap and robots exist", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<urlset");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
});

test("consent banner stores the choice and the footer reopens it", async ({ page }) => {
  await page.goto("/o-meni");
  const banner = page.getByRole("region", { name: /kolačić/i });
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Odbij" }).click();
  await expect(banner).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem("sepic-consent"))).toBe("denied");

  await page.reload();
  await expect(banner).toBeHidden();
  await page.getByRole("button", { name: "Podešavanja kolačića" }).click();
  await expect(banner).toBeVisible();
});

test("every page has its own Open Graph image", async ({ page }) => {
  await page.goto("/en/projects/medical-time");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/og\/en-project-medical-time\.jpg$/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Medical Time: hospital website and Google Ads | Nikola Šepić",
  );
});

test("email and phone never appear in plain HTML outside the CV", async ({ request }) => {
  for (const route of [
    "/",
    "/o-meni",
    "/usluge",
    "/usluge/google-ads",
    "/kontakt",
    "/projekti/medical-time",
  ]) {
    const html = await (await request.get(route)).text();
    expect(html, route).not.toContain("sepicnikola@gmail.com");
    expect(html, route).not.toContain("7624");
  }
});

test("structured data: home graph and case study breadcrumbs", async ({ request }) => {
  const ld = async (route: string) => {
    const html = await (await request.get(route)).text();
    return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
      .map((m) => m[1])
      .join(" ");
  };
  expect(await ld("/")).toContain('"@type":"WebSite"');
  expect(await ld("/projekti/medical-time")).toContain('"@type":"BreadcrumbList"');
  const service = await ld("/usluge/seo");
  for (const type of ["Service", "BreadcrumbList", "FAQPage"]) {
    expect(service).toContain(`"@type":"${type}"`);
  }
});
