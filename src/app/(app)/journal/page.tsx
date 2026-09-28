import { NotebookPen, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, Suspense } from "react";

import { SensationOrb } from "@/components/app/check-in-item";
import { EmptyState, PageHeader, Skeleton } from "@/components/app/page-header";
import { PageTransition } from "@/components/motion/page-transition";
import { LinkButton } from "@/components/ui/button";
import { inputStyles } from "@/components/ui/field";
import { listJournalEntries } from "@/lib/data/journal";
import { MATCH_END, MATCH_START } from "@/lib/search-markers";
import { createFormatter, getTimeZone } from "@/lib/time";
import { cn, excerpt, pluralize } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description: "Everything you've written, searchable.",
};

type SearchParams = PageProps<"/journal">["searchParams"];

export default function JournalPage({ searchParams }: PageProps<"/journal">) {
  return (
    <PageTransition>
      <PageHeader
        title="Journal"
        description="Everything you've written, searchable in plain words."
        actions={
          <LinkButton href="/journal/new">
            <NotebookPen className="size-4" aria-hidden="true" /> New entry
          </LinkButton>
        }
      />
      <Suspense fallback={<JournalSkeleton />}>
        <Entries searchParams={searchParams} />
      </Suspense>
    </PageTransition>
  );
}

function JournalSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-4">
      <span className="sr-only">Loading entries…</span>
      <Skeleton className="h-14" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
    </div>
  );
}

/** Renders ts_headline output, turning match markers into <mark> without parsing HTML. */
function Highlighted({ text }: { text: string }) {
  const parts = text.split(MATCH_START);
  return (
    <>
      {parts.map((part, index) => {
        if (index === 0) return <Fragment key={index}>{part}</Fragment>;
        const [match = "", rest = ""] = part.split(MATCH_END);
        return (
          <Fragment key={index}>
            <mark className="rounded bg-apricot/50 px-0.5 text-ink">{match}</mark>
            {rest}
          </Fragment>
        );
      })}
    </>
  );
}

async function Entries({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const [entries, format] = await Promise.all([
    listJournalEntries({ query }),
    getTimeZone().then(createFormatter),
  ]);

  const groups = new Map<string, typeof entries>();
  for (const entry of entries) {
    const month = query ? "Best matches" : format.month(entry.createdAt);
    groups.set(month, [...(groups.get(month) ?? []), entry]);
  }

  return (
    <div className="space-y-10">
      <search>
        <form action="/journal" className="relative" role="search">
          <label htmlFor="journal-search" className="sr-only">
            Search your journal
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            id="journal-search"
            type="search"
            name="q"
            defaultValue={query}
            placeholder={'Search, e.g. "stomach" or launch -work'}
            className={cn(inputStyles, "min-h-14 rounded-full pl-12")}
          />
        </form>
      </search>

      {query ? (
        <p aria-live="polite" className="text-ink-muted">
          {pluralize(entries.length, "entry", "entries")} for &ldquo;{query}&rdquo;.{" "}
          <Link href="/journal" className="font-semibold text-primary underline-offset-4 hover:underline">
            Clear search
          </Link>
        </p>
      ) : null}

      {entries.length === 0 ? (
        query ? (
          <EmptyState title="No matches" body="Try a different word, or fewer words." />
        ) : (
          <EmptyState
            title="Your journal is empty"
            body="Write after a check-in, or whenever something wants to be said."
            action={<LinkButton href="/journal/new">Write your first entry</LinkButton>}
          />
        )
      ) : (
        [...groups.entries()].map(([month, items]) => (
          <section key={month} aria-labelledby={`month-${month.replace(/\s/g, "-")}`}>
            <h2
              id={`month-${month.replace(/\s/g, "-")}`}
              className="mb-4 font-sans text-sm font-semibold tracking-wide text-ink-muted uppercase"
            >
              {month}
            </h2>
            <ul className="space-y-3">
              {items.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/journal/${entry.id}`}
                    className="flex gap-5 rounded-3xl border border-line bg-surface p-5 shadow-soft transition hover:border-line-strong hover:shadow-lift"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-ink-muted">
                        <time dateTime={entry.createdAt.toISOString()}>{format.day(entry.createdAt)}</time>
                      </p>
                      <h3 className="mt-1 text-xl">{entry.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-ink-muted">
                        {"headline" in entry && typeof entry.headline === "string" ? (
                          <Highlighted text={entry.headline} />
                        ) : (
                          excerpt(entry.body, 180)
                        )}
                      </p>
                    </div>
                    {entry.before ? (
                      <SensationOrb
                        sensation={entry.after ?? entry.before}
                        className="size-14 shrink-0 self-center"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
