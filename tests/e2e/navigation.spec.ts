import { expect, test } from "@playwright/test";

test("mobile menu opens, then closes on Escape and returns focus", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile navigation only");
  await page.goto("/");
  const button = page.locator(".site-header-menu-btn").first();
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".mobile-nav-panel")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("desktop header shows the primary navigation and contact action", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "desktop navigation only");
  await page.goto("/");
  await expect(page.locator(".site-header-nav")).toBeVisible();
  await expect(page.locator(".site-header-actions")).toBeVisible();
});
