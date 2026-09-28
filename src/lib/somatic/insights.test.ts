import { computeInsights, recentDayKeys, withinDays, type InsightCheckIn } from "./insights";
import type { Sensation } from "./types";

const dayKey = (date: Date) => date.toISOString().slice(0, 10);
const hourOf = (date: Date) => date.getUTCHours();
const now = new Date("2026-09-27T12:00:00Z");

const sensation = (overrides: Partial<Sensation> = {}): Sensation => ({
  region: "chest",
  color: "#e11d48",
  shape: "ball",
  texture: "soft",
  intensity: 6,
  ...overrides,
});

function row(
  daysAgo: number,
  before: Partial<Sensation>,
  after: Partial<Sensation> | null,
  emotions: string[] = [],
) {
  return {
    id: `id-${daysAgo}-${Math.random()}`,
    createdAt: new Date(now.getTime() - daysAgo * 86_400_000),
    emotions,
    before: sensation(before),
    after: after ? sensation({ ...before, ...after }) : null,
  } satisfies InsightCheckIn;
}

describe("computeInsights", () => {
  const rows = [
    row(0, { intensity: 7 }, { intensity: 3 }, ["anxious"]),
    row(1, { intensity: 6, region: "stomach" }, { intensity: 6 }, ["anxious", "tired"]),
    row(2, { intensity: 5 }, null, ["tired"]),
    row(5, { intensity: 8, region: "throat" }, { intensity: 4 }),
  ];
  const insights = computeInsights(rows, { now, dayKey, hourOf, days: 7 });

  it("counts check-ins and active days", () => {
    expect(insights.total).toBe(4);
    expect(insights.activeDays).toBe(4);
  });

  it("counts a streak of consecutive days ending today", () => {
    expect(insights.streak).toBe(3);
  });

  it("averages only check-ins that were re-checked", () => {
    expect(insights.averageAfter).toBe(4.3);
    expect(insights.averageShift).toBe(-2.7);
    expect(insights.easedShare).toBeCloseTo(2 / 3);
  });

  it("ranks regions and normalises them for the heat map", () => {
    expect(insights.regions[0]).toEqual({ id: "chest", count: 2, share: 1 });
    expect(insights.regions.find((region) => region.id === "throat")?.share).toBe(0.5);
  });

  it("ranks emotions by frequency", () => {
    expect(insights.emotions.slice(0, 2)).toEqual([
      { emotion: "anxious", count: 2 },
      { emotion: "tired", count: 2 },
    ]);
  });

  it("builds a calendar that ends today", () => {
    expect(insights.calendar).toHaveLength(7);
    expect(insights.calendar.at(-1)?.key).toBe("2026-09-27");
    expect(insights.calendar.at(-1)?.checkIns[0]?.color).toBe("#e11d48");
  });

  it("keeps a streak alive if the last check-in was yesterday", () => {
    const yesterday = computeInsights([row(1, {}, null), row(2, {}, null)], { now, dayKey, hourOf });
    expect(yesterday.streak).toBe(2);
  });

  it("handles an empty history", () => {
    const empty = computeInsights([], { now, dayKey, hourOf });
    expect(empty.total).toBe(0);
    expect(empty.averageShift).toBeNull();
    expect(empty.streak).toBe(0);
  });
});

describe("date windows", () => {
  it("lists recent day keys oldest first", () => {
    expect(recentDayKeys(now, 3, dayKey)).toEqual(["2026-09-25", "2026-09-26", "2026-09-27"]);
  });

  it("filters rows to the window", () => {
    const rows = [row(0, {}, null), row(6, {}, null), row(7, {}, null)];
    expect(withinDays(rows, now, 7, dayKey)).toHaveLength(2);
  });
});
