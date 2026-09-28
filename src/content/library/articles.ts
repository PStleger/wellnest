export const articleCategories = [
  "Breathwork",
  "Body awareness",
  "Grounding",
  "Emotions",
  "Writing",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export type Article = {
  slug: string;
  title: string;
  /** One or two sentences. Used for cards, meta description and Open Graph. Max ~155 characters. */
  description: string;
  category: ArticleCategory;
  readingMinutes: number;
  /** ISO date, e.g. "2026-09-20" */
  publishedAt: string;
  /** Optional in-app practice that pairs with the article. */
  practice?: { label: string; href: "/breathe" | "/check-in" | "/journal/new" };
};

export const articles: Article[] = [
  {
    slug: "box-breathing",
    title: "Box breathing: a steady four-count rhythm",
    description:
      "In for four, hold for four, out for four, hold for four. How box breathing works, when it helps, and how to adapt it if breath holds feel uncomfortable.",
    category: "Breathwork",
    readingMinutes: 4,
    publishedAt: "2026-08-04",
    practice: { label: "Try box breathing", href: "/breathe" },
  },
  {
    slug: "physiological-sigh",
    title: "The physiological sigh: two breaths in, one long breath out",
    description:
      "A double inhale through the nose, then a long, slow exhale. What the research says about cyclic sighing, and how to use it when stress spikes.",
    category: "Breathwork",
    readingMinutes: 4,
    publishedAt: "2026-08-11",
    practice: { label: "Breathe with WellNest", href: "/breathe" },
  },
  {
    slug: "body-scan",
    title: "The body scan: noticing without fixing",
    description:
      "Move your attention from feet to head and notice what's there without trying to change it. How to do a body scan, and what to do if it's too much.",
    category: "Body awareness",
    readingMinutes: 4,
    publishedAt: "2026-08-18",
    practice: { label: "Start a check-in", href: "/check-in" },
  },
  {
    slug: "felt-sense",
    title: "Giving a feeling a colour, shape, and texture",
    description:
      "The core WellNest exercise, drawing on Gendlin's Focusing and somatic tracking, and why describing a feeling concretely makes it easier to stay with.",
    category: "Body awareness",
    readingMinutes: 4,
    publishedAt: "2026-08-25",
    practice: { label: "Start a check-in", href: "/check-in" },
  },
  {
    slug: "grounding-5-4-3-2-1",
    title: "5-4-3-2-1 grounding: coming back through your senses",
    description:
      "Five things you see, four you feel, three you hear, two you smell, one you taste: a simple sensory route back to the present when your mind is spinning.",
    category: "Grounding",
    readingMinutes: 4,
    publishedAt: "2026-09-01",
    practice: { label: "Start a check-in", href: "/check-in" },
  },
  {
    slug: "window-of-tolerance",
    title: "The window of tolerance: where you can feel and still think",
    description:
      "Dan Siegel's idea for making sense of overwhelm and shutdown, how your body shows which side of the window you're on, and small ways back in.",
    category: "Grounding",
    readingMinutes: 4,
    publishedAt: "2026-09-08",
  },
  {
    slug: "name-it-to-tame-it",
    title: "Name it to tame it: why putting feelings into words helps",
    description:
      "What research on affect labelling suggests, why a richer emotional vocabulary may help you cope, and a simple way to practise naming what you feel.",
    category: "Emotions",
    readingMinutes: 4,
    publishedAt: "2026-09-15",
    practice: { label: "Start a check-in", href: "/check-in" },
  },
  {
    slug: "expressive-writing",
    title: "Expressive writing after a hard day",
    description:
      "What decades of research on expressive writing suggest, how to try it in 15 minutes, prompts for a tough day, and how to know when to stop.",
    category: "Writing",
    readingMinutes: 4,
    publishedAt: "2026-09-22",
    practice: { label: "Write in your journal", href: "/journal/new" },
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
