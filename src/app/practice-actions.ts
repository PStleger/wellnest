"use server";

import { revalidatePath } from "next/cache";

import { rateRecordedPractice, recordPractice } from "@/lib/data/practice";
import { practiceInputSchema, practiceRatingSchema } from "@/lib/somatic/practice-schema";

export async function logPractice(input: unknown) {
  const parsed = practiceInputSchema.safeParse(input);
  if (!parsed.success) return null;
  const row = await recordPractice(parsed.data);
  if (row) {
    revalidatePath("/nest");
    revalidatePath("/insights");
  }
  return row;
}

export async function ratePractice(input: unknown) {
  const parsed = practiceRatingSchema.safeParse(input);
  if (!parsed.success) return false;
  const ok = await rateRecordedPractice(parsed.data.id, parsed.data.feltAfter);
  if (ok) revalidatePath("/insights");
  return ok;
}
