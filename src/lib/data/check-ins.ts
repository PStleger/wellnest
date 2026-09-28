import "server-only";

import { and, desc, eq, gte } from "drizzle-orm";

import { db } from "@/lib/db";
import { checkIn } from "@/lib/db/schema";
import { isUuid } from "@/lib/ids";
import { requireUser } from "@/lib/session";
import type { CheckInInput } from "@/lib/somatic/types";

export async function createCheckIn(input: CheckInInput) {
  const user = await requireUser();
  const [row] = await db
    .insert(checkIn)
    .values({
      userId: user.id,
      feeling: input.feeling,
      emotions: input.emotions,
      before: input.before,
      after: input.after,
      intensityBefore: input.before.intensity,
      intensityAfter: input.after?.intensity ?? null,
      breathingRounds: input.breathingRounds,
      completedBodyScan: input.completedBodyScan,
      durationSeconds: input.durationSeconds,
    })
    .returning({ id: checkIn.id });
  return row!;
}

export async function listCheckIns({ limit = 50, since }: { limit?: number; since?: Date } = {}) {
  const user = await requireUser();
  return db
    .select()
    .from(checkIn)
    .where(and(eq(checkIn.userId, user.id), since ? gte(checkIn.createdAt, since) : undefined))
    .orderBy(desc(checkIn.createdAt))
    .limit(limit);
}

export async function getCheckIn(id: string) {
  const user = await requireUser();
  if (!isUuid(id)) return null;
  const [row] = await db
    .select()
    .from(checkIn)
    .where(and(eq(checkIn.id, id), eq(checkIn.userId, user.id)))
    .limit(1);
  return row ?? null;
}

export async function deleteCheckIn(id: string) {
  const user = await requireUser();
  if (!isUuid(id)) return false;
  const deleted = await db
    .delete(checkIn)
    .where(and(eq(checkIn.id, id), eq(checkIn.userId, user.id)))
    .returning({ id: checkIn.id });
  return deleted.length > 0;
}
