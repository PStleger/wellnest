import "server-only";

import { z } from "zod";

import { feelings, practiceKinds } from "./practices";

export const practiceInputSchema = z.object({
  kind: z.enum(practiceKinds),
  pattern: z.string().max(40).optional(),
  durationSeconds: z
    .number()
    .int()
    .min(5)
    .max(4 * 60 * 60),
});

export type PracticeInput = z.infer<typeof practiceInputSchema>;

export const practiceRatingSchema = z.object({
  id: z.uuid(),
  feltAfter: z.enum(feelings.map((feeling) => feeling.id) as ["calmer", "same", "unsure"]),
});
