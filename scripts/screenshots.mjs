// Takes the pictures of the README and the docs from a running app
import { mkdir, writeFile } from "node:fs/promises";
import process from "node:process";

import { chromium } from "@playwright/test";

// Where the app runs, where the pictures go and how long the page settles
const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = new URL("../docs/images/", import.meta.url);
const SETTLE = 800;
const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

// Saves a picture next to the others
const save = (name, buffer) => writeFile(new URL(name, OUT), buffer);

// A page with its fonts loaded and settled, ready for a picture
const open = async (browser, device, path) => {
  const context = await browser.newContext({ ...device, locale: "uk-UA", reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(new URL(path, BASE).href);
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(SETTLE);
  return page;
};

// Takes a picture of the window and closes it
const shoot = async (page, name, options = {}) => {
  await save(name, await page.screenshot({ type: "jpeg", quality: 85, ...options }));
  await page.context().close();
};

const SHOTS = [
  // The whole home page on a wide screen
  async (browser) => shoot(await open(browser, DESKTOP, "/"), "home.jpg", { fullPage: true }),
  // The first screen with the reactors open in the menu
  async (browser) => {
    const page = await open(browser, DESKTOP, "/");
    await page.getByRole("button", { name: "Реактори" }).click();
    await page.waitForTimeout(SETTLE);
    await shoot(page, "menu.jpg");
  },
  // A topic page with the other topics of its section
  async (browser) => shoot(await open(browser, DESKTOP, "/reaktory/vver-1000"), "topic.jpg"),
  // Phones: the first screen and the open menu
  async (browser) => shoot(await open(browser, PHONE, "/"), "mobile.jpg"),
  async (browser) => {
    const page = await open(browser, PHONE, "/reaktory/vver-1000");
    await page.getByRole("button", { name: "Відкрити меню" }).click();
    await page.waitForTimeout(SETTLE);
    await shoot(page, "mobile-menu.jpg");
  },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  await SHOTS.reduce((previous, shot) => previous.then(() => shot(browser)), Promise.resolve());
  process.stdout.write(`Saved ${SHOTS.length} pictures in docs/images.\n`);
} finally {
  await browser.close();
}
