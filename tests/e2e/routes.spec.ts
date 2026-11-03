import { expect, test } from "@playwright/test";
import { PUBLIC_ROUTES } from "./public-routes";

for (const route of PUBLIC_ROUTES) {
  test(`${route} loads with one h1 and no sideways scroll`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(route, { waitUntil: "load" });
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("retired booking path redirects to charging", async ({ page }) => {
  await page.goto("/book");
  await expect(page).toHaveURL(/\/charging$/);
});

test("download page makes no chatbot, Play Store or iOS claim", async ({ page }) => {
  await page.goto("/download");
  const text = (await page.locator("main").innerText()).toLowerCase();
  expect(text).not.toMatch(/chatbot|play store|google play|app store|\bios\b|iphone/);
});
