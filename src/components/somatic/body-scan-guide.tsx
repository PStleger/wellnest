"use client";

import { ChevronLeft, ChevronRight, MessageCircle, Pause, Play } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { setPref, usePref } from "@/lib/prefs";
import { bodyScanSteps } from "@/lib/somatic/body-scan";
import { cn } from "@/lib/utils";

import { BodyFigure } from "./body-figure";

export function BodyScanGuide({
  onComplete,
  autoPlay = true,
}: {
  onComplete?: () => void;
  autoPlay?: boolean;
}) {
  const voice = usePref("voice");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [elapsed, setElapsed] = useState(0);
  const step = bodyScanSteps[index]!;
  const last = index === bodyScanSteps.length - 1;
  // A little longer per part when it is being read aloud.
  const STEP_MS = voice ? 18_000 : 14_000;
  const complete = useEffectEvent(() => onComplete?.());

  const narrate = useEffectEvent(() => {
    if (!voice || !playing) return;
    void import("@/lib/audio/cues").then(({ speak }) => speak(`${step.title}. ${step.text}`));
  });

  // Read each part aloud as it arrives (and stop talking when paused or unmounted).
  useEffect(() => {
    narrate();
  }, [index, playing, voice]);

  useEffect(() => {
    if (playing && voice) return;
    void import("@/lib/audio/cues").then(({ stopSpeaking }) => stopSpeaking());
  }, [playing, voice]);

  useEffect(() => () => void import("@/lib/audio/cues").then(({ stopSpeaking }) => stopSpeaking()), []);

  useEffect(() => {
    if (!playing) return;
    const started = performance.now() - elapsed;
    const timer = window.setInterval(() => {
      const now = performance.now() - started;
      if (now >= STEP_MS) {
        if (last) {
          setPlaying(false);
          setElapsed(STEP_MS);
          complete();
        } else {
          setIndex((value) => value + 1);
          setElapsed(0);
        }
      } else {
        setElapsed(now);
      }
    }, 200);
    return () => window.clearInterval(timer);
    // `elapsed` is read once when (re)starting; including it would restart every tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, last, STEP_MS]);

  function go(to: number) {
    setIndex(Math.max(0, Math.min(bodyScanSteps.length - 1, to)));
    setElapsed(0);
    if (to >= bodyScanSteps.length - 1) onComplete?.();
  }

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,14rem)_1fr]">
      <BodyFigure highlight={step.regions} className="mx-auto h-72 w-auto md:h-96" />
      <div>
        <p className="text-sm font-semibold text-primary">
          {index + 1} of {bodyScanSteps.length}
        </p>
        <div aria-live="polite" className="mt-2 min-h-44">
          <h2 className="text-3xl">{step.title}</h2>
          <p className="mt-3 text-xl leading-relaxed text-ink">{step.text}</p>
        </div>
        <div
          role="progressbar"
          aria-label="Time on this part of the scan"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((elapsed / STEP_MS) * 100)}
          className="mt-6 h-1.5 overflow-hidden rounded-full bg-surface-2"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-200 ease-linear"
            style={{ width: `${(elapsed / STEP_MS) * 100}%` }}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => go(index - 1)} disabled={index === 0}>
            <ChevronLeft className="size-4" aria-hidden="true" /> Previous
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setPlaying((value) => !value)}>
            {playing ? (
              <>
                <Pause className="size-4" aria-hidden="true" /> Pause
              </>
            ) : (
              <>
                <Play className="size-4" aria-hidden="true" /> Play
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => go(index + 1)} disabled={last}>
            Next <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
          <button
            type="button"
            aria-pressed={voice}
            onClick={() => setPref("voice", !voice)}
            className={cn(
              "ml-auto inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
              voice ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
            )}
          >
            <MessageCircle className="size-4" aria-hidden="true" /> Read aloud
          </button>
        </div>
        <ol className="mt-6 flex gap-1.5" aria-hidden="true">
          {bodyScanSteps.map((item, position) => (
            <li
              key={item.title}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                position <= index ? "bg-primary" : "bg-surface-2",
              )}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
