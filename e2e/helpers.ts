import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

/** Fails the test with a readable list if axe finds any WCAG 2.2 AA violation. */
export async function expectAccessible(page: Page) {
  // Let entrance animations finish so contrast is measured on the settled page.
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        // Only time-based, finite animations; scroll-driven reveals finish only when scrolled.
        .filter(
          (animation) =>
            animation.timeline instanceof DocumentTimeline &&
            animation.effect?.getComputedTiming().iterations !== Infinity,
        )
        .map((animation) => animation.finished.catch(() => undefined)),
    ),
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  const summary = results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} (${violation.nodes.map((node) => node.target.join(" ")).join(", ")})`,
  );
  expect(summary).toEqual([]);
}

export async function startDemo(page: Page) {
  await page.goto("/");
  await page
    .getByRole("button", { name: /try the demo/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/nest$/, { timeout: 30_000 });
}

/** Clicks the visible label wrapping a visually hidden radio or checkbox, like a person would. */
export function choose(page: Page, name: string | RegExp) {
  return page
    .locator("label:visible")
    .filter({ has: page.getByRole("radio", { name }) })
    .first()
    .click();
}
