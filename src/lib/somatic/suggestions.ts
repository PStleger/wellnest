import type { Emotion } from "./emotions";

export type SuggestionIcon =
  "wind" | "footprints" | "pen" | "rain" | "moon" | "move" | "message" | "sparkles";

export type Suggestion = {
  id: string;
  title: string;
  body: string;
  icon: SuggestionIcon;
  /** A link, "journal" (this check-in's entry form), a soundscape to play, or just a tip. */
  target: { href: string } | { journal: true } | { soundscape: "rain" | "ocean" | "brown" } | { tip: true };
};

const charged: Emotion[] = ["anxious", "angry", "overwhelmed", "restless", "frustrated"];

type Context = {
  emotions: readonly string[];
  intensity: number;
  /** Local hour of day, 0–23. */
  hour: number;
  eased: boolean;
};

/**
 * Up to three gentle next steps, chosen from what someone just described.
 * Deliberately simple and explainable: no scoring the person can't see.
 */
export function suggestNext({ emotions, intensity, hour, eased }: Context): Suggestion[] {
  const has = (emotion: Emotion) => emotions.includes(emotion);
  const isCharged = charged.some(has);
  const options: [priority: number, suggestion: Suggestion][] = [];

  if (intensity >= 7 && !eased) {
    options.push([
      10,
      {
        id: "calm",
        title: "Slow everything down",
        body: "A minute of longer out-breaths in a quiet space.",
        icon: "wind",
        target: { href: "/calm" },
      },
    ]);
  }
  if (isCharged) {
    options.push([
      8,
      {
        id: "ground",
        title: "Come back to the room",
        body: "5-4-3-2-1 grounding through your senses.",
        icon: "footprints",
        target: { href: "/practices/grounding" },
      },
    ]);
  }
  if (hour >= 21 || hour < 5) {
    options.push([
      7,
      {
        id: "sleep",
        title: "Wind down for sleep",
        body: "The 4-7-8 rhythm, then soft rain with a sleep timer.",
        icon: "moon",
        target: { href: "/breathe/relax" },
      },
    ]);
  }
  if (has("lonely")) {
    options.push([
      7,
      {
        id: "connect",
        title: "Reach out to one person",
        body: "A short message to someone you trust can shift a heavy evening.",
        icon: "message",
        target: { tip: true },
      },
    ]);
  }
  if (has("numb") || has("tired")) {
    options.push([
      6,
      {
        id: "rain",
        title: "Rest with soft rain",
        body: "Let a soundscape play while you do nothing much at all.",
        icon: "rain",
        target: { soundscape: "rain" },
      },
    ]);
  }
  if (has("numb")) {
    options.push([
      6,
      {
        id: "move",
        title: "Move a little",
        body: "Shake out your hands, roll your shoulders, stretch for thirty seconds.",
        icon: "move",
        target: { href: "/practices/body-scan" },
      },
    ]);
  }
  if (has("sad") || has("disappointed") || has("ashamed") || intensity >= 5) {
    options.push([
      6,
      {
        id: "journal",
        title: "Write it out",
        body: "A few sentences while it's fresh. Prompts help if the page is blank.",
        icon: "pen",
        target: { journal: true },
      },
    ]);
  }
  if (!isCharged && intensity >= 3) {
    options.push([
      5,
      {
        id: "sigh",
        title: "Take two physiological sighs",
        body: "A double breath in, a long sigh out. Thirty seconds.",
        icon: "sparkles",
        target: { href: "/breathe/sigh" },
      },
    ]);
  }
  options.push([
    3,
    {
      id: "journal",
      title: "Write about it",
      body: "Capture what you noticed while it's fresh.",
      icon: "pen",
      target: { journal: true },
    },
  ]);
  options.push([
    2,
    {
      id: "breathe",
      title: "Keep breathing",
      body: "A few more slow minutes with the breathing orb.",
      icon: "wind",
      target: { href: "/breathe" },
    },
  ]);

  options.push([
    1,
    {
      id: "scan",
      title: "A two-minute body scan",
      body: "A gentle sweep from your feet to your head.",
      icon: "sparkles",
      target: { href: "/practices/body-scan" },
    },
  ]);

  const seen = new Set<string>();
  return options
    .toSorted((a, b) => b[0] - a[0])
    .map(([, suggestion]) => suggestion)
    .filter((suggestion) => (seen.has(suggestion.id) ? false : (seen.add(suggestion.id), true)))
    .slice(0, 3);
}
