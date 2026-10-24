import { expect, test } from "@playwright/test";

test("opens the home page in Ukrainian", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Атомна енергетика: від ядра до турбіни");
});

for (const path of ["/nowhere", "/reaktory/nowhere", "/nowhere/deeper", "/Reaktory"]) {
  test(`answers ${path} with the missing page`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Сторінку не знайдено");
    await expect(page.getByRole("main").getByRole("link", { name: "На головну" })).toHaveAttribute("href", "/");
  });
}

test("answers the health check", async ({ request }) => {
  const response = await request.get("/healthz");
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe("ok\n");
});
