/**
 * A small, non-judgemental vocabulary. Grouped loosely by energy so the chips
 * read as a spectrum rather than "good" and "bad" feelings.
 */
export const emotionGroups = [
  {
    label: "Charged",
    emotions: ["anxious", "angry", "overwhelmed", "restless", "frustrated", "excited"],
  },
  {
    label: "Heavy",
    emotions: ["sad", "tired", "lonely", "numb", "disappointed", "ashamed"],
  },
  {
    label: "Settled",
    emotions: ["calm", "content", "grateful", "hopeful", "curious", "connected"],
  },
] as const;

export type Emotion = (typeof emotionGroups)[number]["emotions"][number];

export const emotions = emotionGroups.flatMap((group) => group.emotions) as Emotion[];
