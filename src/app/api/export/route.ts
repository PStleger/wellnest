import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { bookmark, checkIn, journalEntry } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";

/** Everything we hold about the signed-in person, as a JSON download. */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Not signed in" }, { status: 401 });

  const [checkIns, entries, bookmarks] = await Promise.all([
    db.select().from(checkIn).where(eq(checkIn.userId, user.id)).orderBy(asc(checkIn.createdAt)),
    db
      .select({
        id: journalEntry.id,
        title: journalEntry.title,
        body: journalEntry.body,
        prompt: journalEntry.prompt,
        checkInId: journalEntry.checkInId,
        createdAt: journalEntry.createdAt,
        updatedAt: journalEntry.updatedAt,
      })
      .from(journalEntry)
      .where(eq(journalEntry.userId, user.id))
      .orderBy(asc(journalEntry.createdAt)),
    db
      .select({ slug: bookmark.slug, createdAt: bookmark.createdAt })
      .from(bookmark)
      .where(eq(bookmark.userId, user.id)),
  ]);

  const body = {
    exportedAt: new Date().toISOString(),
    profile: { name: user.name, email: user.email || null, guest: user.isGuest },
    checkIns: checkIns.map(({ userId: _userId, ...row }) => row),
    journal: entries,
    bookmarks,
  };

  const date = body.exportedAt.slice(0, 10);
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="wellnest-export-${date}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
