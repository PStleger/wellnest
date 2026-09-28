"use client";

import { ArrowLeft, ArrowRight, Check, LoaderCircle, RotateCcw } from "lucide-react";
import { useEffect, useReducer, useRef, useState, useTransition } from "react";

import { saveCheckIn } from "@/app/(focus)/check-in/actions";
import { Button, LinkButton } from "@/components/ui/button";
import {
  canAdvance,
  type CheckInState,
  checkInReducer,
  initialCheckIn,
  isCheckInState,
  phaseIndex,
  phases,
  type Step,
  toCheckInInput,
} from "@/lib/somatic/check-in-machine";
import { cn } from "@/lib/utils";

import { NextSteps } from "./next-steps";
import {
  ArriveStep,
  BreatheStep,
  ColorStep,
  describeDraft,
  DraftOrb,
  IntensityStep,
  LocateStep,
  ObserveStep,
  RecheckStep,
  ScanStep,
  ShapeStep,
  ShiftStep,
  TextureStep,
} from "./check-in-steps";

const STORAGE_KEY = "wellnest:check-in";

const copy: Record<Step, { title: string; lead: string; next?: string }> = {
  arrive: {
    title: "How are you feeling right now?",
    lead: "It's okay not to know. We'll find out together, starting with the body.",
    next: "Begin",
  },
  breathe: {
    title: "Arrive with a few slow breaths",
    lead: "Follow the dot around the box. Three rounds is a good start. Move on whenever you're ready.",
  },
  scan: {
    title: "Scan through your body",
    lead: "Move your attention slowly from your feet to your head. Notice, without trying to fix anything.",
  },
  locate: {
    title: "Where is your attention being pulled?",
    lead: "Choose the place where the feeling is strongest. If it's everywhere, choose Whole body.",
  },
  color: {
    title: "If it had a colour, what would it be?",
    lead: "Go with your first instinct. There's no meaning to decode.",
  },
  shape: {
    title: "What shape is it?",
    lead: "Pick the closest one, or draw it yourself.",
  },
  texture: {
    title: "What would it feel like to touch?",
    lead: "Imagine running your hand over it.",
  },
  intensity: {
    title: "How strong is it right now?",
    lead: "Zero is barely there. Ten is as strong as it gets.",
  },
  observe: {
    title: "Now, just stay with it",
    lead: "Keep your attention on it for about a minute. You don't need to change anything.",
    next: "I'm ready",
  },
  recheck: {
    title: "Has anything shifted?",
    lead: "Look again at the place you chose.",
  },
  shift: {
    title: "What's different now?",
    lead: "Adjust whatever changed. Leave the rest as it is.",
    next: "See my check-in",
  },
  close: {
    title: "Thank you for checking in",
    lead: "You gave a feeling your full attention. That's the whole practice.",
  },
};

type SaveStatus =
  { state: "idle" | "saving" } | { state: "saved"; id: string } | { state: "error"; message: string };

