import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageTransition } from "@/components/motion/page-transition";
import { articleCategories, articles } from "@/content/library/articles";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Short, careful guides to the practices behind WellNest: breathwork, body scans, grounding, naming feelings and expressive writing.",
  alternates: { canonical: "/library" },
};

const categoryTone: Record<string, string> = {
  Breathwork: "bg-sky-soft text-sky",
  "Body awareness": "bg-primary-soft text-primary",
  Grounding: "bg-sage-soft text-sage",
  Emotions: "bg-apricot/25 text-ink",
  Writing: "bg-surface-2 text-ink",
};

export default function LibraryPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Library</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">The practices, explained plainly</h1>
          <p className="mt-5 text-lg text-ink-muted">
            Eight short guides to what WellNest asks you to do and why, including what the research does and
            doesn&rsquo;t show. Each takes about four minutes.
          </p>
        </header>

        {articleCategories.map((category) => {
          const items = articles.filter((article) => article.category === category);
          if (!items.length) return null;
          const id = `category-${category.toLowerCase().replace(/\s/g, "-")}`;
          return (
            <section key={category} aria-labelledby={id} className="mt-16">
              <h2 id={id} className="text-3xl">
                {category}
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/library/${article.slug}`}
                      className="group flex h-full flex-col rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
                    >
                      <span
                        className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${categoryTone[category]}`}
                      >
                        {category}
                      </span>
                      <span className="mt-4 font-display text-2xl leading-tight">{article.title}</span>
                      <span className="mt-2 flex-1 text-ink-muted">{article.description}</span>
                      <span className="mt-5 flex items-center justify-between text-sm text-ink-muted">
                        {article.readingMinutes} min read
                        <ArrowRight
                          className="size-4 text-primary transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </PageTransition>
  );
}
