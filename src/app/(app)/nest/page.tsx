import { ArrowRight, BookOpen, Info, Wind } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { CheckInItem } from "@/components/app/check-in-item";
import type { CheckInRow } from "@/lib/db/schema";
import { EmptyState, SectionHeader, Skeleton } from "@/components/app/page-header";
import { WeekStrip } from "@/components/app/week-strip";
import { PageTransition } from "@/components/motion/page-transition";
import { Orb } from "@/components/somatic/orb";
import { LinkButton } from "@/components/ui/button";
import { listBookmarks } from "@/lib/data/bookmarks";
import { listCheckIns } from "@/lib/data/check-ins";
import { listJournalEntries } from "@/lib/data/journal";
import { practiceSummary } from "@/lib/data/practice";
import { computeInsights, withinDays } from "@/lib/somatic/insights";
import { getCurrentUser, requireUser } from "@/lib/session";
import { createFormatter, getTimeZone, greeting } from "@/lib/time";
import { excerpt } from "@/lib/utils";
import { cache } from "react";

export const metadata: Metadata = {
  title: "Your nest",
  description: "Your check-ins, journal and saved practices at a glance.",
};

/** One query shared by the orb and the content below it within a request. */
const recentCheckIns = cache(() => listCheckIns({ limit: 40 }));

/**
 * The title and the start card are static, so they are prerendered into the shell and paint
 * immediately. Only the personal parts (greeting, data) stream in, into fixed-size slots.
 */
export default function NestPage() {
  return (
    <PageTransition>
      <div className="space-y-14">
        <div>
          <h1 className="text-4xl sm:text-5xl">Your nest</h1>
          <Suspense
            fallback={<p className="mt-2 h-7 w-64 max-w-full animate-pulse rounded-full bg-surface-2" />}
          >
            <Greeting />
          </Suspense>
        </div>

        <section
          aria-labelledby="start-title"
          className="relative overflow-hidden rounded-(--radius-card) bg-ink p-7 text-canvas shadow-lift sm:p-10"
        >
          <div className="relative z-10 max-w-md">
            <h2 id="start-title" className="text-3xl sm:text-4xl">
              How is your body right now?
            </h2>
            <p className="mt-3 opacity-80">
              A guided check-in takes about four minutes: breathe, scan, and give what you notice a colour,
              shape and texture.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/check-in"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-canvas px-6 font-semibold text-ink transition hover:opacity-90"
              >
                Start a check-in <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/breathe"
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold text-canvas ring-1 ring-canvas/40 transition ring-inset hover:bg-canvas/10"
              >
                <Wind className="size-4" aria-hidden="true" /> Just breathe
              </Link>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-12 sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2"
          >
            <Suspense fallback={<CardOrb />}>
              <LastCheckInOrb />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<NestSkeleton />}>
          <NestContent />
        </Suspense>
      </div>
    </PageTransition>
  );
}

async function Greeting() {
  const user = await getCurrentUser();
  const format = createFormatter(await getTimeZone());
  const now = new Date();
  const firstName = user && !user.isGuest ? user.name.split(" ")[0] : "";
  return (
    <p className="mt-2 h-7 truncate text-lg text-ink-muted">
      {format.longDay(now)} · {greeting(format.hour(now))}
      {firstName ? `, ${firstName}` : ""}
    </p>
  );
}

function CardOrb({ sensation }: { sensation?: CheckInRow["before"] }) {
  return (
    <Orb
      color={sensation?.color ?? "#7c3aed"}
      shape={sensation?.shape ?? "cloud"}
      customPath={sensation?.customPath}
      texture={sensation?.texture ?? "soft"}
      animated
      className="size-44 opacity-60 sm:size-56 sm:opacity-100"
    />
  );
}

/** The card echoes the most recent feeling, once it's known. */
async function LastCheckInOrb() {
  const [last] = await recentCheckIns();
  return <CardOrb sensation={last ? (last.after ?? last.before) : undefined} />;
}

function GuestNote() {
  return (
    <p
      role="note"
      className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-apricot/60 bg-apricot/15 px-4 py-3 text-sm"
    >
      <Info className="size-4 shrink-0" aria-hidden="true" />
      <span>
        <strong className="font-semibold">You&rsquo;re exploring a demo nest.</strong> Sample data, cleared
        after a week.
      </span>
      <Link href="/sign-up" className="font-semibold text-primary underline underline-offset-4">
        Keep my nest
      </Link>
    </p>
  );
}

function NestSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-10">
      <span className="sr-only">Loading your nest…</span>
      <Skeleton className="h-40" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    </div>
  );
}

async function NestContent() {
  const user = await requireUser();
  const now = new Date();
  const weekStart = new Date(now.getTime() - 7 * 86_400_000);
  const [timeZone, checkIns, entries, saved, practice] = await Promise.all([
    getTimeZone(),
    recentCheckIns(),
    listJournalEntries({ limit: 3 }),
    listBookmarks(),
    practiceSummary(weekStart),
  ]);
  const practiceMinutes = Math.round(practice.seconds / 60);
  const format = createFormatter(timeZone);
  const week = computeInsights(withinDays(checkIns, now, 7, format.dayKey), {
    now,
    dayKey: format.dayKey,
    hourOf: format.hour,
    days: 7,
  });

  return (
    <div className="space-y-14">
      {user.isGuest ? <GuestNote /> : null}
      <section aria-labelledby="week-title" className="defer-render">
        <SectionHeader
          id="week-title"
          title="This week"
          action={
            <Link
              href="/insights"
              className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Insights <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="rounded-(--radius-card) border border-line bg-surface p-5 shadow-soft sm:p-7">
          <WeekStrip days={week.calendar} format={format} />
          {week.total > 0 || practiceMinutes > 0 ? (
            <p className="mt-6 border-t border-line pt-5 text-ink-muted">
              {week.total === 1 ? "One check-in" : `${week.total} check-ins`} over {week.activeDays}{" "}
              {week.activeDays === 1 ? "day" : "days"}
              {practiceMinutes > 0 ? `, plus ${practiceMinutes} minutes of practice` : ""}
              {week.averageShift !== null && week.averageShift < 0
                ? `. On average, feelings eased by ${Math.abs(week.averageShift)} points after checking in.`
                : "."}
            </p>
          ) : null}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-14 defer-render lg:grid-cols-2 lg:gap-10">
        <section aria-labelledby="recent-title">
          <SectionHeader id="recent-title" title="Recent check-ins" />
          {checkIns.length ? (
            <ul className="space-y-3">
              {checkIns.slice(0, 4).map((row) => (
                <CheckInItem key={row.id} row={row} format={format} />
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Nothing here yet"
              body="Your first check-in will appear here as a small portrait of what you felt."
              action={<LinkButton href="/check-in">Start your first check-in</LinkButton>}
            />
          )}
        </section>

        <section aria-labelledby="journal-title">
          <SectionHeader
            id="journal-title"
            title="From your journal"
            action={
              <Link
                href="/journal/new"
                className="inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline"
              >
                New entry
              </Link>
            }
          />
          {entries.length ? (
            <ul className="space-y-3">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/journal/${entry.id}`}
                    className="block rounded-3xl border border-line bg-surface p-5 shadow-soft transition hover:border-line-strong hover:shadow-lift"
                  >
                    <p className="text-sm text-ink-muted">
                      <time dateTime={entry.createdAt.toISOString()}>{format.day(entry.createdAt)}</time>
                    </p>
                    <h3 className="mt-1 text-xl">{entry.title}</h3>
                    <p className="mt-1 line-clamp-2 text-ink-muted">{excerpt(entry.body, 140)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="A blank page"
              body="Write after a check-in, or whenever something wants to be said."
              action={
                <LinkButton href="/journal/new" variant="secondary">
                  Write an entry
                </LinkButton>
              }
            />
          )}
        </section>
      </div>

      {saved.length ? (
        <section aria-labelledby="saved-title" className="defer-render">
          <SectionHeader
            id="saved-title"
            title="Saved for later"
            action={
              <Link
                href="/saved"
                className="inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline"
              >
                All saved
              </Link>
            }
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {saved.slice(0, 3).map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/library/${article.slug}`}
                  className="flex h-full flex-col rounded-3xl border border-line bg-surface p-5 shadow-soft transition hover:border-line-strong hover:shadow-lift"
                >
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
                    <BookOpen className="size-4" aria-hidden="true" /> {article.category}
                  </span>
                  <span className="mt-2 font-display text-xl">{article.title}</span>
                  <span className="mt-auto pt-3 text-sm text-ink-muted">
                    {article.readingMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
