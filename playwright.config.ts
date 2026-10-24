import { existsSync } from "node:fs";

import { defineConfig, devices } from "@playwright/test";

const CI = Boolean(process.env.CI);
// Screenshots are compared on the Linux runners of CI only, see docs/testing.md
const VISUAL = CI || Boolean(process.env.VISUAL);
const SCREENSHOTS = "e2e/__screenshots__";
const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  snapshotPathTemplate: `${SCREENSHOTS}/{testFilePath}/{arg}{ext}`,
  // Until the first screenshots are committed, the visual tests only load the pages
  ignoreSnapshots: !existsSync(SCREENSHOTS),
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  use: {
    baseURL: BASE_URL,
    locale: "uk-UA",
    timezoneId: "Europe/Kyiv",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", testIgnore: /lighthouse|visual/, use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", testIgnore: /lighthouse|visual/, use: { ...devices["Pixel 7"] } },
    { name: "webkit", testIgnore: /lighthouse|visual/, use: { ...devices["Desktop Safari"] } },
    ...(VISUAL ? [{ name: "visual", testMatch: /visual\.spec\.ts/, use: { ...devices["Desktop Chrome"] } }] : []),
    {
      name: "lighthouse",
      testMatch: /lighthouse\.spec\.ts/,
      dependencies: ["desktop", "mobile", ...(VISUAL ? ["visual"] : [])],
    },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: `${BASE_URL}/healthz`,
    env: { SITE_URL: BASE_URL, NEXT_TELEMETRY_DISABLED: "1" },
    timeout: 300_000,
    reuseExistingServer: !CI,
  },
});
