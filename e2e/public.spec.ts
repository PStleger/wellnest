import { expect, test } from "@playwright/test";

import { expectAccessible } from "./helpers";

const pages = [
  { path: "/", heading: /feel it/i },
  { path: "/how-it-works", heading: /meeting a feeling in the body/i },
  { path: "/breathe", heading: /take a slow breath/i },
  { path: "/practices", heading: /tools for right now/i },
  { path: "/practices/grounding", heading: /come back to your senses/i },
  { path: "/practices/body-scan", heading: /notice, without fixing/i },
  { path: "/calm", heading: /slow things down/i },
  { path: "/library", heading: /the practices, explained plainly/i },
  { path: "/library/box-breathing", heading: /box breathing/i },
  { path: "/about", heading: /three-week team project/i },
  { path: "/privacy", heading: /your inner life is yours/i },
  { path: "/sign-in", heading: /welcome back/i },
  { path: "/sign-up", heading: /make yourself a nest/i },
];

for (const { path, heading } of pages) {
  test(`${path} renders and has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page).toHaveTitle(/WellNest/);
    await expectAccessible(page);
  });
}

test("unknown pages show a friendly 404", async ({ page }) => {
  const response = await page.goto("/this-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /drifted off/i })).toBeVisible();
  await expectAccessible(page);
});

test("the skip link moves focus to the main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "Keyboard navigation is a desktop concern");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("app routes redirect signed-out visitors to sign in", async ({ page }) => {
  await page.goto("/journal");
  await expect(page).toHaveURL(/\/sign-in\?next=%2Fjournal/);
});

test("the breathing player counts in, guides, pauses and resumes", async ({ page }) => {
  await page.goto("/breathe/box");
  await expect(page.getByRole("heading", { level: 1, name: "Box breathing" })).toBeVisible();
  await expect(page.getByRole("radio", { name: "Box breathing" })).toBeChecked();
  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.getByText("Get comfortable")).toBeVisible();
  await expect(page.getByText("Breathe in")).toBeVisible({ timeout: 6000 });
  await expect(page.getByText(/Breath 1 of \d+/)).toBeVisible();
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("button", { name: "Resume" })).toBeVisible();
});

test("SEO files are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/library/felt-sense");
  const manifest = await request.get("/manifest.webmanifest");
  expect((await manifest.json()).short_name).toBe("WellNest");
});
