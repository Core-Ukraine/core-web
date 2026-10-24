import { AxeBuilder } from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { clippedText, PAGES, sidewaysOverflow } from "./helpers";

test.use({ reducedMotion: "reduce" });

// Axe violations of the page, as rule ids and targets
const violations = async (page: Page) => {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .options({ rules: { "label-content-name-mismatch": { enabled: true }, "target-size": { enabled: true } } })
    .analyze();
  return results.violations.map((violation) => ({
    rule: violation.id,
    targets: violation.nodes.map((node) => node.target.join(" ")),
  }));
};

for (const path of [...PAGES, "/nowhere"]) {
  test(`has no detectable accessibility issues on ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await violations(page)).toEqual([]);
  });
}

test("keeps the open menu accessible", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Відкрити меню" }).click();
    await page.getByRole("dialog", { name: "Меню" }).getByRole("button", { name: "Реактори" }).click();
  } else {
    await page.getByRole("button", { name: "Реактори" }).click();
  }
  const menu = page.getByRole("navigation", { name: "Головне меню" });
  await expect(menu.getByRole("link", { name: /^РБМК-1000/u })).toBeVisible();
  expect(await violations(page)).toEqual([]);
});

test("can be used with the keyboard alone", async ({ page, browserName }) => {
  await page.goto("/");
  // Safari moves focus to links with Option+Tab
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  const skip = page.getByRole("link", { name: "Перейти до змісту" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

for (const path of ["/", "/istoriia/ukraina", "/pro-proiekt", "/nowhere"]) {
  test(`reflows at 320 pixels without scrolling sideways on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await sidewaysOverflow(page)).toBeLessThanOrEqual(0);
  });
}

for (const path of ["/", "/reaktory", "/istoriia/ukraina"]) {
  test(`shows every word whole at 360 pixels on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await clippedText(page)).toEqual([]);
  });
}

test.describe("in forced colours mode", () => {
  test.use({ forcedColors: "active" });

  test("marks the open list apart and keeps the buttons visible", async ({ page, isMobile }) => {
    test.skip(isMobile, "The full menu bar is for wide screens");
    await page.goto("/");
    const button = page.getByRole("button", { name: "Реактори" });
    const other = page.getByRole("button", { name: "Основи" });
    await button.click();
    // The border colour of a menu button, which marks the open one
    const border = (element: typeof button) => element.evaluate((node) => getComputedStyle(node).borderTopColor);
    expect(await border(button)).not.toBe(await border(other));
    const start = page.getByRole("link", { name: "Почати з основ" });
    expect(await start.evaluate((node) => getComputedStyle(node).borderTopStyle)).toBe("solid");
  });
});
