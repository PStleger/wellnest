"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createJournalEntry, deleteJournalEntry, updateJournalEntry } from "@/lib/data/journal";

export type EntryFormState = {
  message?: string;
  fieldErrors?: Partial<Record<"title" | "body", string[]>>;
  values?: { title: string; body: string };
};

const entrySchema = z.object({
  title: z.string().trim().max(120, "Keep the title under 120 characters."),
  body: z.string().trim().min(1, "Write a few words first.").max(20_000, "That entry is too long to save."),
  prompt: z.string().trim().max(200).optional(),
  checkInId: z
    .uuid()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

/** An empty title falls back to the first few words of the entry. */
function titleFor(title: string, body: string) {
  if (title) return title;
  const words = body.split(/\s+/).slice(0, 6).join(" ");
  return words.length < body.length ? `${words}…` : words;
}

function readForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
    prompt: formData.get("prompt") ? String(formData.get("prompt")) : undefined,
    checkInId: formData.get("checkInId") ? String(formData.get("checkInId")) : undefined,
  };
}

export async function createEntry(_prev: EntryFormState, formData: FormData): Promise<EntryFormState> {
  const raw = readForm(formData);
  const parsed = entrySchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values: raw };
  }

  const { title, body, prompt, checkInId } = parsed.data;
  const { id } = await createJournalEntry({ title: titleFor(title, body), body, prompt, checkInId });
  revalidatePath("/journal");
  revalidatePath("/nest");
  redirect(`/journal/${id}`);
}

export async function updateEntry(
  id: string,
  _prev: EntryFormState,
  formData: FormData,
): Promise<EntryFormState> {
  const raw = readForm(formData);
  const parsed = entrySchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values: raw };
  }

  const { title, body } = parsed.data;
  const updated = await updateJournalEntry(id, { title: titleFor(title, body), body });
  if (!updated) return { message: "That entry no longer exists.", values: raw };
  revalidatePath("/journal");
  revalidatePath(`/journal/${id}`);
  revalidatePath("/nest");
  redirect(`/journal/${id}`);
}

export async function removeEntry(id: string) {
  await deleteJournalEntry(id);
  revalidatePath("/journal");
  revalidatePath("/nest");
  redirect("/journal");
}
