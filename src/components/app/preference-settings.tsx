"use client";

import { Bell, MessageCircle, Vibrate } from "lucide-react";

import { setPref, usePref } from "@/lib/prefs";
import { cn } from "@/lib/utils";

const motionOptions = [
  { value: "system", label: "Follow my device" },
  { value: "reduce", label: "Reduce motion" },
  { value: "full", label: "Full motion" },
] as const;

export function MotionSetting() {
  const motion = usePref("motion");
  return (
    <fieldset>
      <legend className="font-semibold">Motion</legend>
      <p className="mt-1 text-sm text-ink-muted">
        Reduce motion keeps everything still: no drifting light, breathing orbs that don&rsquo;t scale, and
        pages that swap without sliding.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {motionOptions.map((option) => (
          <label
            key={option.value}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line-strong px-4 font-medium has-checked:border-primary has-checked:bg-primary has-checked:text-on-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus)"
          >
            <input
              type="radio"
              name="motion"
              value={option.value}
              checked={motion === option.value}
              onChange={() => setPref("motion", option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const cues = [
  { key: "tone", label: "Soft bell", description: "A gentle tone at each change of breath.", icon: Bell },
  {
    key: "haptics",
    label: "Vibration",
    description: "A light buzz on each breath, on phones that support it.",
    icon: Vibrate,
  },
  {
    key: "voice",
    label: "Spoken guidance",
    description: "Breathing cues and body scan steps read aloud.",
    icon: MessageCircle,
  },
] as const;

export function CueSettings() {
  const values = { tone: usePref("tone"), haptics: usePref("haptics"), voice: usePref("voice") };
  return (
    <fieldset>
      <legend className="font-semibold">Guidance during practices</legend>
      <p className="mt-1 text-sm text-ink-muted">Useful when you&rsquo;d like to close your eyes.</p>
      <ul className="mt-4 space-y-2">
        {cues.map(({ key, label, description, icon: Icon }) => (
          <li key={key}>
            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-line p-4 has-focus-visible:outline-2 has-focus-visible:outline-(--focus)">
              <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="flex-1">
                <span className="block font-medium">{label}</span>
                <span className="block text-sm text-ink-muted">{description}</span>
              </span>
              <input
                type="checkbox"
                role="switch"
                checked={values[key]}
                onChange={(event) => setPref(key, event.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "relative h-7 w-12 shrink-0 rounded-full transition-colors",
                  values[key] ? "bg-primary" : "bg-line-strong",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 size-5 rounded-full bg-surface shadow-soft transition-transform duration-300 ease-spring",
                    values[key] && "translate-x-5",
                  )}
                />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
