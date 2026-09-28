"use server";

import { revalidatePath } from "next/cache";

import { setBookmark } from "@/lib/data/bookmarks";

export async function toggleBookmark(slug: string, saved: boolean) {
  await setBookmark(slug, saved);
  revalidatePath("/saved");
  revalidatePath("/nest");
  revalidatePath(`/library/${slug}`);
}
