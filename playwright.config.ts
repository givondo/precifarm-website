import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end checks against a production build: routes, overflow, accessibility, navigation
 * and forms (with the API mocked, so nothing reaches the CMS or M-Pesa).
 *
 *   npm run build && npm run test:e2e
 *
 * First run on a new machine: `npx playwright install chromium`. Where that download is not
 * possible, point PLAYWRIGHT_CHROMIUM_EXECUTABLE at an installed Chrome or Chromium.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100);
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`,
    reducedMotion: "reduce",
    launchOptions: { executablePath, args: executablePath ? ["--no-sandbox"] : [] },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
