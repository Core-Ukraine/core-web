import { expect, test } from "@playwright/test";

test.skip(({ isMobile }) => isMobile, "The markup for search engines is the same on every screen");

test("describes a topic for search engines and share cards", async ({ page, baseURL }) => {
  await page.goto("/reaktory/vver-1000");
  await expect(page).toHaveTitle("ВВЕР-1000 · ЯДРО");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${baseURL}/reaktory/vver-1000`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Водо-водяний енергетичний реактор. Розділ «Реактори» освітнього порталу ЯДРО.",
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "uk_UA");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("names the home page after the site and its title", async ({ page, baseURL }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("ЯДРО · Атомна енергетика: від ядра до турбіни");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", baseURL ?? "");
  const json = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(json ?? "null")).toHaveProperty(["@graph", "0", "@type"], "WebSite");
});

test("describes the way to a page with structured data", async ({ page, baseURL }) => {
  await page.goto("/istoriia/ukraina");
  const json = await page.locator('script[type="application/ld+json"]').textContent();
  const schema: unknown = JSON.parse(json ?? "null");
  expect(schema).toHaveProperty(["@graph", "1", "@type"], "WebPage");
  expect(schema).toHaveProperty(["@graph", "1", "url"], `${baseURL}/istoriia/ukraina`);
  expect(schema).toHaveProperty(["@graph", "1", "inLanguage"], "uk");
  expect(schema).toHaveProperty(["@graph", "1", "breadcrumb", "itemListElement", "1", "name"], "Історія");
});

test("keeps missing pages out of the index", async ({ page }) => {
  await page.goto("/nowhere");
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
});

test("lists every page in the sitemap and allows crawling", async ({ request, baseURL }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/gu)).toHaveLength(17);
  for (const path of ["/", "/reaktory/ap-1000", "/materialy/kreslennia", "/novyny"]) {
    expect(xml).toContain(`<loc>${baseURL}${path}</loc>`);
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${baseURL}/sitemap.xml`);
});

for (const path of ["/", "/reaktory", "/reaktory/vver-1000", "/novyny"]) {
  test(`serves a share image for ${path}`, async ({ page, request }) => {
    await page.goto(path);
    const image = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(image).toBeTruthy();
    const response = await request.get(image ?? "");
    expect(response.headers()["content-type"]).toBe("image/png");
  });
}

test("describes the site for installation", async ({ request }) => {
  const manifest: unknown = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest).toMatchObject({ short_name: "ЯДРО", start_url: "/", display: "standalone", lang: "uk" });
});

test("names a security contact that has not expired", async ({ request }) => {
  const text = await (await request.get("/.well-known/security.txt")).text();
  expect(text).toMatch(/^Contact: https:\/\/github\.com\/Core-Ukraine\/core-web\/security\/advisories\/new$/mu);
  const expires = Date.parse(/^Expires: (?<date>.+)$/mu.exec(text)?.groups?.date ?? "");
  expect(expires).toBeGreaterThan(Date.now());
});
