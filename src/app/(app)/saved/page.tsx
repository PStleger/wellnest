import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { EmptyState, PageHeader, Skeleton } from "@/components/app/page-header";
import { BookmarkButton } from "@/components/library/bookmark-button";
import { PageTransition } from "@/components/motion/page-transition";
import { LinkButton } from "@/components/ui/button";
import { listBookmarks } from "@/lib/data/bookmarks";

export const metadata: Metadata = {
  title: "Saved",
  description: "Library guides you saved for later.",
};

export default function SavedPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Saved"
        description="Guides you've kept for later."
        actions={
          <LinkButton href="/library" variant="secondary">
            Browse the library
          </LinkButton>
        }
      />
      <Suspense fallback={<Skeleton className="h-64" />}>
        <SavedList />
      </Suspense>
    </PageTransition>
  );
}

async function SavedList() {
  const saved = await listBookmarks();
  if (!saved.length) {
    return (
      <EmptyState
        title="Nothing saved yet"
        body="Tap “Save for later” on any guide in the library and it will wait for you here."
        action={<LinkButton href="/library">Browse the library</LinkButton>}
      />
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {saved.map((article) => (
        <li
          key={article.slug}
          className="flex flex-col rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft"
        >
          <p className="text-sm font-semibold text-sage">{article.category}</p>
          <h2 className="mt-2 text-2xl">
            <Link href={`/library/${article.slug}`} className="hover:underline hover:underline-offset-4">
              {article.title}
            </Link>
          </h2>
          <p className="mt-2 flex-1 text-ink-muted">{article.description}</p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-sm text-ink-muted">{article.readingMinutes} min read</span>
            <BookmarkButton slug={article.slug} saved compact />
          </div>
        </li>
      ))}
    </ul>
  );
}
