import { ImageResponse } from "next/og";

import { OgCard } from "@/components/og/og-card";
import { articles, getArticle } from "@/content/library/articles";

export const alt = "A WellNest library guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return new ImageResponse(
    <OgCard
      eyebrow={`WellNest library · ${article?.category ?? "Guide"}`}
      title={article?.title ?? "WellNest library"}
      footer={article ? `${article.readingMinutes} minute read` : "wellnest"}
    />,
    size,
  );
}
