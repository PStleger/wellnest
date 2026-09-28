function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "WellNest",
  tagline: "Feel it where it lives.",
  description:
    "A somatic check-in and journal. Notice where a feeling sits in your body, give it a colour, shape and texture, and watch it shift.",
  url: resolveSiteUrl(),
  repo: "https://github.com/bensuz/wellnest",
  author: { name: "Elif Bensu Zorlu", url: "https://github.com/bensuz" },
} as const;
