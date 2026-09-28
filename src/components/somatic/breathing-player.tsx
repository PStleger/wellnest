"use client";

import { Bell, BellOff, MessageCircle, Pause, Play, RotateCcw, Vibrate } from "lucide-react";
import { type ReactNode, useEffect, useEffectEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Choice } from "@/components/ui/choice";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { setPref, usePref } from "@/lib/prefs";
import {
  breathAt,
  type BreathPatternId,
  breathPatterns,
  cycleSeconds,
  getPattern,
  type PhaseKind,
  sessionCycles,
} from "@/lib/somatic/breathing";
import { cn } from "@/lib/utils";

import { Orb } from "./orb";

type Status = "idle" | "countdown" | "running" | "paused" | "done";

export type BreathingSummary = { pattern: BreathPatternId; seconds: number; cycles: number };

type BreathingPlayerProps = {
  initialPattern?: BreathPatternId;
  choosePattern?: boolean;
  /** Session lengths in minutes; null means open-ended. */
  lengths?: (number | null)[];
  defaultLength?: number | null;
  autoStart?: boolean;
  compact?: boolean;
  onCycle?: (cycles: number) => void;
  onFinish?: (summary: BreathingSummary) => void;
  /** Rendered under the summary when a session ends (e.g. a feelings check). */
  doneSlot?: (summary: BreathingSummary) => ReactNode;
  className?: string;
};

const RADIUS = 92;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const phaseStroke: Record<PhaseKind, string> = {
  in: "var(--breath)",
  "hold-in": "var(--line-strong)",
  out: "var(--sage)",
  "hold-out": "var(--line-strong)",
};

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return minutes ? `${minutes} min${rest ? ` ${rest} s` : ""}` : `${rest} s`;
}

