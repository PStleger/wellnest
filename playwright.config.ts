import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3200);
const baseURL = `http://localhost:${PORT}`;
const databaseUrl = process.env.E2E_DATABASE_URL ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  globalSetup: "./e2e/global-setup.ts",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    timezoneId: "Europe/London",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] }, testMatch: /(public|demo|practices)\.spec\.ts/ },
  ],
  webServer: {
    command: `pnpm build && pnpm start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: {
      DATABASE_URL: databaseUrl,
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ?? "e2e-secret-e2e-secret-e2e-secret-e2e",
      BETTER_AUTH_URL: baseURL,
      NEXT_PUBLIC_SITE_URL: baseURL,
      // Every test shares one address; keep the demo cap out of the way (it's tested separately).
      DEMO_LIMIT_PER_HOUR: "10000",
    },
  },
});
