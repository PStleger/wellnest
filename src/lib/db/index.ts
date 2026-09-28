import "server-only";

import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env.local and point it at a Postgres database.",
  );
}

// Hosts like Supabase sign their certificates with a private CA. Given its PEM,
// connections use TLS and verify the server against it.
const ca = process.env.DATABASE_CA_CERT?.replaceAll("\\n", "\n");

// Reuse one pool across hot reloads in development.
const globalForDb = globalThis as unknown as { wellnestPool?: Pool };

const pool =
  globalForDb.wellnestPool ??
  new Pool({
    connectionString,
    max: process.env.VERCEL ? 5 : 10,
    ...(ca && { ssl: { ca } }),
  });

if (process.env.NODE_ENV !== "production") globalForDb.wellnestPool = pool;

// On Vercel Fluid compute this closes idle clients before an instance is suspended.
attachDatabasePool(pool);

export const db = drizzle({ client: pool, schema, casing: "snake_case" });
export { schema };
