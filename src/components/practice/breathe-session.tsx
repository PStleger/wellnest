"use client";

import Link from "next/link";

import { BreathingPlayer } from "@/components/somatic/breathing-player";
import { buttonStyles } from "@/components/ui/button";
import type { BreathPatternId } from "@/lib/somatic/breathing";

import { PracticeCompletion } from "./practice-completion";

export function BreatheSession({ pattern }: { pattern: BreathPatternId }) {
  return (
    <BreathingPlayer
      initialPattern={pattern}
      doneSlot={(summary) => (
        <PracticeCompletion kind="breathing" pattern={summary.pattern} durationSeconds={summary.seconds}>
          <Link href="/check-in" className={buttonStyles({ variant: "secondary" })}>
            Check in with your body
          </Link>
        </PracticeCompletion>
      )}
    />
  );
}
