import type { Emotion } from "./emotions";
import type { BodyRegionId } from "./regions";
import type { Sensation } from "./types";

export type InsightCheckIn = {
  id: string;
  createdAt: Date;
  emotions: string[];
  before: Sensation;
  after: Sensation | null;
};

type DayKey = (date: Date) => string;

export type CalendarDay = {
  key: string;
  date: Date;
  checkIns: { id: string; color: string; sensation: Sensation }[];
};

export type Insights = {
  total: number;
  activeDays: number;
  streak: number;
  averageBefore: number | null;
  averageAfter: number | null;
  averageShift: number | null;
  easedShare: number | null;
  regions: { id: BodyRegionId; count: number; share: number }[];
  emotions: { emotion: Emotion; count: number }[];
  calendar: CalendarDay[];
  timeOfDay: { label: string; count: number }[];
};

const round1 = (value: number) => Math.round(value * 10) / 10;

function mean(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

/** Day keys for the last `days` days, oldest first. */
export function recentDayKeys(now: Date, days: number, dayKey: DayKey) {
  return Array.from({ length: days }, (_, index) =>
    dayKey(new Date(now.getTime() - (days - 1 - index) * 86_400_000)),
  );
}

/** Rows whose local day falls inside the last `days` days. */
export function withinDays<T extends { createdAt: Date }>(
  rows: T[],
  now: Date,
  days: number,
  dayKey: DayKey,
) {
  const keys = new Set(recentDayKeys(now, days, dayKey));
  return rows.filter((row) => keys.has(dayKey(row.createdAt)));
}

/**
 * Pure summary of check-ins for the insights page. Day boundaries come from
 * `dayKey`, so "today" matches the person's own time zone.
 */
export function computeInsights(
  rows: InsightCheckIn[],
  {
    now,
    dayKey,
    hourOf,
    days = 28,
  }: { now: Date; dayKey: DayKey; hourOf: (date: Date) => number; days?: number },
): Insights {
  const byDay = new Map<string, InsightCheckIn[]>();
  for (const row of rows) {
    const key = dayKey(row.createdAt);
    byDay.set(key, [...(byDay.get(key) ?? []), row]);
  }

  // Calendar: the last `days` days, oldest first.
  const calendar: CalendarDay[] = [];
  for (let offset = days - 1; offset >= 0; offset--) {
    const date = new Date(now.getTime() - offset * 86_400_000);
    const key = dayKey(date);
    const items = (byDay.get(key) ?? [])
      .toSorted((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map((row) => {
        const sensation = row.after ?? row.before;
        return { id: row.id, color: sensation.color, sensation };
      });
    calendar.push({ key, date, checkIns: items });
  }

  // Streak: consecutive days with a check-in, counting back from today (or yesterday).
  let streak = 0;
  for (let offset = 0; offset < 366; offset++) {
    const key = dayKey(new Date(now.getTime() - offset * 86_400_000));
    if (byDay.has(key)) streak++;
    else if (offset > 0 || streak > 0) break;
  }

  const paired = rows.filter((row) => row.after);
  const averageBefore = mean(rows.map((row) => row.before.intensity));
  const averageAfter = mean(paired.map((row) => row.after!.intensity));
  const averageShift = mean(paired.map((row) => row.after!.intensity - row.before.intensity));
  const eased = paired.filter((row) => row.after!.intensity < row.before.intensity).length;

  const regionCounts = new Map<BodyRegionId, number>();
  for (const row of rows) {
    regionCounts.set(row.before.region, (regionCounts.get(row.before.region) ?? 0) + 1);
  }
  const maxRegion = Math.max(1, ...regionCounts.values());
  const regions = [...regionCounts.entries()]
    .map(([id, count]) => ({ id, count, share: count / maxRegion }))
    .toSorted((a, b) => b.count - a.count);

  const emotionCounts = new Map<Emotion, number>();
  for (const row of rows) {
    for (const emotion of row.emotions as Emotion[]) {
      emotionCounts.set(emotion, (emotionCounts.get(emotion) ?? 0) + 1);
    }
  }
  const emotions = [...emotionCounts.entries()]
    .map(([emotion, count]) => ({ emotion, count }))
    .toSorted((a, b) => b.count - a.count || a.emotion.localeCompare(b.emotion))
    .slice(0, 8);

  const buckets = [
    { label: "Night", from: 0, to: 5 },
    { label: "Morning", from: 5, to: 12 },
    { label: "Afternoon", from: 12, to: 18 },
    { label: "Evening", from: 18, to: 24 },
  ];
  const timeOfDay = buckets.map((bucket) => ({
    label: bucket.label,
    count: rows.filter((row) => {
      const hour = hourOf(row.createdAt);
      return hour >= bucket.from && hour < bucket.to;
    }).length,
  }));

  return {
    total: rows.length,
    activeDays: byDay.size,
    streak,
    averageBefore: averageBefore === null ? null : round1(averageBefore),
    averageAfter: averageAfter === null ? null : round1(averageAfter),
    averageShift: averageShift === null ? null : round1(averageShift),
    easedShare: paired.length ? eased / paired.length : null,
    regions,
    emotions,
    calendar,
    timeOfDay,
  };
}