export function BreathingPlayer({
  initialPattern = "exhale",
  choosePattern = true,
  lengths = [1, 3, 5, null],
  defaultLength = 3,
  autoStart = false,
  compact = false,
  onCycle,
  onFinish,
  doneSlot,
  className,
}: BreathingPlayerProps) {
  const reducedMotion = useReducedMotion();
  const tone = usePref("tone");
  const haptics = usePref("haptics");
  const voice = usePref("voice");

  const [patternId, setPatternId] = useState<BreathPatternId>(initialPattern);
  const [length, setLength] = useState<number | null>(defaultLength);
  const [status, setStatus] = useState<Status>(autoStart ? "countdown" : "idle");
  const [countdown, setCountdown] = useState(3);
  const [view, setView] = useState({ phaseIndex: 0, cycle: 0, secondsLeft: 0, elapsed: 0 });
  const [summary, setSummary] = useState<BreathingSummary | null>(null);

  const pattern = getPattern(patternId);
  const phase = pattern.phases[view.phaseIndex]!;
  const targetCycles = length === null ? Infinity : sessionCycles(pattern, length);

  const elapsed = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  function cue(kind: PhaseKind | "end", label?: string) {
    if (tone) void import("@/lib/audio/cues").then(({ playTone }) => playTone(kind));
    if (haptics) void import("@/lib/audio/cues").then(({ vibrate }) => vibrate(kind));
    if (voice && label) void import("@/lib/audio/cues").then(({ speak }) => speak(label));
  }

  const cueFromClock = useEffectEvent(cue);

  const reportCycle = useEffectEvent((cycles: number) => onCycle?.(cycles));

  function complete() {
    const cycles = Number.isFinite(targetCycles) ? targetCycles : view.cycle + 1;
    const result = { pattern: pattern.id, seconds: Math.round(elapsed.current / 1000), cycles };
    cue("end", "Well done. Let your breath return to its own rhythm.");
    setSummary(result);
    setStatus("done");
    onFinish?.(result);
  }

  const finish = useEffectEvent(complete);

  // 3-2-1 lead-in; the last tick starts the session.
  useEffect(() => {
    if (status !== "countdown") return;
    const timeout = window.setTimeout(() => {
      if (countdown <= 1) setStatus("running");
      else setCountdown(countdown - 1);
    }, 900);
    return () => window.clearTimeout(timeout);
  }, [status, countdown]);

  // The breathing clock. Per-frame visuals are written straight to the DOM.
  useEffect(() => {
    if (status !== "running") return;
    let frame = 0;
    let last = performance.now();
    let lastPhase = -1;
    let lastCycle = -1;
    let lastSecond = -1;

    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const state = breathAt(pattern, elapsed.current);

      if (state.cycle >= targetCycles) {
        finish();
        return;
      }

      const scale = reducedMotion ? 1 : 0.62 + 0.38 * state.level;
      if (orbRef.current) orbRef.current.style.transform = `scale(${scale})`;
      if (haloRef.current) {
        haloRef.current.style.opacity = String(0.25 + 0.5 * state.level);
        if (!reducedMotion) haloRef.current.style.transform = `scale(${0.7 + 0.45 * state.level})`;
      }
      if (markerRef.current) markerRef.current.style.transform = `rotate(${state.cycleProgress * 360}deg)`;

      if (state.phaseIndex !== lastPhase || state.cycle !== lastCycle) {
        if (state.cycle !== lastCycle && lastCycle !== -1) reportCycle(state.cycle);
        lastPhase = state.phaseIndex;
        lastCycle = state.cycle;
        cueFromClock(state.phase.kind, state.phase.label);
      }
      if (state.secondsLeft !== lastSecond || state.phaseIndex !== lastPhase) {
        lastSecond = state.secondsLeft;
        setView({
          phaseIndex: state.phaseIndex,
          cycle: state.cycle,
          secondsLeft: state.secondsLeft,
          elapsed: Math.floor(elapsed.current / 1000),
        });
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status, pattern, targetCycles, reducedMotion]);

  // Keep the screen awake while breathing, so a phone doesn't dim mid-session.
  useEffect(() => {
    if (status !== "running" || !("wakeLock" in navigator)) return;
    let cancelled = false;
    const acquire = () =>
      navigator.wakeLock
        .request("screen")
        .then((sentinel) => {
          if (cancelled) void sentinel.release();
          else wakeLock.current = sentinel;
        })
        .catch(() => undefined);
    void acquire();
    const onVisible = () => document.visibilityState === "visible" && void acquire();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      void wakeLock.current?.release();
      wakeLock.current = null;
    };
  }, [status]);

  function start() {
    // Unlock audio inside the click so cues can play later.
    if (tone) void import("@/lib/audio/context").then(({ audioContext }) => audioContext());
    elapsed.current = 0;
    setSummary(null);
    setView({ phaseIndex: 0, cycle: 0, secondsLeft: Math.ceil(pattern.phases[0]!.seconds), elapsed: 0 });
    setCountdown(3);
    setStatus("countdown");
    stageRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  }

  function reset() {
    elapsed.current = 0;
    setStatus("idle");
    setSummary(null);
    setView({ phaseIndex: 0, cycle: 0, secondsLeft: 0, elapsed: 0 });
    if (orbRef.current) orbRef.current.style.transform = "scale(0.62)";
    if (haloRef.current) {
      haloRef.current.style.opacity = "0.25";
      haloRef.current.style.transform = "scale(0.7)";
    }
    if (markerRef.current) markerRef.current.style.transform = "rotate(0deg)";
    void import("@/lib/audio/cues").then(({ stopSpeaking }) => stopSpeaking());
  }

  const active = status === "running" || status === "paused";
  const totalSeconds = length === null ? null : targetCycles * cycleSeconds(pattern);
  const remaining = totalSeconds === null ? null : Math.max(0, Math.round(totalSeconds - view.elapsed));

  /** Stopping after a real effort still counts; a false start just resets. */
  function stop() {
    if (view.elapsed >= 10) complete();
    else reset();
  }

  // Ring segments, proportional to each phase's length, with small gaps between.
  const cycle = cycleSeconds(pattern);
  const segments = pattern.phases.map((item, index) => {
    const before = pattern.phases.slice(0, index).reduce((total, previous) => total + previous.seconds, 0);
    const lengthOnRing = (item.seconds / cycle) * CIRCUMFERENCE;
    return {
      key: index,
      kind: item.kind,
      dash: Math.max(0, lengthOnRing - 6),
      offset: (before / cycle) * CIRCUMFERENCE,
    };
  });

  return (
    <div
      className={cn("flex flex-col items-center gap-7", className)}
      style={{ ["--breath" as string]: pattern.color }}
    >
      {choosePattern ? (
        <fieldset
          className="w-full transition-opacity duration-500"
          // Stays in place during a session (no layout jump) but fades and can't be changed.
          inert={active || status === "countdown"}
          style={{ opacity: active || status === "countdown" ? 0.35 : 1 }}
        >
          <legend className="sr-only">Breathing pattern</legend>
          <div
            className={cn(
              "flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1",
              compact ? "" : "justify-center",
            )}
          >
            {breathPatterns.map((item) => (
              <Choice
                key={item.id}
                name="breath-pattern"
                value={item.id}
                checked={patternId === item.id}
                onChange={() => {
                  setPatternId(item.id);
                  if (status === "done") reset();
                }}
                className="shrink-0 has-checked:animate-pop"
              >
                {item.name}
              </Choice>
            ))}
          </div>
          {!compact ? (
            <p className="mx-auto mt-4 max-w-md text-center text-ink-muted">
              <span className="font-semibold text-ink">{pattern.tagline}.</span> {pattern.description}
              {pattern.caution ? <span className="mt-1 block text-sm">{pattern.caution}</span> : null}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      {/* Stage */}
      <div
        ref={stageRef}
        className={cn("relative aspect-square w-full scroll-mt-28", compact ? "max-w-64" : "max-w-80")}
      >
        <div
          ref={haloRef}
          aria-hidden="true"
          className="absolute inset-[6%] rounded-full opacity-25 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--breath) 55%, transparent) 0%, transparent 68%)",
            transform: "scale(0.7)",
          }}
        />
        <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
          {segments.map((segment) => (
            <circle
              key={segment.key}
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={phaseStroke[segment.kind]}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${segment.dash} ${CIRCUMFERENCE}`}
              strokeDashoffset={-segment.offset - 3}
              opacity={segment.key === view.phaseIndex && active ? 1 : 0.45}
              className="transition-opacity duration-500"
            />
          ))}
          {!reducedMotion ? (
            <g ref={markerRef} style={{ transformOrigin: "100px 100px" }}>
              <circle
                cx={100 + RADIUS}
                cy="100"
                r="6"
                fill="var(--breath)"
                stroke="var(--surface)"
                strokeWidth="3"
              />
            </g>
          ) : null}
        </svg>
        <div
          ref={orbRef}
          aria-hidden="true"
          className="absolute inset-[22%] will-change-transform"
          style={{ transform: "scale(0.62)" }}
        >
          <Orb color={pattern.color} shape="ball" texture="soft" className="size-full" />
        </div>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p
            aria-live="assertive"
            className="font-display text-3xl text-ink drop-shadow-[0_1px_8px_var(--canvas)] sm:text-4xl"
          >
            {status === "countdown"
              ? countdown || "Begin"
              : active
                ? phase.label
                : status === "done"
                  ? "Well done"
                  : "Ready"}
          </p>
          <p aria-hidden="true" className="mt-2 flex min-h-8 justify-center">
            {status === "countdown" || active ? (
              <span className="rounded-full bg-surface/80 px-3 py-0.5 text-base font-semibold text-ink tabular-nums shadow-soft backdrop-blur-sm">
                {status === "countdown" ? "Get comfortable" : view.secondsLeft}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      <p className="-mt-2 min-h-6 text-sm text-ink-muted" aria-live="off">
        {active
          ? `Breath ${view.cycle + 1}${targetCycles !== Infinity ? ` of ${targetCycles}` : ""}${
              remaining !== null ? ` · about ${formatDuration(remaining)} left` : ""
            }`
          : status === "done" && summary
            ? `${formatDuration(summary.seconds)} · ${summary.cycles} breaths`
            : `${pattern.name}: ${pattern.phases.map((item) => item.seconds).join("-")} seconds`}
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {status === "idle" || status === "done" ? (
          <Button size="lg" onClick={start}>
            <Play className="size-4" aria-hidden="true" /> {status === "done" ? "Breathe again" : "Begin"}
          </Button>
        ) : status === "countdown" ? (
          <Button size="lg" variant="secondary" onClick={reset}>
            Cancel
          </Button>
        ) : (
          <>
            <Button
              size="lg"
              variant={status === "running" ? "secondary" : "primary"}
              onClick={() => setStatus(status === "running" ? "paused" : "running")}
            >
              {status === "running" ? (
                <>
                  <Pause className="size-4" aria-hidden="true" /> Pause
                </>
              ) : (
                <>
                  <Play className="size-4" aria-hidden="true" /> Resume
                </>
              )}
            </Button>
            <Button size="lg" variant="ghost" onClick={stop}>
              <RotateCcw className="size-4" aria-hidden="true" /> {length === null ? "Finish" : "Stop"}
            </Button>
          </>
        )}
      </div>

      {status === "idle" && lengths.length > 1 ? (
        <fieldset className="text-center">
          <legend className="mb-2 text-sm font-semibold text-ink-muted">Session length</legend>
          <div className="flex flex-wrap justify-center gap-2">
            {lengths.map((minutes) => (
              <Choice
                key={String(minutes)}
                name="breath-length"
                value={String(minutes)}
                checked={length === minutes}
                onChange={() => setLength(minutes)}
                className="has-checked:animate-pop"
              >
                {minutes === null ? "Open" : `${minutes} min`}
              </Choice>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div
        role="group"
        aria-label="Guidance cues"
        className="flex items-center gap-1 rounded-full bg-surface-2 p-1"
      >
        <CueToggle
          pressed={tone}
          onClick={() => setPref("tone", !tone)}
          label="Soft bell on each breath"
          icon={tone ? Bell : BellOff}
        />
        <CueToggle
          pressed={haptics}
          onClick={() => setPref("haptics", !haptics)}
          label="Vibrate on each breath (on supported phones)"
          icon={Vibrate}
        />
        <CueToggle
          pressed={voice}
          onClick={() => setPref("voice", !voice)}
          label="Spoken guidance"
          icon={MessageCircle}
        />
      </div>

      {status === "done" && summary && doneSlot ? (
        <div className="w-full animate-rise">{doneSlot(summary)}</div>
      ) : null}
    </div>
  );
}

function CueToggle({
  pressed,
  onClick,
  label,
  icon: Icon,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  icon: typeof Bell;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "grid size-10 place-items-center rounded-full transition-colors",
        pressed ? "bg-surface text-primary shadow-soft" : "text-ink-muted hover:text-ink",
      )}
    >
      <Icon className="size-4.5" aria-hidden="true" />
    </button>
  );
}
