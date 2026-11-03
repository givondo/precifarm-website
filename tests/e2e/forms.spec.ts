import { expect, test, type Page } from "@playwright/test";

/** The API is mocked in every test here: nothing reaches the CMS, and no M-Pesa request is made. */
async function fillContact(page: Page) {
  await page.goto("/contact");
  const form = page.locator("form").filter({ has: page.locator('textarea[name="message"]') });
  await form.locator('[name="name"]').fill("Test Visitor");
  await form.locator('[name="email"]').fill("test@example.com");
  await form.locator('[name="message"]').fill("Automated test message. Please ignore.");
  return form;
}

test("contact form shows success when the API accepts", async ({ page }) => {
  let sent: Record<string, unknown> | null = null;
  await page.route("**/api/contact", async (route) => {
    sent = route.request().postDataJSON();
    await route.fulfill({ status: 201, json: { id: "test", received: true } });
  });
  const form = await fillContact(page);
  await form.locator('button[type="submit"]').click();
  await expect(page.getByText("Message sent")).toBeVisible();
  expect(sent).not.toBeNull();
  expect(sent!.website, "honeypot stays empty for a real visitor").toBe("");
});

test("contact form announces a rate-limit error", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 429, json: { error: "Too many messages. Please wait a few minutes or email us directly." } }),
  );
  const form = await fillContact(page);
  await form.locator('button[type="submit"]').click();
  // Next.js renders its own empty role=alert route announcer, so match the form's alert by text.
  await expect(page.getByRole("alert").filter({ hasText: "Too many messages" })).toBeVisible();
});

test("honeypot field is hidden and skipped by keyboard", async ({ page }) => {
  await page.goto("/contact");
  const trap = page.locator('input[name="website"]');
  await expect(trap).toHaveAttribute("tabindex", "-1");
  const box = await trap.boundingBox();
  expect(box === null || box.x + box.width < 0, "positioned off-screen").toBe(true);
});
