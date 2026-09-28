import { ArrowLeft, Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { SensationOrb } from "@/components/app/check-in-item";
import { Skeleton } from "@/components/app/page-header";
import { PageTransition } from "@/components/motion/page-transition";
import { LinkButton } from "@/components/ui/button";
import { ConfirmDelete } from "@/components/ui/confirm-delete";
import { getJournalEntry } from "@/lib/data/journal";
import { describeSensation } from "@/lib/somatic/describe";
import { createFormatter, getTimeZone } from "@/lib/time";

import { removeEntry } from "../actions";

export const metadata: Metadata = { title: "Journal entry" };

export default function EntryPage({ params }: PageProps<"/journal/[id]">) {
  return (
    <PageTransition>
      <Link
        href="/journal"
        className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All entries
      </Link>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Entry params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function Entry({ params }: { params: PageProps<"/journal/[id]">["params"] }) {
  const { id } = await params;
  const [entry, format] = await Promise.all([getJournalEntry(id), getTimeZone().then(createFormatter)]);
  if (!entry) notFound();
  const sensation = entry.after ?? entry.before;
  const edited = entry.updatedAt.getTime() - entry.createdAt.getTime() > 60_000;

  return (
    <article className="max-w-3xl">
      <header>
        <p className="text-ink-muted">
          <time dateTime={entry.createdAt.toISOString()}>
            {format.longDay(entry.createdAt)}, {format.time(entry.createdAt)}
          </time>
          {edited ? <span> · edited</span> : null}
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{entry.title}</h1>
      </header>

      {entry.prompt ? (
        <p className="mt-6 border-l-3 border-apricot pl-4 font-display text-xl text-ink-muted italic">
          {entry.prompt}
        </p>
      ) : null}

      <div className="mt-8 space-y-5 text-lg leading-relaxed whitespace-pre-line">{entry.body}</div>

      {sensation && entry.checkInId ? (
        <Link
          href={`/check-ins/${entry.checkInId}`}
          className="mt-10 flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft transition hover:border-line-strong"
        >
          <SensationOrb sensation={sensation} className="size-14 shrink-0" />
          <span>
            <span className="block text-sm font-semibold text-primary">From a check-in</span>
            <span className="text-ink-muted">{describeSensation(sensation)}</span>
          </span>
        </Link>
      ) : null}

      <footer className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
        <LinkButton href={`/journal/${entry.id}/edit`} variant="secondary">
          <Pencil className="size-4" aria-hidden="true" /> Edit
        </LinkButton>
        <ConfirmDelete
          action={removeEntry.bind(null, entry.id)}
          label="Delete entry"
          description="This entry will be permanently deleted. This can't be undone."
        />
      </footer>
    </article>
  );
}
