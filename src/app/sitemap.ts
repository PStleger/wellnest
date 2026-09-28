import type { MetadataRoute } from "next";

import { articles } from "@/content/library/articles";
import { breathPatterns } from "@/lib/somatic/breathing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/how-it-works",
    "/practices",
    "/breathe",
    "/practices/grounding",
    "/practices/body-scan",
    "/calm",
    "/library",
    "/about",
    "/privacy",
    "/sign-up",
    "/sign-in",
  ];
  const latest = articles
    .map((article) => article.publishedAt)
    .toSorted()
    .at(-1);
  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: latest,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...breathPatterns.map((pattern) => ({
      url: `${site.url}/breathe/${pattern.id}`,
      lastModified: latest,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/library/${article.slug}`,
      lastModified: article.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
