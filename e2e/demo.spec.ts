import { expect, test } from "@playwright/test";

import { choose, expectAccessible, startDemo } from "./helpers";

test.describe("guest demo", () => {
  test.beforeEach(async ({ page }) => {
    await startDemo(page);
  });

  test("opens a pre-filled nest", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Your nest" })).toBeVisible();
    await expect(page.getByText(/good (morning|afternoon|evening)|still up/i)).toBeVisible();
    await expect(page.getByText("You’re exploring a demo nest")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recent check-ins" })).toBeVisible();
    await expectAccessible(page);
  });

  for (const path of ["/journal", "/insights", "/saved", "/settings"]) {
    test(`${path} has no accessibility violations`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectAccessible(page);
    });
  }

  test("completes a full check-in and writes about it", async ({ page }) => {
    await page.goto("/check-in");
    await page.getByLabel("In your own words").fill("Buzzing before a presentation");
    await page
      .locator("label:visible")
      .filter({ hasText: /^anxious$/ })
      .click();
    await page.getByRole("button", { name: "Begin" }).click();

    await expect(page.getByRole("heading", { level: 1, name: /slow breaths/i })).toBeFocused();
    await page.getByRole("button", { name: /skip for now/i }).click();
    await page.getByRole("button", { name: /skip for now/i }).click();

    await choose(page, "Stomach");
    await page.getByRole("button", { name: "Continue" }).click();
    await choose(page, "amber");
    await page.getByRole("button", { name: "Continue" }).click();
    await choose(page, "Flutter");
    await page.getByRole("button", { name: "Continue" }).click();
    await choose(page, /^Tingly/);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Intensity").fill("8");
    await page.getByRole("button", { name: "Continue" }).click();

    await expectAccessible(page);
    await page.getByRole("button", { name: "I'm ready" }).click();
    await page.getByRole("button", { name: /something shifted/i }).click();
    await page.getByLabel("Strength now").fill("5");
    await page.getByRole("button", { name: "See my check-in" }).click();

    await expect(page.getByText("Saved to your nest")).toBeVisible();
    await expect(page.getByText("It eased by 3")).toBeVisible();

    await page.getByRole("link", { name: "Write about it" }).click();
    await expect(page.getByText("Writing about your check-in")).toBeVisible();
    await page.getByLabel("Title").fill("Presentation nerves");
    await page.getByLabel("Entry").fill("The flutter settled once I let the out-breath be longer.");
    await page.getByRole("button", { name: "Save entry" }).click();

    await expect(page.getByRole("heading", { level: 1, name: "Presentation nerves" })).toBeVisible();
    await expect(page.getByText("From a check-in")).toBeVisible();
  });

  test("searches the journal with highlighted matches", async ({ page }) => {
    await page.goto("/journal");
    await page.getByRole("searchbox", { name: "Search your journal" }).fill("throat");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/q=throat/);
    await expect(page.getByRole("heading", { name: "The lump in my throat" })).toBeVisible();
    await expect(page.locator("mark").first()).toHaveText(/throat/i);
  });

  test("edits and deletes a journal entry", async ({ page }) => {
    await page.goto("/journal");
    await page.getByRole("link", { name: /fizzing hands/i }).click();
    await page.getByRole("link", { name: "Edit" }).click();
    await page.getByLabel("Title").fill("Fizzing hands, revisited");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Fizzing hands, revisited" })).toBeVisible();

    await page.getByRole("button", { name: "Delete entry" }).click();
    const dialog = page.getByRole("dialog", { name: "Delete entry?" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Delete" }).click();
    await expect(page).toHaveURL(/\/journal$/);
    await expect(page.getByRole("link", { name: /fizzing hands/i })).toHaveCount(0);
  });
});
