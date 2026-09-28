export type PhaseKind = "in" | "hold-in" | "out" | "hold-out";

export type BreathPhase = {
  kind: PhaseKind;
  seconds: number;
  label: string;
  /** Lung fullness (0–1) at the end of this phase. Holds keep the previous level. */
  to: number;
};

export type BreathPattern = {
  id: "box" | "relax" | "coherent" | "sigh" | "exhale";
  name: string;
  tagline: string;
  description: string;
  /** Hue of the breathing orb, from the WellNest swatches. */
  color: string;
  phases: BreathPhase[];
  caution?: string;
};

const inhale = (seconds: number, to = 1, label = "Breathe in"): BreathPhase => ({
  kind: "in",
  seconds,
  label,
  to,
});
const exhale = (seconds: number, label = "Breathe out"): BreathPhase => ({
  kind: "out",
  seconds,
  label,
  to: 0,
});
const holdIn = (seconds: number): BreathPhase => ({ kind: "hold-in", seconds, label: "Hold", to: 1 });
const holdOut = (seconds: number): BreathPhase => ({ kind: "hold-out", seconds, label: "Rest", to: 0 });

export const breathPatterns: BreathPattern[] = [
  {
    id: "exhale",
    name: "Longer exhale",
    tagline: "Soften stress",
    description:
      "In for four, out for six. A longer out-breath is one of the simplest ways to ease the body down.",
    color: "#38bdf8",
    phases: [inhale(4), exhale(6)],
  },
  {
    id: "box",
    name: "Box breathing",
    tagline: "Steady focus",
    description:
      "Four equal sides: in, hold, out, hold. Even and predictable, good before something demanding.",
    color: "#7c3aed",
    phases: [inhale(4), holdIn(4), exhale(4), holdOut(4)],
    caution: "If holding your breath feels uncomfortable, choose Longer exhale instead.",
  },
  {
    id: "coherent",
    name: "Coherent breathing",
    tagline: "Find balance",
    description:
      "Slow and even at about five and a half breaths a minute. Settling to do for a few minutes at a time.",
    color: "#0f766e",
    phases: [inhale(5.5), exhale(5.5)],
  },
  {
    id: "sigh",
    name: "Physiological sigh",
    tagline: "Quick reset",
    description:
      "A deep breath in through the nose, a short top-up sip, then a long, slow sigh out. Two or three rounds is often enough.",
    color: "#f59e0b",
    phases: [inhale(2, 0.8), inhale(1, 1, "A little more"), exhale(6, "Sigh it out")],
  },
  {
    id: "relax",
    name: "4-7-8",
    tagline: "Wind down",
    description: "In for four, hold for seven, out for eight. A slow rhythm many people use before sleep.",
    color: "#1d4ed8",
    phases: [inhale(4), holdIn(7), exhale(8)],
    caution: "Start with four rounds. Stop if you feel light-headed.",
  },
];

export type BreathPatternId = BreathPattern["id"];

export function getPattern(id: string | null | undefined): BreathPattern {
  return breathPatterns.find((pattern) => pattern.id === id) ?? breathPatterns[0]!;
}

export function cycleSeconds(pattern: BreathPattern) {
  return pattern.phases.reduce((total, phase) => total + phase.seconds, 0);
}

/** Gentle ease so the orb swells and settles like a real breath. */
function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export type BreathState = {
  cycle: number;
  phaseIndex: number;
  phase: BreathPhase;
  /** 0–1 through the current phase. */
  progress: number;
  /** Whole seconds left in the phase, for the countdown (never 0 while running). */
  secondsLeft: number;
  /** 0–1 lung fullness, drives the orb's scale. */
  level: number;
  /** 0–1 position around the whole cycle, drives the ring's marker. */
  cycleProgress: number;
};

/** Pure: where in the pattern are we after `elapsedMs`? */
export function breathAt(pattern: BreathPattern, elapsedMs: number): BreathState {
  const cycleMs = cycleSeconds(pattern) * 1000;
  const elapsed = Math.max(0, elapsedMs);
  const cycle = Math.floor(elapsed / cycleMs);
  let within = elapsed - cycle * cycleMs;

  let from = pattern.phases.at(-1)!.to;
  for (const [phaseIndex, phase] of pattern.phases.entries()) {
    const phaseMs = phase.seconds * 1000;
    if (within < phaseMs || phaseIndex === pattern.phases.length - 1) {
      const progress = Math.min(1, within / phaseMs);
      const moving = phase.kind === "in" || phase.kind === "out";
      return {
        cycle,
        phaseIndex,
        phase,
        progress,
        secondsLeft: Math.max(1, Math.ceil(phase.seconds - progress * phase.seconds - 1e-9)),
        level: moving ? from + (phase.to - from) * easeInOutSine(progress) : phase.to,
        cycleProgress: (elapsed - cycle * cycleMs) / cycleMs,
      };
    }
    within -= phaseMs;
    from = phase.to;
  }
  throw new Error("unreachable");
}

/** A session ends at the first cycle boundary after the chosen length, never mid-breath. */
export function sessionCycles(pattern: BreathPattern, minutes: number) {
  return Math.max(1, Math.ceil((minutes * 60) / cycleSeconds(pattern)));
}
