"use server";

import { revalidatePath } from "next/cache";

import { createCheckIn } from "@/lib/data/check-ins";
import { checkInInputSchema } from "@/lib/somatic/types";

export type SaveCheckInResult = { ok: true; id: string } | { ok: false; message: string };

export async function saveCheckIn(input: unknown): Promise<SaveCheckInResult> {
  const parsed = checkInInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Some of this check-in didn't look right, so it wasn't saved." };
  }

  const { id } = await createCheckIn(parsed.data);
  revalidatePath("/nest");
  revalidatePath("/insights");
  return { ok: true, id };
}
