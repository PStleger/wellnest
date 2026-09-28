import type { Metadata } from "next";
import { Suspense } from "react";

import { EmptyState, PageHeader, SectionHeader, Skeleton } from "@/components/app/page-header";
import { BarList, ColourCalendar, ShiftChart, StatTile } from "@/components/insights/charts";
import { PageTransition } from "@/components/motion/page-transition";
import { BodyFigure } from "@/components/somatic/body-figure";
import { Orb } from "@/components/somatic/orb";
import { LinkButton } from "@/components/ui/button";
import { listCheckIns } from "@/lib/data/check-ins";
import { practiceSummary } from "@/lib/data/practice";
import { computeInsights, withinDays } from "@/lib/somatic/insights";
import { regionLabel } from "@/lib/somatic/regions";
import { createFormatter, getTimeZone } from "@/lib/time";

export const metadata: Metadata = {
  title: "Insights",
  description: "Where feelings tend to land, and how they shift when you stay with them.",
};

export default function InsightsPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Insights"
        description="The last four weeks: where feelings tend to land, and how they shift when you stay with them."
      />
      <Suspense fallback={<InsightsSkeleton />}>
        <Insights />
      </Suspense>
    </PageTransition>
  );
}

function InsightsSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-8">
      <span className="sr-only">Loading insights…</span>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((key) => (
          <Skeleton key={key} className="h-28" />
        ))}
      </div>
      <Skeleton className="h-96" />
      <Skeleton className="h-80" />
    </div>
  );
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const card = "defer-render rounded-(--radius-card) border border-line bg-surface p-5 shadow-soft sm:p-7";

async function Insights() {
  const [format, rows] = await Promise.all([
    getTimeZone().then(createFormatter),
    listCheckIns({ limit: 500 }),
  ]);
  const now = new Date();
  // Calendar starts on a Monday and ends today: three full weeks plus this week so far.
  const calendarDays = 21 + WEEKDAYS.indexOf(format.weekday(now)) + 1;
  const recent = withinDays(rows, now, calendarDays, format.dayKey);
  const practice = await practiceSummary(new Date(now.getTime() - calendarDays * 86_400_000));
  const practiceMinutes = Math.round(practice.seconds / 60);
  const insights = computeInsights(recent, {
    now,
    dayKey: format.dayKey,
    hourOf: format.hour,
    days: calendarDays,
  });

  if (insights.total === 0) {
    return (
      <EmptyState
        art={<Orb color="#7c3aed" shape="cloud" texture="soft" className="size-20" />}
        title="Insights grow with you"
        body="After a few check-ins you'll see where feelings tend to land and how they shift."
        action={<LinkButton href="/check-in">Start a check-in</LinkButton>}
      />
    );
  }

  const heat = Object.fromEntries(insights.regions.map((region) => [region.id, region.share]));
  const top = insights.regions[0];

  return (
    <div className="space-y-12">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Check-ins"
          value={insights.total}
          detail={`on ${insights.activeDays} of ${calendarDays} days`}
        />
        <StatTile
          label="Current streak"
          value={`${insights.streak} ${insights.streak === 1 ? "day" : "days"}`}
          detail={insights.streak ? "Keep it gentle, not perfect" : "Start again any time"}
        />
        <StatTile
          label="Average shift"
          value={
            insights.averageShift === null
              ? "–"
              : `${insights.averageShift > 0 ? "+" : insights.averageShift < 0 ? "−" : ""}${Math.abs(insights.averageShift)}`
          }
          detail={
            insights.easedShare === null
              ? "points of intensity, after staying with it"
              : `points; eased in ${Math.round(insights.easedShare * 100)}% of re-checks`
          }
        />
        <StatTile
          label="Practice"
          value={`${practiceMinutes} min`}
          detail={
            practice.sessions === 0
              ? "Try a breathing practice"
              : practice.rated > 0
                ? `${practice.sessions} sessions; calmer after ${Math.round((practice.calmer / practice.rated) * 100)}%`
                : `${practice.sessions} sessions`
          }
        />
      </dl>

      <section aria-labelledby="calendar-title" className={card}>
        <SectionHeader id="calendar-title" title="Colour calendar" />
        <p className="-mt-3 mb-6 text-ink-muted">Each day shows the last feeling you checked in with.</p>
        <ColourCalendar days={insights.calendar} format={format} />
      </section>

      <section aria-labelledby="shift-title" className={card}>
        <SectionHeader id="shift-title" title="Before and after" />
        <p className="-mt-3 mb-6 text-ink-muted">
          Intensity out of 10 when you started, and again after about a minute of attention.
        </p>
        <ShiftChart rows={recent.slice(0, 16)} format={format} />
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
        <section aria-labelledby="body-title" className={card}>
          <SectionHeader id="body-title" title="Where it lands" />
          <div className="grid grid-cols-[7rem_1fr] items-center gap-6 sm:grid-cols-[9rem_1fr]">
            <BodyFigure
              heat={heat}
              className="h-auto w-full"
              label={top ? `Body map. Most often: ${regionLabel(top.id)}.` : "Body map"}
            />
            <div>
              <BarList
                items={insights.regions.slice(0, 6).map((region) => ({
                  label: regionLabel(region.id),
                  value: region.count,
                }))}
                unit="check-ins"
              />
              <div className="mt-6 flex items-center gap-2 text-xs text-ink-muted" aria-hidden="true">
                Fewer
                <span className="h-2 w-20 rounded-full bg-linear-to-r from-chart-after/15 to-chart-after" />
                More
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="feelings-title" className={card}>
          <SectionHeader id="feelings-title" title="Feelings you named" />
          {insights.emotions.length ? (
            <BarList
              items={insights.emotions.map((item) => ({ label: item.emotion, value: item.count }))}
              unit="times"
            />
          ) : (
            <p className="text-ink-muted">You haven&rsquo;t named any feelings yet. That&rsquo;s okay.</p>
          )}
          <h3 className="mt-10 mb-4 font-sans text-sm font-semibold tracking-wide text-ink-muted uppercase">
            Time of day
          </h3>
          <BarList
            items={insights.timeOfDay.map((bucket) => ({ label: bucket.label, value: bucket.count }))}
            unit="check-ins"
          />
        </section>
      </div>
    </div>
  );
}
