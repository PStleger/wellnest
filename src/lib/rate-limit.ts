import "server-only";

import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/lib/db";
import { rateLimit } from "@/lib/db/schema";

/**
 * Better Auth only rate-limits its HTTP handler; our Server Actions call it directly,
 * so they are limited here instead. One atomic upsert per check, safe under concurrency.
 */
export async function consume(
  key: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number },
) {
  const [row] = await db
    .insert(rateLimit)
    .values({ key, count: 1, resetAt: sql`now() + make_interval(secs => ${windowSeconds})` })
    .onConflictDoUpdate({
      target: rateLimit.key,
      set: {
        count: sql`case when ${rateLimit.resetAt} < now() then 1 else ${rateLimit.count} + 1 end`,
        resetAt: sql`case when ${rateLimit.resetAt} < now() then now() + make_interval(secs => ${windowSeconds}) else ${rateLimit.resetAt} end`,
      },
    })
    .returning({ count: rateLimit.count });
  return (row?.count ?? 0) <= limit;
}

export async function clientIp() {
  const list = await headers();
  return list.get("x-real-ip") ?? list.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

/** Emails are hashed so the table never stores them. */
export function hashKey(value: string) {
  return createHash("sha256").update(value.toLowerCase()).digest("base64url").slice(0, 32);
}
