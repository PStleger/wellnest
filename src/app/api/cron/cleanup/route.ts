import { and, eq, lt } from "drizzle-orm";

import { db } from "@/lib/db";
import { rateLimit, user } from "@/lib/db/schema";

/** Daily Vercel Cron: removes guest nests older than a week (cascade deletes their data). */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const removed = await db
    .delete(user)
    .where(and(eq(user.isAnonymous, true), lt(user.createdAt, cutoff)))
    .returning({ id: user.id });

  await db.delete(rateLimit).where(lt(rateLimit.resetAt, new Date()));

  return Response.json({ removed: removed.length });
}
