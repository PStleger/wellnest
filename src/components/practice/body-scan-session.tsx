"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { BodyScanGuide } from "@/components/somatic/body-scan-guide";
import { Button } from "@/components/ui/button";

import { PracticeCompletion } from "./practice-completion";

export function BodyScanSession() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  if (duration !== null) {
    return (
      <PracticeCompletion kind="body-scan" durationSeconds={duration}>
        <Button variant="secondary" onClick={() => setDuration(null)}>
          Scan again
        </Button>
      </PracticeCompletion>
    );
  }

  if (startedAt === null) {
    return (
      <div className="text-center">
        <Button size="lg" onClick={() => setStartedAt(Date.now())}>
          <Play className="size-4" aria-hidden="true" /> Begin the scan
        </Button>
        <p className="mt-3 text-sm text-ink-muted">
          About two minutes. Turn on &ldquo;Read aloud&rdquo; to close your eyes.
        </p>
      </div>
    );
  }

  return <BodyScanGuide onComplete={() => setDuration(Math.round((Date.now() - startedAt) / 1000))} />;
}
