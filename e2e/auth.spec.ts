import { expect, test } from "@playwright/test";

import { startDemo } from "./helpers";

const password = "a calm sentence";

test("signs up, signs out and signs back in", async ({ page }) => {
  const email = `e2e-${Date.now()}-${Math.round(Math.random() * 1e6)}@example.com`;

  await page.goto("/sign-up");
  await page.getByLabel("What should we call you?").fill("Robin");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/nest$/);
  await expect(page.getByText(/, Robin$/)).toBeVisible();
  await expect(page.getByText("Nothing here yet")).toBeVisible();

  await page.goto("/settings");
  await page.getByRole("button", { name: "Sign out" }).last().click();
  await expect(page.getByRole("heading", { level: 1, name: /feel it/i })).toBeVisible();

  // A signed-out visit to an app page returns there after signing in.
  await page.goto("/journal");
  await expect(page).toHaveURL(/\/sign-in\?next=%2Fjournal/);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("the wrong password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("That email and password don't match an account.")).toBeVisible();

  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/journal$/);
  await expect(page.getByRole("heading", { level: 1, name: "Journal" })).toBeVisible();
});

test("validates the sign-up form on the server", async ({ page }) => {
  await page.goto("/sign-up");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Password").fill("short");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Tell us what to call you.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Use at least 8 characters.")).toBeVisible();
  await expect(page.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
});

test("a guest keeps their demo data after creating an account", async ({ page }) => {
  await startDemo(page);
  await page.getByRole("link", { name: "Keep my nest" }).first().click();
  await page.getByLabel("What should we call you?").fill("Sam");
  await page.getByLabel("Email").fill(`guest-${Date.now()}@example.com`);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/nest$/);
  await expect(page.getByText("You’re exploring a demo nest")).toHaveCount(0);
  await expect(page.getByText("Grateful. Long dinner with friends.")).toBeVisible();
});

test("rate-limits repeated sign-in attempts for one account", async ({ page }) => {
  const email = `limited-${Date.now()}@example.com`;
  await page.goto("/sign-in");
  for (let attempt = 1; attempt <= 11; attempt++) {
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(`wrong password ${attempt}`);
    // Wait for this attempt's Server Action response before judging the message.
    await Promise.all([
      page.waitForResponse((response) => response.request().method() === "POST"),
      page.getByRole("button", { name: "Sign in" }).click(),
    ]);
    const expected = attempt <= 10 ? "don't match an account" : "Too many attempts";
    await expect(page.getByText(new RegExp(expected))).toBeVisible();
    // React resets the form after each action (the password clears); wait for that before typing again.
    await expect(page.getByLabel("Password")).toHaveValue("");
  }
});
