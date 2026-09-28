import { z } from "zod";

import { isHexColor } from "./colors";
import { emotions } from "./emotions";
import { bodyRegionIds } from "./regions";
import { presetShapeIds } from "./shapes";
import { textureIds } from "./textures";

/** A drawn shape: SVG path data inside a 100×100 viewBox, commands M/L/Q/Z only. */
const customPath = z
  .string()
  .max(6000)
  .regex(/^[MLQZ0-9.\s,-]+$/i, "Invalid shape path");

export const sensationSchema = z
  .object({
    region: z.enum(bodyRegionIds),
    color: z.string().refine(isHexColor, "Invalid colour"),
    shape: z.union([z.enum(presetShapeIds), z.literal("custom")]),
    customPath: customPath.optional(),
    texture: z.enum(textureIds),
    intensity: z.number().int().min(0).max(10),
  })
  .refine((value) => value.shape !== "custom" || Boolean(value.customPath), {
    message: "Draw a shape or pick one of the presets",
    path: ["customPath"],
  });

export type Sensation = z.infer<typeof sensationSchema>;

export const checkInInputSchema = z.object({
  feeling: z.string().trim().max(500),
  emotions: z.array(z.enum(emotions as [string, ...string[]])).max(6),
  before: sensationSchema,
  after: sensationSchema.nullable(),
  breathingRounds: z.number().int().min(0).max(30),
  completedBodyScan: z.boolean(),
  durationSeconds: z
    .number()
    .int()
    .min(0)
    .max(60 * 60 * 2),
});

export type CheckInInput = z.infer<typeof checkInInputSchema>;
