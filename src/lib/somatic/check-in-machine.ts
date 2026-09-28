import type { Emotion } from "./emotions";
import type { BodyRegionId } from "./regions";
import type { ShapeId } from "./shapes";
import type { TextureId } from "./textures";
import type { CheckInInput, Sensation } from "./types";

export const steps = [
  "arrive",
  "breathe",
  "scan",
  "locate",
  "color",
  "shape",
  "texture",
  "intensity",
  "observe",
  "recheck",
  "shift",
  "close",
] as const;

export type Step = (typeof steps)[number];

/** Coarser phases for the progress indicator. */
export const phases = [
  { label: "Arrive", steps: ["arrive"] },
  { label: "Breathe", steps: ["breathe"] },
  { label: "Scan", steps: ["scan"] },
  { label: "Describe", steps: ["locate", "color", "shape", "texture", "intensity"] },
  { label: "Observe", steps: ["observe", "recheck", "shift"] },
  { label: "Close", steps: ["close"] },
] as const satisfies readonly { label: string; steps: readonly Step[] }[];

export function phaseIndex(step: Step) {
  return phases.findIndex((phase) => (phase.steps as readonly Step[]).includes(step));
}

export type SensationDraft = {
  region: BodyRegionId | null;
  color: string;
  shape: ShapeId | null;
  customPath?: string;
  texture: TextureId | null;
  intensity: number;
};

export type CheckInState = {
  step: Step;
  startedAt: number;
  feeling: string;
  emotions: Emotion[];
  breathingRounds: number;
  completedBodyScan: boolean;
  before: SensationDraft;
  /** null until the person re-checks; equal to `before` when nothing shifted. */
  after: SensationDraft | null;
  shifted: boolean | null;
};

export type CheckInAction =
  | { type: "begin"; now: number }
  | { type: "setFeeling"; feeling: string }
  | { type: "toggleEmotion"; emotion: Emotion }
  | { type: "breathRound" }
  | { type: "scanComplete" }
  | { type: "update"; target: "before" | "after"; patch: Partial<SensationDraft> }
  | { type: "next" }
  | { type: "back" }
  | { type: "recheck"; shifted: boolean }
  | { type: "restore"; state: CheckInState }
  | { type: "reset"; now: number };

export const MAX_EMOTIONS = 6;

export function initialCheckIn(now: number): CheckInState {
  return {
    step: "arrive",
    startedAt: now,
    feeling: "",
    emotions: [],
    breathingRounds: 0,
    completedBodyScan: false,
    before: { region: null, color: "#7c3aed", shape: null, texture: null, intensity: 5 },
    after: null,
    shifted: null,
  };
}

const describeSteps = ["locate", "color", "shape", "texture", "intensity"] as const;

/** Can the person move forward from this step? */
export function canAdvance(state: CheckInState): boolean {
  const draft = state.step === "shift" ? state.after : state.before;
  switch (state.step) {
    case "locate":
      return Boolean(state.before.region);
    case "shape":
      return Boolean(state.before.shape && (state.before.shape !== "custom" || state.before.customPath));
    case "texture":
      return Boolean(state.before.texture);
    case "shift":
      return Boolean(
        draft?.region && draft.shape && draft.texture && (draft.shape !== "custom" || draft.customPath),
      );
    case "recheck":
    case "close":
      return false;
    default:
      return true;
  }
}

function nextStep(state: CheckInState): Step {
  switch (state.step) {
    case "arrive":
      return "breathe";
    case "breathe":
      return "scan";
    case "scan":
      return "locate";
    case "intensity":
      return "observe";
    case "observe":
      return "recheck";
    case "shift":
      return "close";
    default: {
      const index = describeSteps.indexOf(state.step as (typeof describeSteps)[number]);
      return index >= 0 && index < describeSteps.length - 1 ? describeSteps[index + 1]! : state.step;
    }
  }
}

function previousStep(state: CheckInState): Step {
  switch (state.step) {
    case "close":
      return state.shifted ? "shift" : "recheck";
    case "shift":
      return "recheck";
    default: {
      const index = steps.indexOf(state.step);
      return index > 0 ? steps[index - 1]! : state.step;
    }
  }
}

export function checkInReducer(state: CheckInState, action: CheckInAction): CheckInState {
  switch (action.type) {
    case "begin":
      return state.startedAt ? state : { ...state, startedAt: action.now };
    case "setFeeling":
      return { ...state, feeling: action.feeling.slice(0, 500) };
    case "toggleEmotion": {
      const has = state.emotions.includes(action.emotion);
      if (!has && state.emotions.length >= MAX_EMOTIONS) return state;
      return {
        ...state,
        emotions: has
          ? state.emotions.filter((emotion) => emotion !== action.emotion)
          : [...state.emotions, action.emotion],
      };
    }
    case "breathRound":
      return { ...state, breathingRounds: Math.min(state.breathingRounds + 1, 30) };
    case "scanComplete":
      return { ...state, completedBodyScan: true };
    case "update": {
      const current = action.target === "before" ? state.before : state.after;
      if (!current) return state;
      const updated = { ...current, ...action.patch };
      return action.target === "before" ? { ...state, before: updated } : { ...state, after: updated };
    }
    case "next":
      if (!canAdvance(state)) return state;
      return { ...state, step: nextStep(state) };
    case "back":
      return { ...state, step: previousStep(state) };
    case "recheck":
      return {
        ...state,
        shifted: action.shifted,
        after: { ...state.before },
        step: action.shifted ? "shift" : "close",
      };
    case "restore":
      return action.state;
    case "reset":
      return initialCheckIn(action.now);
  }
}

function toSensation(draft: SensationDraft): Sensation | null {
  if (!draft.region || !draft.shape || !draft.texture) return null;
  return {
    region: draft.region,
    color: draft.color,
    shape: draft.shape,
    ...(draft.shape === "custom" && draft.customPath ? { customPath: draft.customPath } : {}),
    texture: draft.texture,
    intensity: draft.intensity,
  };
}

/** Shapes the finished state into the payload the server validates. */
export function toCheckInInput(state: CheckInState, now: number): CheckInInput | null {
  const before = toSensation(state.before);
  if (!before) return null;
  const after = state.after ? toSensation(state.after) : null;
  return {
    feeling: state.feeling.trim(),
    emotions: state.emotions,
    before,
    after,
    breathingRounds: state.breathingRounds,
    completedBodyScan: state.completedBodyScan,
    durationSeconds: state.startedAt ? Math.max(0, Math.round((now - state.startedAt) / 1000)) : 0,
  };
}

/** Loose runtime check for state restored from sessionStorage. */
export function isCheckInState(value: unknown): value is CheckInState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CheckInState>;
  return (
    typeof candidate.step === "string" &&
    (steps as readonly string[]).includes(candidate.step) &&
    typeof candidate.startedAt === "number" &&
    typeof candidate.before === "object" &&
    candidate.before !== null
  );
}
