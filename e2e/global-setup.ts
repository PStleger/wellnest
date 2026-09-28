import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

/** Brings the test database up to date before any test runs. */
export default async function globalSetup() {
  const url = process.env.E2E_DATABASE_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("Set E2E_DATABASE_URL (or DATABASE_URL) to a disposable Postgres database.");
  const pool = new Pool({ connectionString: url, max: 1 });
  try {
    await migrate(drizzle({ client: pool }), { migrationsFolder: "./drizzle" });
    // Every test runs from the same address, so start each run with fresh rate-limit windows.
    await pool.query("truncate table rate_limit");
  } finally {
    await pool.end();
  }
}
