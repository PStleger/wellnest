import { expect, test } from "@playwright/test";

import { choose, expectAccessible, startDemo } from "./helpers";

test("grounding walks through all five senses", async ({ page }) => {
  await page.goto("/practices/grounding");
  for (const count of [5, 4, 3, 2, 1]) {
    await expect(page.getByText(String(count), { exact: true }).first()).toBeVisible();
    for (let tap = 0; tap < count; tap++) {
      await page.getByRole("button", { name: "I noticed one" }).click();
    }
  }
  await expect(page.getByRole("heading", { name: "You’re here." })).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("How do you feel now?")).toBeVisible();
  await page.getByRole("button", { name: "Calmer" }).click();
  await expect(page.getByRole("button", { name: "Calmer" })).toHaveAttribute("aria-pressed", "true");
  // Signed out: the practice isn't saved, and we say so kindly.
  await expect(page.getByRole("link", { name: "Create a free account" })).toBeVisible();
  await expectAccessible(page);
});

test("a soundscape keeps playing across pages until stopped", async ({ page, isMobile }) => {
  await page.goto("/practices");
  await page.getByRole("button", { name: /soft rain/i }).click();
  const player = page.getByRole("region", { name: "Soundscape player" });
  await expect(player).toContainText("Soft rain");

  // Navigate in-app (a full reload would end any page's audio).
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Library" }).click();
  await expect(page).toHaveURL(/\/library$/);
  await expect(player).toBeVisible();

  await player.getByRole("button", { name: "Stop after 15 minutes" }).click();
  await expect(player).toContainText("stops in 15 min");
  await player.getByRole("button", { name: "Stop Soft rain" }).click();
  await expect(player).toHaveCount(0);
});

test("calm now starts breathing by itself in a night palette", async ({ page }) => {
  await page.goto("/calm");
  await expect(page.getByText("Get comfortable")).toBeVisible();
  const scheme = await page
    .locator(".scheme-dark")
    .first()
    .evaluate((node) => getComputedStyle(node).colorScheme);
  expect(scheme).toBe("dark");
  await expect(page.getByRole("link", { name: "Talk to someone" })).toHaveAttribute(
    "href",
    "https://findahelpline.com",
  );
});

test("the daily reminder downloads as a calendar event", async ({ request }) => {
  const response = await request.get("/api/reminder?time=07:30");
  expect(response.headers()["content-type"]).toContain("text/calendar");
  const body = await response.text();
  expect(body).toContain("RRULE:FREQ=DAILY");
  expect(body).toMatch(/DTSTART:\d{8}T073000\r\n/);
  expect((await request.get("/api/reminder?time=25:00")).status()).toBe(400);
});

test.describe("signed in", () => {
  test.beforeEach(async ({ page }) => {
    await startDemo(page);
  });

  test("practice minutes show up in insights", async ({ page }) => {
    await page.goto("/insights");
    const tile = page.locator("dl > div").filter({ hasText: "Practice" });
    await expect(tile).toContainText(/\d+ min/);
    await expect(tile).toContainText(/calmer after \d+%/);
  });

  test("the motion setting applies immediately and persists", async ({ page }) => {
    await page.goto("/settings");
    await page.locator("label").filter({ hasText: "Reduce motion" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
    await page.locator("label").filter({ hasText: "Follow my device" }).click();
    await expect(page.locator("html")).not.toHaveAttribute("data-motion", /./);
  });

  test("a check-in ends with gentle suggestions", async ({ page }) => {
    await page.goto("/check-in");
    await page
      .locator("label:visible")
      .filter({ hasText: /^overwhelmed$/ })
      .click();
    await page.getByRole("button", { name: "Begin" }).click();
    await page.getByRole("button", { name: /skip for now/i }).click();
    await page.getByRole("button", { name: /skip for now/i }).click();
    await choose(page, "Throat");
    await page.getByRole("button", { name: "Continue" }).click();
    await choose(page, "deep blue");
    await page.getByRole("button", { name: "Continue" }).click();
    await choose(page, "Stone");
    await page.getByRole("button", { name: "Continue" }).click();
    await choose(page, /^Heavy/);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Intensity").fill("9");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "I'm ready" }).click();
    await page.getByRole("button", { name: /it feels the same/i }).click();

    await expect(page.getByRole("heading", { name: "What might help next?" })).toBeVisible();
    await expect(page.getByRole("link", { name: /slow everything down/i })).toHaveAttribute("href", "/calm");
    await expect(page.getByRole("link", { name: /come back to the room/i })).toBeVisible();
    await expectAccessible(page);
  });
});
