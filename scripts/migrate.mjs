// Applies pending Drizzle migrations. Runs before `next build` on Vercel so a
// fresh deploy with a new database works without any manual steps.
import nextEnv from "@next/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

nextEnv.loadEnvConfig(process.cwd());

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!url) {
  console.warn("[migrate] DATABASE_URL is not set, skipping migrations.");
  process.exit(0);
}

const ca = process.env.DATABASE_CA_CERT?.replaceAll("\\n", "\n");
const pool = new pg.Pool({ connectionString: url, max: 1, ...(ca && { ssl: { ca } }) });

try {
  await migrate(drizzle({ client: pool }), { migrationsFolder: "./drizzle" });
  console.log("[migrate] Database is up to date.");
} catch (error) {
  console.error("[migrate] Failed:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
