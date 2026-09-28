import { ArrowRight, Clock, NotebookPen, Wind } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { SensationOrb } from "@/components/app/check-in-item";
import { Skeleton } from "@/components/app/page-header";
import { PageTransition } from "@/components/motion/page-transition";
import { ConfirmDelete } from "@/components/ui/confirm-delete";
import { LinkButton } from "@/components/ui/button";
import { intensityWord } from "@/components/somatic/pickers";
import { getCheckIn } from "@/lib/data/check-ins";
import { listEntriesForCheckIn } from "@/lib/data/journal";
import { describeSensation, describeShift } from "@/lib/somatic/describe";
import { createFormatter, getTimeZone } from "@/lib/time";

import { removeCheckIn } from "../actions";

export const metadata: Metadata = { title: "Check-in" };

export default function CheckInPage({ params }: PageProps<"/check-ins/[id]">) {
  return (
    <PageTransition>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <CheckInDetail params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function CheckInDetail({ params }: { params: PageProps<"/check-ins/[id]">["params"] }) {
  const { id } = await params;
  const row = await getCheckIn(id);
  if (!row) notFound();

  const [format, entries] = await Promise.all([
    getTimeZone().then(createFormatter),
    listEntriesForCheckIn(row.id),
  ]);
  const minutes = Math.max(1, Math.round(row.durationSeconds / 60));

  return (
    <article className="space-y-10">
      <header>
        <p className="text-ink-muted">
          <time dateTime={row.createdAt.toISOString()}>
            {format.longDay(row.createdAt)} at {format.time(row.createdAt)}
          </time>
        </p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{row.feeling || "A quiet check-in"}</h1>
        {row.emotions.length ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Feelings named">
            {row.emotions.map((emotion) => (
              <li
                key={emotion}
                className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary"
              >
                {emotion}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          { label: "When you started", sensation: row.before },
          ...(row.after ? [{ label: "After staying with it", sensation: row.after }] : []),
        ].map(({ label, sensation }) => (
          <figure
            key={label}
            className="flex flex-col items-center gap-5 rounded-(--radius-card) border border-line bg-surface p-8 text-center shadow-soft"
          >
            <SensationOrb sensation={sensation} className="size-40" label={describeSensation(sensation)} />
            <figcaption>
              <span className="block text-sm font-semibold text-primary">{label}</span>
              <span className="mt-2 block text-lg">
                {describeSensation(sensation, { withIntensity: false })}
              </span>
              <span className="mt-1 block text-ink-muted">
                {sensation.intensity} / 10, {intensityWord(sensation.intensity)}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-surface-2/70 p-5">
          <dt className="text-sm text-ink-muted">Shift</dt>
          <dd className="mt-1 font-display text-2xl">{describeShift(row.before, row.after)}</dd>
        </div>
        <div className="rounded-3xl bg-surface-2/70 p-5">
          <dt className="flex items-center gap-1.5 text-sm text-ink-muted">
            <Wind className="size-4" aria-hidden="true" /> Breathing
          </dt>
          <dd className="mt-1 font-display text-2xl">
            {row.breathingRounds ? `${row.breathingRounds} rounds` : "Skipped"}
            {row.completedBodyScan ? " + scan" : ""}
          </dd>
        </div>
        <div className="rounded-3xl bg-surface-2/70 p-5">
          <dt className="flex items-center gap-1.5 text-sm text-ink-muted">
            <Clock className="size-4" aria-hidden="true" /> Time taken
          </dt>
          <dd className="mt-1 font-display text-2xl">
            {minutes} {minutes === 1 ? "minute" : "minutes"}
          </dd>
        </div>
      </dl>

      <section aria-labelledby="written-title" className="space-y-4">
        <h2 id="written-title" className="text-2xl">
          Written about this
        </h2>
        {entries.length ? (
          <ul className="space-y-2">
            {entries.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/journal/${entry.id}`}
                  className="flex min-h-12 items-center gap-3 rounded-2xl border border-line bg-surface px-4 font-medium hover:border-line-strong"
                >
                  <NotebookPen className="size-4 text-primary" aria-hidden="true" />
                  {entry.title}
                  <ArrowRight className="ml-auto size-4 text-ink-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-muted">Nothing yet.</p>
        )}
        <LinkButton href={`/journal/new?checkIn=${row.id}`} variant="secondary">
          Write about this check-in
        </LinkButton>
      </section>

      <footer className="border-t border-line pt-8">
        <ConfirmDelete
          action={removeCheckIn.bind(null, row.id)}
          label="Delete this check-in"
          description="This removes the check-in for good. Journal entries about it will stay."
        />
      </footer>
    </article>
  );
}
