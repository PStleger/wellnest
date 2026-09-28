import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { getArticle } from "@/content/library/articles";
import { db } from "@/lib/db";
import { bookmark } from "@/lib/db/schema";
import { getCurrentUser, requireUser } from "@/lib/session";

export async function listBookmarks() {
  const user = await requireUser();
  const rows = await db
    .select({ slug: bookmark.slug, createdAt: bookmark.createdAt })
    .from(bookmark)
    .where(eq(bookmark.userId, user.id))
    .orderBy(desc(bookmark.createdAt));
  return rows.flatMap((row) => {
    const article = getArticle(row.slug);
    return article ? [{ ...article, savedAt: row.createdAt }] : [];
  });
}

/** Null when signed out, so public article pages can still render. */
export async function isBookmarked(slug: string) {
  const user = await getCurrentUser();
  if (!user) return null;
  const [row] = await db
    .select({ slug: bookmark.slug })
    .from(bookmark)
    .where(and(eq(bookmark.userId, user.id), eq(bookmark.slug, slug)))
    .limit(1);
  return Boolean(row);
}

export async function setBookmark(slug: string, saved: boolean) {
  const user = await requireUser();
  if (!getArticle(slug)) return false;
  if (saved) {
    await db.insert(bookmark).values({ userId: user.id, slug }).onConflictDoNothing();
  } else {
    await db.delete(bookmark).where(and(eq(bookmark.userId, user.id), eq(bookmark.slug, slug)));
  }
  return true;
}
