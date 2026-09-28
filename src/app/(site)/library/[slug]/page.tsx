import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookmarkButton } from "@/components/library/bookmark-button";
import { PageTransition } from "@/components/motion/page-transition";
import { LinkButton } from "@/components/ui/button";
import { articles, getArticle } from "@/content/library/articles";
import { isBookmarked } from "@/lib/data/bookmarks";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/library/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/library/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      authors: [site.author.name],
      section: article.category,
    },
  };
}

async function Bookmark({ slug }: { slug: string }) {
  const saved = await isBookmarked(slug);
  if (saved === null) {
    return (
      <LinkButton href={`/sign-in?next=/library/${slug}`} variant="secondary">
        Sign in to save
      </LinkButton>
    );
  }
  return <BookmarkButton slug={slug} saved={saved} />;
}

export default async function ArticlePage({ params }: PageProps<"/library/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { default: Content } = await import(`@/content/library/${slug}.mdx`);
  const index = articles.indexOf(article);
  const nextArticle = articles[(index + 1) % articles.length]!;
  const published = new Date(`${article.publishedAt}T09:00:00Z`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    articleSection: article.category,
    author: { "@type": "Person", name: site.author.name, url: site.author.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/library/${article.slug}`,
  };

  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Link
          href="/library"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Library
        </Link>

        <header className="mt-6">
          <p className="text-sm font-semibold text-sage">{article.category}</p>
          <h1 className="mt-3 text-4xl leading-[1.08] sm:text-6xl">{article.title}</h1>
          <p className="mt-5 text-xl text-ink-muted">{article.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-4 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" /> {article.readingMinutes} min read
            </span>
            <time dateTime={article.publishedAt}>
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(published)}
            </time>
            <div className="ml-auto">
              <Suspense fallback={null}>
                <Bookmark slug={article.slug} />
              </Suspense>
            </div>
          </div>
        </header>

        <div className="prose-calm mt-10">
          <Content />
        </div>

        {article.practice ? (
          <aside className="mt-14 flex flex-col items-start gap-4 rounded-(--radius-card) bg-ink p-7 text-canvas sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl">Ready to try it?</p>
            <Link
              href={article.practice.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-canvas px-6 font-semibold text-ink hover:opacity-90"
            >
              {article.practice.label} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </aside>
        ) : null}

        <nav aria-label="Keep reading" className="mt-14 border-t border-line pt-8">
          <p className="text-sm text-ink-muted">Keep reading</p>
          <Link
            href={`/library/${nextArticle.slug}`}
            className="group mt-2 flex items-center justify-between gap-4"
          >
            <span className="font-display text-2xl group-hover:underline group-hover:underline-offset-4">
              {nextArticle.title}
            </span>
            <ArrowRight
              className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </nav>
      </article>
    </PageTransition>
  );
}
