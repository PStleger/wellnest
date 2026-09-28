import "server-only";

import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { checkIn, journalEntry } from "@/lib/db/schema";
import { MATCH_END, MATCH_START } from "@/lib/search-markers";
import { isUuid } from "@/lib/ids";
import { requireUser } from "@/lib/session";

const HEADLINE_OPTIONS = `StartSel=${MATCH_START}, StopSel=${MATCH_END}, MaxWords=28, MinWords=12, MaxFragments=1`;

const listColumns = {
  id: journalEntry.id,
  title: journalEntry.title,
  body: journalEntry.body,
  createdAt: journalEntry.createdAt,
  checkInId: journalEntry.checkInId,
  before: checkIn.before,
  after: checkIn.after,
};

export async function listJournalEntries({ query, limit = 100 }: { query?: string; limit?: number } = {}) {
  const user = await requireUser();
  const q = query?.trim().slice(0, 200);

  if (!q) {
    return db
      .select(listColumns)
      .from(journalEntry)
      .leftJoin(checkIn, eq(journalEntry.checkInId, checkIn.id))
      .where(eq(journalEntry.userId, user.id))
      .orderBy(desc(journalEntry.createdAt))
      .limit(limit);
  }

  // websearch_to_tsquery accepts what people naturally type: quotes, "or", -exclusions.
  const tsQuery = sql`websearch_to_tsquery('english', ${q})`;
  return db
    .select({
      ...listColumns,
      headline: sql<string>`ts_headline('english', ${journalEntry.body}, ${tsQuery}, ${HEADLINE_OPTIONS})`,
    })
    .from(journalEntry)
    .leftJoin(checkIn, eq(journalEntry.checkInId, checkIn.id))
    .where(and(eq(journalEntry.userId, user.id), sql`${journalEntry.search} @@ ${tsQuery}`))
    .orderBy(sql`ts_rank(${journalEntry.search}, ${tsQuery}) desc`, desc(journalEntry.createdAt))
    .limit(limit);
}

export async function getJournalEntry(id: string) {
  const user = await requireUser();
  if (!isUuid(id)) return null;
  const [row] = await db
    .select({
      id: journalEntry.id,
      title: journalEntry.title,
      body: journalEntry.body,
      prompt: journalEntry.prompt,
      createdAt: journalEntry.createdAt,
      updatedAt: journalEntry.updatedAt,
      checkInId: journalEntry.checkInId,
      before: checkIn.before,
      after: checkIn.after,
    })
    .from(journalEntry)
    .leftJoin(checkIn, eq(journalEntry.checkInId, checkIn.id))
    .where(and(eq(journalEntry.id, id), eq(journalEntry.userId, user.id)))
    .limit(1);
  return row ?? null;
}

export async function createJournalEntry(input: {
  title: string;
  body: string;
  prompt?: string | null;
  checkInId?: string | null;
}) {
  const user = await requireUser();

  // Only link check-ins that belong to this user.
  let checkInId: string | null = null;
  if (input.checkInId) {
    const [owned] = await db
      .select({ id: checkIn.id })
      .from(checkIn)
      .where(and(eq(checkIn.id, input.checkInId), eq(checkIn.userId, user.id)))
      .limit(1);
    checkInId = owned?.id ?? null;
  }

  const [row] = await db
    .insert(journalEntry)
    .values({
      userId: user.id,
      title: input.title,
      body: input.body,
      prompt: input.prompt ?? null,
      checkInId,
    })
    .returning({ id: journalEntry.id });
  return row!;
}

export async function updateJournalEntry(id: string, input: { title: string; body: string }) {
  const user = await requireUser();
  if (!isUuid(id)) return false;
  const updated = await db
    .update(journalEntry)
    .set({ title: input.title, body: input.body })
    .where(and(eq(journalEntry.id, id), eq(journalEntry.userId, user.id)))
    .returning({ id: journalEntry.id });
  return updated.length > 0;
}

export async function deleteJournalEntry(id: string) {
  const user = await requireUser();
  if (!isUuid(id)) return false;
  const deleted = await db
    .delete(journalEntry)
    .where(and(eq(journalEntry.id, id), eq(journalEntry.userId, user.id)))
    .returning({ id: journalEntry.id });
  return deleted.length > 0;
}

export async function listEntriesForCheckIn(checkInId: string) {
  const user = await requireUser();
  if (!isUuid(checkInId)) return [];
  return db
    .select({ id: journalEntry.id, title: journalEntry.title })
    .from(journalEntry)
    .where(and(eq(journalEntry.checkInId, checkInId), eq(journalEntry.userId, user.id)))
    .orderBy(desc(journalEntry.createdAt));
}
