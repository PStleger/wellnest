import {
  canAdvance,
  type CheckInAction,
  type CheckInState,
  checkInReducer,
  initialCheckIn,
  isCheckInState,
  MAX_EMOTIONS,
  phaseIndex,
  toCheckInInput,
} from "./check-in-machine";
import { checkInInputSchema } from "./types";

const run = (actions: CheckInAction[], state: CheckInState = initialCheckIn(0)) =>
  actions.reduce(checkInReducer, state);

/** Walks to the observe step with a fully described sensation. */
function described() {
  return run([
    { type: "begin", now: 1_000 },
    { type: "next" }, // breathe
    { type: "breathRound" },
    { type: "next" }, // scan
    { type: "scanComplete" },
    { type: "next" }, // locate
    { type: "update", target: "before", patch: { region: "chest" } },
    { type: "next" }, // color
    { type: "update", target: "before", patch: { color: "#e11d48" } },
    { type: "next" }, // shape
    { type: "update", target: "before", patch: { shape: "knot" } },
    { type: "next" }, // texture
    { type: "update", target: "before", patch: { texture: "prickly" } },
    { type: "next" }, // intensity
    { type: "update", target: "before", patch: { intensity: 7 } },
    { type: "next" }, // observe
  ]);
}

describe("check-in state machine", () => {
  it("walks through the describe steps in order", () => {
    expect(described().step).toBe("observe");
  });

  it("won't leave a step until its answer is given", () => {
    const atLocate = run([{ type: "next" }, { type: "next" }, { type: "next" }]);
    expect(atLocate.step).toBe("locate");
    expect(canAdvance(atLocate)).toBe(false);
    expect(checkInReducer(atLocate, { type: "next" }).step).toBe("locate");
  });

  it("requires a drawing when the custom shape is chosen", () => {
    const atShape = { ...described(), step: "shape" as const };
    const custom = checkInReducer(atShape, { type: "update", target: "before", patch: { shape: "custom" } });
    expect(canAdvance(custom)).toBe(false);
    const drawn = checkInReducer(custom, {
      type: "update",
      target: "before",
      patch: { customPath: "M10 10L50 50" },
    });
    expect(canAdvance(drawn)).toBe(true);
  });

  it("copies the before sensation when something shifted", () => {
    const shifted = run([{ type: "next" }, { type: "recheck", shifted: true }], described());
    expect(shifted.step).toBe("shift");
    expect(shifted.after).toEqual(shifted.before);

    const eased = checkInReducer(shifted, { type: "update", target: "after", patch: { intensity: 3 } });
    expect(eased.after?.intensity).toBe(3);
    expect(eased.before.intensity).toBe(7);
  });

  it("skips the shift step when nothing changed, and goes back correctly", () => {
    const same = run([{ type: "next" }, { type: "recheck", shifted: false }], described());
    expect(same.step).toBe("close");
    expect(checkInReducer(same, { type: "back" }).step).toBe("recheck");
  });

  it("caps the number of emotions", () => {
    const emotions = ["anxious", "angry", "overwhelmed", "restless", "frustrated", "excited", "sad"] as const;
    const state = run(emotions.map((emotion) => ({ type: "toggleEmotion", emotion })));
    expect(state.emotions).toHaveLength(MAX_EMOTIONS);
    expect(state.emotions).not.toContain("sad");
  });

  it("only sets the start time once", () => {
    const started = run([
      { type: "begin", now: 5 },
      { type: "begin", now: 99 },
    ]);
    expect(started.startedAt).toBe(5);
  });

  it("produces input the server schema accepts", () => {
    const state = run(
      [
        { type: "next" },
        { type: "recheck", shifted: true },
        { type: "update", target: "after", patch: { intensity: 4, texture: "soft" } },
      ],
      described(),
    );
    const input = toCheckInInput(state, 181_000);
    expect(input?.durationSeconds).toBe(180);
    expect(checkInInputSchema.safeParse(input).success).toBe(true);
  });

  it("returns null when the sensation is incomplete", () => {
    expect(toCheckInInput(initialCheckIn(0), 10)).toBeNull();
  });

  it("maps steps onto progress phases", () => {
    expect(phaseIndex("arrive")).toBe(0);
    expect(phaseIndex("texture")).toBe(3);
    expect(phaseIndex("shift")).toBe(4);
    expect(phaseIndex("close")).toBe(5);
  });

  it("recognises restorable state and rejects junk", () => {
    expect(isCheckInState(described())).toBe(true);
    expect(isCheckInState({ step: "nope", startedAt: 1, before: {} })).toBe(false);
    expect(isCheckInState(null)).toBe(false);
  });
});
