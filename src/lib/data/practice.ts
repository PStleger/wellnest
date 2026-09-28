import "server-only";

import { and, desc, eq, gte, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { practiceSession } from "@/lib/db/schema";
import { isUuid } from "@/lib/ids";
import { getCurrentUser, requireUser } from "@/lib/session";
import type { PracticeInput } from "@/lib/somatic/practice-schema";
import type { FeltAfter } from "@/lib/somatic/practices";

/** Returns null for signed-out visitors: practising never requires an account. */
export async function recordPractice(input: PracticeInput) {
  const user = await getCurrentUser();
  if (!user) return null;
  const [row] = await db
    .insert(practiceSession)
    .values({ userId: user.id, ...input })
    .returning({ id: practiceSession.id });
  return row ?? null;
}

export async function rateRecordedPractice(id: string, feltAfter: FeltAfter) {
  const user = await getCurrentUser();
  if (!user || !isUuid(id)) return false;
  const updated = await db
    .update(practiceSession)
    .set({ feltAfter })
    .where(and(eq(practiceSession.id, id), eq(practiceSession.userId, user.id)))
    .returning({ id: practiceSession.id });
  return updated.length > 0;
}

export async function practiceSummary(since: Date) {
  const user = await requireUser();
  const [totals] = await db
    .select({
      sessions: sql<number>`count(*)::int`,
      seconds: sql<number>`coalesce(sum(${practiceSession.durationSeconds}), 0)::int`,
      calmer: sql<number>`count(*) filter (where ${practiceSession.feltAfter} = 'calmer')::int`,
      rated: sql<number>`count(${practiceSession.feltAfter})::int`,
    })
    .from(practiceSession)
    .where(and(eq(practiceSession.userId, user.id), gte(practiceSession.createdAt, since)));
  return totals ?? { sessions: 0, seconds: 0, calmer: 0, rated: 0 };
}

export async function recentPractice(limit = 5) {
  const user = await requireUser();
  return db
    .select()
    .from(practiceSession)
    .where(eq(practiceSession.userId, user.id))
    .orderBy(desc(practiceSession.createdAt))
    .limit(limit);
}
