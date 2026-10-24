import { expect, test } from "@playwright/test";

import { PAGES } from "./helpers";

test.describe("on a wide screen", () => {
  test.skip(({ isMobile }) => isMobile, "The phone menu has its own tests");

  test("opens a list under its button and follows a topic", async ({ page }) => {
    await page.goto("/");
    const reactors = page.getByRole("button", { name: "Реактори" });
    await reactors.click();
    await expect(reactors).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Головне меню" })
      .getByRole("link", { name: /^РБМК-1000/u })
      .click();
    await expect(page).toHaveURL(/\/reaktory\/rbmk-1000$/u);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("РБМК-1000");
    await expect(reactors).toHaveAttribute("aria-expanded", "false");
  });

  test("closes a list with Escape and keeps the last one inside the page", async ({ page }) => {
    await page.goto("/");
    const materials = page.getByRole("button", { name: "Матеріали" });
    await materials.click();
    const panel = page.locator(`[id="${await materials.getAttribute("aria-controls")}"]`);
    await expect(panel).toBeVisible();
    const box = await panel.boundingBox();
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(page.viewportSize()?.width ?? 0);
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(materials).toBeFocused();
  });

  test("leads to a section through the breadcrumbs", async ({ page }) => {
    await page.goto("/istoriia/svit");
    await page
      .getByRole("navigation", { name: "Навігаційний ланцюжок" })
      .getByRole("link", { name: "Історія" })
      .click();
    await expect(page).toHaveURL(/\/istoriia$/u);
    await expect(page.getByRole("link", { name: /Історія атомної енергетики у світі/u })).toBeVisible();
  });
});

test.describe("on a phone", () => {
  test.skip(({ isMobile }) => !isMobile, "The full menu bar has its own tests");

  test("opens the whole menu with the current section unfolded", async ({ page }) => {
    await page.goto("/materialy/video");
    await page.getByRole("button", { name: "Відкрити меню" }).click();
    const menu = page.getByRole("dialog", { name: "Меню" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("button", { name: "Матеріали" })).toHaveAttribute("aria-expanded", "true");
    await menu.getByRole("button", { name: "Основи" }).click();
    await expect(menu.getByRole("button", { name: "Матеріали" })).toHaveAttribute("aria-expanded", "false");
    await menu.getByRole("link", { name: "Турбіни" }).click();
    await expect(page).toHaveURL(/\/osnovy\/turbiny$/u);
    await expect(menu).toBeHidden();
  });

  test("closes the menu with the cross and with Escape", async ({ page }) => {
    await page.goto("/");
    const open = page.getByRole("button", { name: "Відкрити меню" });
    await open.click();
    await page.getByRole("button", { name: "Закрити меню" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await open.click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(open).toHaveAttribute("aria-expanded", "false");
  });
});

test("answers every link of every page", async ({ request, browserName, isMobile }) => {
  test.skip(browserName !== "chromium" || isMobile, "Links are the same in every browser");
  const pages = await Promise.all(PAGES.map(async (path) => (await request.get(path)).text()));
  const hrefs = new Set(
    pages.flatMap((html) => [...html.matchAll(/<a [^>]*href="(\/[^"#?]*)/gu)].map((match) => match[1] ?? "/")),
  );
  const answers = await Promise.all([...hrefs].map(async (href) => `${href} ${(await request.get(href)).status()}`));
  expect(answers.filter((answer) => !answer.endsWith(" 200"))).toEqual([]);
  expect(hrefs.size).toBeGreaterThanOrEqual(17);
});
