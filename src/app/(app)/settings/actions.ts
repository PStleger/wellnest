"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user as userTable } from "@/lib/db/schema";
import { requireUser } from "@/lib/session";

export type NameFormState = { message?: string; ok?: boolean };

const nameSchema = z.string().trim().min(1, "Enter a name.").max(60, "Keep it under 60 characters.");

export async function updateName(_prev: NameFormState, formData: FormData): Promise<NameFormState> {
  const user = await requireUser();
  if (user.isGuest) return { message: "Create an account to set your name." };
  const parsed = nameSchema.safeParse(formData.get("name"));
  if (!parsed.success) return { message: parsed.error.issues[0]?.message };

  await auth.api.updateUser({ body: { name: parsed.data }, headers: await headers() });
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function deleteAccount() {
  const user = await requireUser();
  // End the session first so the cookie is cleared, then remove the user.
  // Every check-in, entry and bookmark goes with it (ON DELETE CASCADE).
  await auth.api.signOut({ headers: await headers() });
  await db.delete(userTable).where(eq(userTable.id, user.id));
  redirect("/");
}
