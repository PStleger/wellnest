import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageTransition } from "@/components/motion/page-transition";
import { BreathePage } from "@/components/practice/breathe-page";
import { breathPatterns } from "@/lib/somatic/breathing";

export function generateStaticParams() {
  return breathPatterns.map((pattern) => ({ pattern: pattern.id }));
}

export async function generateMetadata({ params }: PageProps<"/breathe/[pattern]">): Promise<Metadata> {
  const { pattern: id } = await params;
  const pattern = breathPatterns.find((item) => item.id === id);
  if (!pattern) return {};
  return {
    title: `${pattern.name}: a guided breathing pacer`,
    description: `${pattern.tagline}. ${pattern.description}`.slice(0, 158),
    alternates: { canonical: `/breathe/${pattern.id}` },
  };
}

export default async function BreathePatternPage({ params }: PageProps<"/breathe/[pattern]">) {
  const { pattern: id } = await params;
  const pattern = breathPatterns.find((item) => item.id === id);
  if (!pattern) notFound();

  return (
    <PageTransition>
      <BreathePage pattern={pattern} />
    </PageTransition>
  );
}
