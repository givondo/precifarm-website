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
    // html and body use overflow-x: clip, which hides overflow from scrollWidth while cutting content off.
    // So also look for content extending past the viewport that no scroll or clip container contains.
    const clipped = await page.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      const found: string[] = [];
      for (const el of document.querySelectorAll("main *")) {
        const box = el.getBoundingClientRect();
        if (box.width === 0 || box.right <= cw + 1) continue;
        let contained = false;
        for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
          if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(n).overflowX) && n.getBoundingClientRect().right <= cw + 1) {
            contained = true;
            break;
          }
        }
        if (!contained) found.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(box.right)}`);
        if (found.length >= 3) break;
      }
      return found;
    });
    expect(clipped, "content cut off at the right edge").toEqual([]);
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