export function CheckInFlow() {
  const [state, dispatch] = useReducer(checkInReducer, 0, initialCheckIn);
  const [draft, setDraft] = useState<CheckInState | null>(null);
  const [status, setStatus] = useState<SaveStatus>({ state: "idle" });
  const [, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const current = phaseIndex(state.step);

  // Offer to resume an unfinished check-in from this browser tab.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
      // Reading browser-only storage has to happen after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (isCheckInState(saved) && saved.step !== "arrive" && saved.step !== "close") setDraft(saved);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Persist progress so a refresh or accidental navigation loses nothing.
  useEffect(() => {
    if (draft || state.step === "close") return;
    if (state.step === "arrive" && !state.feeling && state.emotions.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be unavailable (private mode); the check-in still works.
    }
  }, [state, draft]);

  // Move focus to the new question so keyboard and screen reader users follow along.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [state.step]);

  // Save as soon as the person reaches the end.
  useEffect(() => {
    if (state.step !== "close" || status.state !== "idle") return;
    const input = toCheckInInput(state, Date.now());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus({ state: "saving" });
    if (!input) {
      setStatus({ state: "error", message: "This check-in is missing a few answers." });
      return;
    }
    startTransition(async () => {
      try {
        const result = await saveCheckIn(input);
        if (result.ok) {
          sessionStorage.removeItem(STORAGE_KEY);
          setStatus({ state: "saved", id: result.id });
        } else {
          setStatus({ state: "error", message: result.message });
        }
      } catch {
        setStatus({ state: "error", message: "We couldn't reach the server. Your answers are still here." });
      }
    });
  }, [state, status.state]);

  function next() {
    if (state.step === "arrive") dispatch({ type: "begin", now: Date.now() });
    dispatch({ type: "next" });
  }

  const { title, lead, next: nextLabel } = copy[state.step];
  const showNav = state.step !== "recheck" && state.step !== "close";
  const skipLabel =
    (state.step === "breathe" && state.breathingRounds === 0) ||
    (state.step === "scan" && !state.completedBodyScan)
      ? "Skip for now"
      : null;

  return (
    <div className="flex flex-1 flex-col">
      <ol aria-label="Check-in progress" className="grid grid-cols-6 gap-2">
        {phases.map((phase, index) => (
          <li key={phase.label} aria-current={index === current ? "step" : undefined}>
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 rounded-full transition-colors duration-500",
                index <= current ? "bg-primary" : "bg-surface-2",
              )}
            />
            <span
              className={cn(
                "mt-2 hidden text-xs sm:block",
                index === current ? "font-semibold text-ink" : "text-ink-muted",
              )}
            >
              {phase.label}
            </span>
            <span className="sr-only sm:hidden">{phase.label}</span>
          </li>
        ))}
      </ol>

      {draft ? (
        <div
          role="region"
          aria-label="Unfinished check-in"
          className="mt-6 flex flex-col gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft sm:flex-row sm:items-center"
        >
          <p className="flex-1">
            <strong className="font-semibold">You have an unfinished check-in.</strong>{" "}
            <span className="text-ink-muted">Pick up where you left off?</span>
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                dispatch({ type: "restore", state: draft });
                setDraft(null);
              }}
            >
              Resume
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY);
                setDraft(null);
              }}
            >
              Start fresh
            </Button>
          </div>
        </div>
      ) : null}

      <section aria-labelledby="step-title" className="mt-10 flex-1 animate-rise" key={state.step}>
        <h1
          id="step-title"
          ref={headingRef}
          tabIndex={-1}
          className="max-w-3xl text-4xl outline-none sm:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-muted">{lead}</p>
        <div className="mt-10">
          {state.step === "arrive" && <ArriveStep state={state} dispatch={dispatch} />}
          {state.step === "breathe" && <BreatheStep state={state} dispatch={dispatch} />}
          {state.step === "scan" && <ScanStep state={state} dispatch={dispatch} />}
          {state.step === "locate" && <LocateStep state={state} dispatch={dispatch} />}
          {state.step === "color" && <ColorStep state={state} dispatch={dispatch} />}
          {state.step === "shape" && <ShapeStep state={state} dispatch={dispatch} />}
          {state.step === "texture" && <TextureStep state={state} dispatch={dispatch} />}
          {state.step === "intensity" && <IntensityStep state={state} dispatch={dispatch} />}
          {state.step === "observe" && <ObserveStep state={state} dispatch={dispatch} />}
          {state.step === "recheck" && <RecheckStep state={state} dispatch={dispatch} />}
          {state.step === "shift" && <ShiftStep state={state} dispatch={dispatch} />}
          {state.step === "close" && (
            <CloseStep
              state={state}
              status={status}
              onRetry={() => setStatus({ state: "idle" })}
              onRestart={() => {
                setStatus({ state: "idle" });
                dispatch({ type: "reset", now: 0 });
              }}
            />
          )}
        </div>
      </section>

      {showNav ? (
        <div className="sticky bottom-0 -mx-4 mt-10 flex items-center justify-between gap-3 border-t border-line bg-canvas/90 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-full sm:border sm:px-3 sm:py-3">
          {state.step !== "arrive" ? (
            <Button variant="ghost" onClick={() => dispatch({ type: "back" })}>
              <ArrowLeft className="size-4" aria-hidden="true" /> Back
            </Button>
          ) : (
            <span />
          )}
          <Button onClick={next} disabled={!canAdvance(state)} variant={skipLabel ? "secondary" : "primary"}>
            {skipLabel ?? nextLabel ?? "Continue"} <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function CloseStep({
  state,
  status,
  onRetry,
  onRestart,
}: {
  state: CheckInState;
  status: SaveStatus;
  onRetry: () => void;
  onRestart: () => void;
}) {
  const after = state.after;
  const delta = after ? after.intensity - state.before.intensity : 0;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 items-center gap-6 rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="relative flex items-center justify-center gap-3">
          {status.state === "saved" ? (
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
              {[0, 0.5, 1].map((delay) => (
                <span
                  key={delay}
                  className="absolute size-28 animate-bloom rounded-full border-2 border-primary/50"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </span>
          ) : null}
          <DraftOrb
            draft={state.before}
            className="size-24 sm:size-28"
            label={`Before: ${describeDraft(state.before)}`}
          />
          {after && state.shifted ? (
            <>
              <ArrowRight className="size-5 text-ink-muted" aria-hidden="true" />
              <DraftOrb
                draft={after}
                className="size-24 sm:size-28"
                label={`After: ${describeDraft(after)}`}
              />
            </>
          ) : null}
        </div>
        <div>
          <p className="font-display text-3xl">
            {!state.shifted
              ? "It held steady"
              : delta < 0
                ? `It eased by ${Math.abs(delta)}`
                : delta > 0
                  ? `It grew by ${delta}`
                  : "It changed shape"}
          </p>
          <p className="mt-2 text-ink-muted">
            {!state.shifted
              ? "Not every feeling moves in a minute. Noticing it clearly still counts."
              : delta > 0
                ? "Sometimes attention makes a feeling louder before it settles. Be gentle with yourself."
                : "Feelings tend to soften when they're met rather than pushed away."}
          </p>
          {state.emotions.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Feelings you named">
              {state.emotions.map((emotion) => (
                <li
                  key={emotion}
                  className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary"
                >
                  {emotion}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div aria-live="polite" className="min-h-6">
        {status.state === "saving" ? (
          <p className="inline-flex items-center gap-2 text-ink-muted">
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Saving to your nest…
          </p>
        ) : status.state === "saved" ? (
          <p className="inline-flex items-center gap-2 font-semibold text-sage">
            <Check className="size-4" aria-hidden="true" /> Saved to your nest
          </p>
        ) : status.state === "error" ? (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-danger-soft p-4 text-danger">
            <p className="font-medium">{status.message}</p>
            <Button size="sm" variant="secondary" onClick={onRetry}>
              <RotateCcw className="size-4" aria-hidden="true" /> Try again
            </Button>
          </div>
        ) : null}
      </div>

      {status.state === "saved" ? (
        <div className="flex flex-wrap gap-3">
          <LinkButton href={`/journal/new?checkIn=${status.id}`} size="lg">
            Write about it
          </LinkButton>
          <LinkButton href="/nest" size="lg" variant="secondary">
            Back to your nest
          </LinkButton>
          <Button size="lg" variant="ghost" onClick={onRestart}>
            Check in again
          </Button>
        </div>
      ) : null}

      {status.state === "saved" ? (
        <NextSteps
          emotions={state.emotions}
          intensity={(after ?? state.before).intensity}
          eased={delta < 0}
        />
      ) : null}

      <p className="text-sm text-ink-muted">
        If what you&rsquo;re feeling is too much to hold alone, please reach out to someone you trust or{" "}
        <a href="https://findahelpline.com" className="font-medium text-primary underline underline-offset-4">
          find a free helpline
        </a>
        .
      </p>
    </div>
  );
}
