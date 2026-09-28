"use client";

import { useEffect, useState } from "react";

import { BodyScanGuide } from "@/components/somatic/body-scan-guide";
import { BreathingPlayer } from "@/components/somatic/breathing-player";
import {
  ColorPicker,
  IntensitySlider,
  intensityWord,
  PreviewOrb,
  RegionPicker,
  ShapePicker,
  TexturePicker,
} from "@/components/somatic/pickers";
import { Orb } from "@/components/somatic/orb";
import { Choice } from "@/components/ui/choice";
import { Field, Textarea } from "@/components/ui/field";
import { Tabs } from "@/components/ui/tabs";
import type { CheckInAction, CheckInState, SensationDraft } from "@/lib/somatic/check-in-machine";
import { MAX_EMOTIONS } from "@/lib/somatic/check-in-machine";
import { describeColor } from "@/lib/somatic/colors";
import { emotionGroups } from "@/lib/somatic/emotions";
import { regionLabel } from "@/lib/somatic/regions";
import { getShape } from "@/lib/somatic/shapes";
import { getTexture } from "@/lib/somatic/textures";

type StepProps = { state: CheckInState; dispatch: (action: CheckInAction) => void };

export function DraftOrb({
  draft,
  className,
  label,
}: {
  draft: SensationDraft;
  className?: string;
  label?: string;
}) {
  if (!draft.shape || !draft.texture) return null;
  return (
    <Orb
      color={draft.color}
      shape={draft.shape === "custom" && !draft.customPath ? "ball" : draft.shape}
      customPath={draft.customPath}
      texture={draft.texture}
      className={className}
      label={label}
    />
  );
}

export function describeDraft(draft: SensationDraft) {
  const parts = [
    draft.shape === "custom" ? "a shape you drew" : draft.shape ? getShape(draft.shape)?.description : null,
    describeColor(draft.color),
    draft.texture ? getTexture(draft.texture).description : null,
  ].filter(Boolean);
  const where = draft.region ? ` in your ${regionLabel(draft.region).toLowerCase()}` : "";
  return `${parts.join(", ")}${where}, ${draft.intensity} out of 10`;
}

