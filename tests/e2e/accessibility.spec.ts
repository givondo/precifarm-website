import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PUBLIC_ROUTES } from "./public-routes";

const WCAG = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

for (const route of PUBLIC_ROUTES) {
  test(`${route} has no automated WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: "load" });
    let axe = new AxeBuilder({ page }).withTags(WCAG);
    // Map pins overlap at the default zoom; the hub list is the equivalent control (WCAG 2.5.8 exception).
    // See docs/ui-modernisation/18-known-issues.md, K1.
    if (route === "/hub") axe = axe.disableRules(["target-size"]);
    const { violations } = await axe.analyze();
    expect(violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target.join(" ")}`)).toEqual([]);
  });
}

test("Agent hero workspace is labelled as an example, not a live run", async ({ page }) => {
  await page.goto("/agent");
  const mock = page.getByRole("figure", { name: /illustrative example/i });
  await expect(mock).toBeVisible();
  await expect(mock).toContainText(/example/i);
});
