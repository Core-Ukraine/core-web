import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

// Pages whose texts never depend on the clock, so their pictures stay the same
for (const [name, path] of [
  ["home", "/"],
  ["topic", "/reaktory/vver-1000"],
  ["missing", "/nowhere"],
] as const) {
  test(`the ${name} page`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}

test("the open menu on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/reaktory/vver-1000");
  await page.getByRole("button", { name: "Відкрити меню" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("phone-menu.png");
});