export function ArriveStep({ state, dispatch }: StepProps) {
  const atLimit = state.emotions.length >= MAX_EMOTIONS;
  return (
    <div className="space-y-8">
      <Field id="feeling" label="In your own words" hint="Optional. A word or a sentence is plenty.">
        {(props) => (
          <Textarea
            {...props}
            name="feeling"
            maxLength={500}
            placeholder="Wired, a bit flat, not sure…"
            value={state.feeling}
            onChange={(event) => dispatch({ type: "setFeeling", feeling: event.target.value })}
            className="min-h-28"
          />
        )}
      </Field>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Any of these fit?</legend>
        <p className="mt-1 text-sm text-ink-muted">
          Choose up to {MAX_EMOTIONS}. There are no wrong answers.
        </p>
        <div className="mt-4 space-y-4">
          {emotionGroups.map((group) => (
            <div key={group.label} className="flex flex-wrap items-center gap-2">
              <span className="w-20 text-sm text-ink-muted" aria-hidden="true">
                {group.label}
              </span>
              {group.emotions.map((emotion) => {
                const checked = state.emotions.includes(emotion);
                return (
                  <Choice
                    key={emotion}
                    type="checkbox"
                    name="emotions"
                    value={emotion}
                    checked={checked}
                    disabled={!checked && atLimit}
                    onChange={() => dispatch({ type: "toggleEmotion", emotion })}
                  >
                    {emotion}
                  </Choice>
                );
              })}
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export function BreatheStep({ dispatch }: StepProps) {
  return (
    <BreathingPlayer
      compact
      autoStart
      initialPattern="box"
      lengths={[null]}
      defaultLength={null}
      onCycle={() => dispatch({ type: "breathRound" })}
    />
  );
}

export function ScanStep({ dispatch }: StepProps) {
  return <BodyScanGuide onComplete={() => dispatch({ type: "scanComplete" })} />;
}

export function LocateStep({ state, dispatch }: StepProps) {
  return (
    <RegionPicker
      value={state.before.region}
      onChange={(region) => dispatch({ type: "update", target: "before", patch: { region } })}
    />
  );
}

export function ColorStep({ state, dispatch }: StepProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_16rem]">
      <ColorPicker
        value={state.before.color}
        onChange={(color) => dispatch({ type: "update", target: "before", patch: { color } })}
      />
      <PreviewOrb color={state.before.color} shape={state.before.shape} texture={state.before.texture} />
    </div>
  );
}

export function ShapeStep({ state, dispatch }: StepProps) {
  return (
    <ShapePicker
      value={state.before.shape}
      color={state.before.color}
      texture={state.before.texture}
      onChange={(shape, customPath) =>
        dispatch({ type: "update", target: "before", patch: { shape, customPath } })
      }
    />
  );
}

export function TextureStep({ state, dispatch }: StepProps) {
  return (
    <TexturePicker
      value={state.before.texture}
      color={state.before.color}
      onChange={(texture) => dispatch({ type: "update", target: "before", patch: { texture } })}
    />
  );
}

export function IntensityStep({ state, dispatch }: StepProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_16rem]">
      <IntensitySlider
        value={state.before.intensity}
        onChange={(intensity) => dispatch({ type: "update", target: "before", patch: { intensity } })}
      />
      <PreviewOrb
        color={state.before.color}
        shape={state.before.shape}
        customPath={state.before.customPath}
        texture={state.before.texture}
        intensity={state.before.intensity}
      />
    </div>
  );
}

const observePrompts = [
  "Let your attention rest on it, as if it were an object in front of you.",
  "Does it have edges? Where does it begin and end?",
  "Is it moving, or still?",
  "Is it warm or cool?",
  "Breathe into the space around it.",
  "Has anything changed, even slightly?",
];

const OBSERVE_SECONDS = 60;

export function ObserveStep({ state }: StepProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const started = Date.now();
    const timer = window.setInterval(() => {
      const seconds = Math.floor((Date.now() - started) / 1000);
      setElapsed(Math.min(OBSERVE_SECONDS, seconds));
      if (seconds >= OBSERVE_SECONDS) window.clearInterval(timer);
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  const prompt = observePrompts[Math.min(observePrompts.length - 1, Math.floor(elapsed / 10))]!;
  const circumference = 2 * Math.PI * 46;

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="relative size-72 sm:size-80">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--surface-2)" strokeWidth="2" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - elapsed / OBSERVE_SECONDS)}
            className="transition-[stroke-dashoffset] duration-300 ease-linear"
          />
        </svg>
        <div className="absolute inset-10 grid place-items-center">
          <div className="animate-breathe">
            <DraftOrb
              draft={state.before}
              className="size-44 sm:size-52"
              label={describeDraft(state.before)}
            />
          </div>
        </div>
      </div>
      <p aria-live="polite" className="min-h-16 max-w-md font-display text-2xl text-ink">
        {prompt}
      </p>
      <p className="text-sm text-ink-muted" role="timer" aria-live="off">
        {elapsed < OBSERVE_SECONDS
          ? `${OBSERVE_SECONDS - elapsed} seconds`
          : "Take all the time you need. Continue when you're ready."}
      </p>
    </div>
  );
}

export function RecheckStep({ state, dispatch }: StepProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <DraftOrb draft={state.before} className="size-40" label={describeDraft(state.before)} />
      <p className="max-w-md text-lg text-ink-muted">Earlier it felt like {describeDraft(state.before)}.</p>
      <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "recheck", shifted: true })}
          className="min-h-28 rounded-3xl border border-line bg-surface p-5 text-left shadow-soft transition hover:border-primary hover:shadow-lift"
        >
          <span className="block font-display text-2xl">Something shifted</span>
          <span className="mt-1 block text-sm text-ink-muted">
            Location, colour, shape, texture or strength
          </span>
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "recheck", shifted: false })}
          className="min-h-28 rounded-3xl border border-line bg-surface p-5 text-left shadow-soft transition hover:border-primary hover:shadow-lift"
        >
          <span className="block font-display text-2xl">It feels the same</span>
          <span className="mt-1 block text-sm text-ink-muted">That&rsquo;s useful to know too</span>
        </button>
      </div>
    </div>
  );
}

export function ShiftStep({ state, dispatch }: StepProps) {
  const after = state.after;
  if (!after) return null;
  const update = (patch: Partial<SensationDraft>) => dispatch({ type: "update", target: "after", patch });

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_15rem]">
      <Tabs
        label="What changed"
        tabs={[
          {
            id: "intensity",
            label: "Strength",
            content: (
              <IntensitySlider
                value={after.intensity}
                onChange={(intensity) => update({ intensity })}
                label="Strength now"
              />
            ),
          },
          {
            id: "color",
            label: "Colour",
            content: (
              <ColorPicker name="after-color" value={after.color} onChange={(color) => update({ color })} />
            ),
          },
          {
            id: "shape",
            label: "Shape",
            content: (
              <ShapePicker
                name="after-shape"
                value={after.shape}
                color={after.color}
                texture={after.texture}
                onChange={(shape, customPath) => update({ shape, customPath })}
              />
            ),
          },
          {
            id: "texture",
            label: "Texture",
            content: (
              <TexturePicker
                name="after-texture"
                value={after.texture}
                color={after.color}
                onChange={(texture) => update({ texture })}
              />
            ),
          },
          {
            id: "location",
            label: "Location",
            content: (
              <RegionPicker
                name="after-region"
                value={after.region}
                color={after.color}
                onChange={(region) => update({ region })}
              />
            ),
          },
        ]}
      />
      <div className="flex items-center justify-center gap-4 lg:flex-col lg:justify-start">
        <figure className="text-center">
          <DraftOrb draft={state.before} className="size-24 opacity-70" />
          <figcaption className="mt-1 text-sm text-ink-muted">Before · {state.before.intensity}</figcaption>
        </figure>
        <span aria-hidden="true" className="text-2xl text-ink-muted lg:rotate-90">
          →
        </span>
        <figure className="text-center">
          <DraftOrb draft={after} className="size-32" />
          <figcaption className="mt-1 text-sm font-semibold">
            Now · {after.intensity} ({intensityWord(after.intensity)})
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
