import { expect, test } from "@playwright/test";

import { watchProblems } from "./helpers";

test("runs without console errors or policy violations", async ({ page, isMobile }) => {
  const check = await watchProblems(page);
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Відкрити меню" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Реактори" }).click();
  } else {
    await page.getByRole("button", { name: "Реактори" }).click();
  }
  await page
    .getByRole("navigation", { name: "Головне меню" })
    .getByRole("link", { name: /^ВВЕР-1000/u })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ВВЕР-1000");
  await page.goto("/novyny");
  // Safari reports requests that a navigation cancels as errors
  await page.waitForLoadState("networkidle");
  await check();
});

test("renders the missing page under the same policy", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await watchProblems(page);
  await page.goto("/nowhere");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Сторінку не знайдено");
  expect(await page.evaluate(() => Reflect.get(window, "policyViolations"))).toEqual([]);
  expect(errors).toEqual([]);
});

test("sends the policy and the security headers with every page", async ({ request }) => {
  const paths = ["/", "/reaktory/vver-1000", "/nowhere"];
  const answers = await Promise.all(
    paths.map(async (path) => ({ path, headers: (await request.get(path)).headers() })),
  );
  for (const { path, headers } of answers) {
    const policy = headers["content-security-policy"] ?? "";
    expect(policy, path).toContain("default-src 'self'");
    expect(policy, path).toContain("frame-ancestors 'none'");
    expect(policy, path).toContain("object-src 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["strict-transport-security"]).toContain("max-age=");
    expect(headers["x-powered-by"]).toBeUndefined();
  }
});

test("locks the offline page and the app icons down further", async ({ request }) => {
  const offline = await request.get("/offline");
  const policy = offline.headers()["content-security-policy"] ?? "";
  expect(policy).toMatch(/^default-src 'none'; style-src 'sha256-[^']+'; script-src 'sha256-[^']+'/u);
  expect(offline.headers()["x-robots-tag"]).toBe("noindex");
  const icon = await request.get("/pwa/icon-192.png");
  expect(icon.headers()["content-security-policy"]).toContain("sandbox");
  expect(icon.headers()["content-type"]).toBe("image/png");
});
