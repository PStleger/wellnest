"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteCheckIn } from "@/lib/data/check-ins";

export async function removeCheckIn(id: string) {
  await deleteCheckIn(id);
  revalidatePath("/nest");
  revalidatePath("/insights");
  redirect("/nest");
}
