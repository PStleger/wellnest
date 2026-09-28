import { breathAt, breathPatterns, cycleSeconds, getPattern, sessionCycles } from "./breathing";

describe("breathing patterns", () => {
  it("all have a sensible rhythm", () => {
    for (const pattern of breathPatterns) {
      const seconds = cycleSeconds(pattern);
      expect(seconds).toBeGreaterThanOrEqual(9);
      expect(seconds).toBeLessThanOrEqual(20);
      // Every pattern ends empty so the next cycle starts from an out-breath.
      expect(pattern.phases.at(-1)?.to).toBe(0);
    }
  });

  it("falls back to the first pattern for unknown ids", () => {
    expect(getPattern("nope").id).toBe(breathPatterns[0]!.id);
    expect(getPattern("relax").name).toBe("4-7-8");
  });
});

describe("breathAt", () => {
  const box = getPattern("box");

  it("starts at the beginning of an in-breath with empty lungs", () => {
    const state = breathAt(box, 0);
    expect(state.phase.kind).toBe("in");
    expect(state.level).toBe(0);
    expect(state.secondsLeft).toBe(4);
  });

  it("counts down whole seconds and fills the lungs smoothly", () => {
    const halfway = breathAt(box, 2000);
    expect(halfway.secondsLeft).toBe(2);
    expect(halfway.level).toBeCloseTo(0.5);
    expect(breathAt(box, 3999).level).toBeGreaterThan(0.99);
  });

  it("holds full and holds empty", () => {
    expect(breathAt(box, 5000)).toMatchObject({ phaseIndex: 1, level: 1 });
    expect(breathAt(box, 13_000)).toMatchObject({ phaseIndex: 3, level: 0 });
  });

  it("wraps into the next cycle", () => {
    const next = breathAt(box, 16_500);
    expect(next.cycle).toBe(1);
    expect(next.phaseIndex).toBe(0);
  });

  it("handles the double inhale of a physiological sigh", () => {
    const sigh = getPattern("sigh");
    expect(breathAt(sigh, 2000).level).toBeCloseTo(0.8);
    const topUp = breathAt(sigh, 2500);
    expect(topUp.phase.label).toBe("A little more");
    expect(topUp.level).toBeGreaterThan(0.8);
    expect(breathAt(sigh, 9000 - 1).level).toBeLessThan(0.01);
  });
});

describe("sessionCycles", () => {
  it("rounds up to whole breaths", () => {
    expect(sessionCycles(getPattern("box"), 1)).toBe(4);
    expect(sessionCycles(getPattern("exhale"), 3)).toBe(18);
    expect(sessionCycles(getPattern("relax"), 0.1)).toBe(1);
  });
});
