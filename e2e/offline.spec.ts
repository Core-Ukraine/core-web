import { expect, test } from "@playwright/test";

test("tells the visitor when the connection drops and when it is back", async ({ page, context }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Next.js tells only a hydrated page that the connection dropped
  await page.waitForLoadState("networkidle");
  const notice = page.getByRole("status").filter({ hasText: "Немає звʼязку" });
  await expect(notice).toHaveCount(0);
  await context.setOffline(true);
  await expect(notice).toBeVisible();
  await context.setOffline(false);
  await expect(notice).toHaveCount(0);
});

test("shows its own page when a reload fails offline and returns once online", async ({ page, context }) => {
  await page.goto("/reaktory");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // The worker keeps the offline page once it is active
  await expect.poll(() => page.evaluate(async () => Boolean(await caches.match("/offline")))).toBe(true);
  await context.setOffline(true);
  await page.reload();
  const offline = page.getByRole("heading", { level: 1, name: "Немає звʼязку" });
  await expect(offline).toBeVisible();
  await expect(page.getByRole("link", { name: "Спробувати ще раз" })).toBeVisible();
  await context.setOffline(false);
  await expect(offline).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Реактори");
});
