/** Client-safe practice constants. Validation lives in practice-schema.ts (server only). */
export const practiceKinds = ["breathing", "grounding", "body-scan", "calm"] as const;
export type PracticeKind = (typeof practiceKinds)[number];

export const feelings = [
  { id: "calmer", label: "Calmer" },
  { id: "same", label: "About the same" },
  { id: "unsure", label: "Not sure" },
] as const;
export type FeltAfter = (typeof feelings)[number]["id"];

export const practiceLabels: Record<PracticeKind, string> = {
  breathing: "Breathing",
  grounding: "Grounding",
  "body-scan": "Body scan",
  calm: "Calm now",
};
