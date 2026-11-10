import { expect, test } from "@playwright/test";

import { watchProblems } from "./helpers";

const COURSE = "/reaktory/ap-1000";

test("switches an accident scenario with its events and flows", async ({ page }) => {
  const check = await watchProblems(page);
  await page.goto(COURSE);
  const rupture = page.getByRole("button", { name: "Велика течія (розрив трубопроводу)" });
  await rupture.click();
  await expect(rupture).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Впорскують одразу: великий потік протягом кількох хвилин.")).toBeVisible();
  await expect(page.getByText("Зникає зовнішнє живлення, резервні дизель-генератори не запускаються.")).toBeHidden();
  await page.getByText("Спрощена схема з анімацією потоків", { exact: true }).click();
  await expect(page.locator("[data-mode='scenario'] [data-part='acc']")).toHaveAttribute("data-active", "true");
  await check();
});

test("opens a drawing over the page and closes it with Escape", async ({ page }) => {
  await page.goto(COURSE);
  await page.getByRole("button", { name: "Відкрити на весь екран: Петлі першого контуру, ізометрія" }).click();
  const dialog = page.getByRole("dialog", { name: "Петлі першого контуру, ізометрія · NRC, рис. 3-1" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("img", { name: "Петлі першого контуру, ізометрія (NRC, рис. 3-1)" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("describes a picked position and explains an answer", async ({ page }) => {
  await page.goto(COURSE);
  await page.getByRole("button", { name: "5 Компенсатор тиску" }).click();
  await expect(page.getByRole("heading", { level: 4, name: "Поз. 5. Компенсатор тиску" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Поз. 1. Корпус реактора" })).toBeHidden();
  const question = page.getByRole("group", { name: "Запитання 1 з 8" });
  await question.getByRole("button", { name: "Дві" }).click();
  await expect(question.getByText("Правильно.")).toBeVisible();
  await expect(page.getByText("Відповідей: 1 з 8")).toBeVisible();
});

test("marks the module being read in the list of modules", async ({ page }) => {
  await page.goto(COURSE);
  const modules = page.getByRole("navigation", { name: "Модулі курсу" });
  await expect(modules.getByRole("link", { name: "1 Вступ" })).toHaveAttribute("aria-current", "location");
  await page.evaluate(() => document.getElementById("bezpeka")?.scrollIntoView({ behavior: "instant" }));
  await expect(modules.getByRole("link", { name: "4 Системи безпеки" })).toHaveAttribute("aria-current", "location");
  await expect(modules.getByRole("link", { name: "1 Вступ" })).not.toHaveAttribute("aria-current");
});
