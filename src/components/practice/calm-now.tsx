"use client";

import { CloudRain, Footprints, HeartHandshake, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BreathingPlayer } from "@/components/somatic/breathing-player";
import { useSoundscape } from "@/components/sound/soundscape-provider";
import { cn } from "@/lib/utils";

import { PracticeCompletion } from "./practice-completion";

const reassurances = [
  "You don't have to fix anything right now.",
  "Let each breath out be a little longer than the breath in.",
  "Feel your feet on the floor. Let the ground take your weight.",
  "Feelings rise, peak and pass, like waves.",
  "Let your shoulders drop, just a little.",
  "You've got through hard moments before.",
  "Soften your jaw. Unclench your hands.",
];

/** A quiet, dark space for hard moments: a breathing orb, kind words, and ways out. */
export function CalmNow() {
  const [line, setLine] = useState(0);
  const [finished, setFinished] = useState<number | null>(null);
  const { playing, toggle } = useSoundscape();

  useEffect(() => {
    const interval = window.setInterval(() => setLine((value) => (value + 1) % reassurances.length), 9000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div>
        <h1 className="text-4xl sm:text-5xl">Let&rsquo;s slow things down</h1>
        <p
          key={line}
          aria-live="polite"
          className="mx-auto mt-4 min-h-14 max-w-md animate-rise text-lg text-ink-muted"
        >
          {reassurances[line]}
        </p>
      </div>

      {finished === null ? (
        <BreathingPlayer
          initialPattern="exhale"
          choosePattern={false}
          lengths={[null]}
          defaultLength={null}
          autoStart
          onFinish={(summary) => setFinished(summary.seconds)}
        />
      ) : (
        <PracticeCompletion kind="calm" pattern="exhale" durationSeconds={finished}>
          <button
            type="button"
            onClick={() => setFinished(null)}
            className="min-h-11 rounded-full px-5 font-semibold text-ink-muted hover:text-ink"
          >
            Keep breathing
          </button>
        </PracticeCompletion>
      )}

      <nav aria-label="Other things that might help" className="w-full max-w-2xl">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <li>
            <Link href="/practices/grounding" className={tile}>
              <Footprints className="size-5" aria-hidden="true" />
              Ground me
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-pressed={playing === "rain"}
              onClick={() => toggle("rain")}
              className={cn(tile, "w-full", playing === "rain" && "border-primary bg-primary-soft")}
            >
              <CloudRain className="size-5" aria-hidden="true" />
              Soft rain
            </button>
          </li>
          <li>
            <a href="https://findahelpline.com" className={tile}>
              <HeartHandshake className="size-5" aria-hidden="true" />
              Talk to someone
            </a>
          </li>
          <li>
            <Link href="/" className={tile}>
              <Sun className="size-5" aria-hidden="true" />I feel steadier
            </Link>
          </li>
        </ul>
      </nav>

      <p className="max-w-lg text-sm text-ink-muted">
        If you are in danger or thinking about ending your life, please call your local emergency number now,
        or find free, confidential support at{" "}
        <a
          href="https://findahelpline.com"
          className="font-semibold text-primary underline underline-offset-4"
        >
          findahelpline.com
        </a>
        .
      </p>
    </div>
  );
}

const tile =
  "flex min-h-24 flex-col items-center justify-center gap-2 rounded-3xl border border-line bg-surface/70 p-4 font-semibold backdrop-blur transition hover:border-line-strong hover:bg-surface";
