import Link from "next/link";

import { type BreathPattern } from "@/lib/somatic/breathing";

import { BreatheSession } from "./breathe-session";

/** Shared by /breathe and each /breathe/[pattern] page. */
export function BreathePage({ pattern, isDefault }: { pattern: BreathPattern; isDefault?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 sm:pt-16">
      <p className="text-sm font-semibold text-primary">Breathe</p>
      <h1 className="mt-2 text-5xl sm:text-6xl">{isDefault ? "Take a slow breath with me" : pattern.name}</h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-ink-muted">
        {isDefault
          ? "Choose a rhythm and follow the orb: it swells as you breathe in and settles as you breathe out. Turn on a soft bell or spoken guidance if you'd like to close your eyes."
          : `${pattern.tagline}. ${pattern.description}`}
      </p>
      <div className="mt-12">
        <BreatheSession pattern={pattern.id} />
      </div>
      <p className="mx-auto mt-14 max-w-xl text-ink-muted">
        Curious why this helps? Read about{" "}
        <Link
          href="/library/box-breathing"
          className="font-semibold text-primary underline underline-offset-4"
        >
          box breathing
        </Link>{" "}
        and{" "}
        <Link
          href="/library/physiological-sigh"
          className="font-semibold text-primary underline underline-offset-4"
        >
          the physiological sigh
        </Link>
        .
      </p>
    </div>
  );
}
