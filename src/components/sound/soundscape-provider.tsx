"use client";

import { CloudRain, Timer, Volume2, Waves, Wind, X } from "lucide-react";
import { createContext, type ReactNode, use, useEffect, useRef, useState } from "react";

import { audioContext } from "@/lib/audio/context";
import type { Soundscape } from "@/lib/audio/soundscapes";
import { getSoundscape, type SoundscapeId } from "@/lib/audio/soundscape-list";
import { cn } from "@/lib/utils";

type SleepTimer = { minutes: number; endsAt: number };

type SoundscapeState = {
  playing: SoundscapeId | null;
  volume: number;
  timer: SleepTimer | null;
  play: (id: SoundscapeId) => void;
  stop: () => void;
  toggle: (id: SoundscapeId) => void;
  setVolume: (value: number) => void;
  setTimer: (minutes: number | null) => void;
};

const SoundscapeContext = createContext<SoundscapeState | null>(null);

export function useSoundscape() {
  const value = use(SoundscapeContext);
  if (!value) throw new Error("useSoundscape must be used inside SoundscapeProvider");
  return value;
}

export const soundscapeIcons: Record<SoundscapeId, typeof Waves> = {
  rain: CloudRain,
  ocean: Waves,
  wind: Wind,
  brown: Volume2,
};

/**
 * Lives in the root layout so a soundscape keeps playing across navigation.
 * The synthesis code is only downloaded the first time something plays.
 */
export function SoundscapeProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState<SoundscapeId | null>(null);
  const [volume, setVolumeState] = useState(0.6);
  const [timer, setTimerState] = useState<SleepTimer | null>(null);
  const engine = useRef<Soundscape | null>(null);
  const request = useRef(0);

  function play(id: SoundscapeId) {
    // Create the audio context inside the click, before any await, so browsers allow sound.
    audioContext();
    const ticket = ++request.current;
    setPlaying(id);
    void import("@/lib/audio/soundscapes").then(({ startSoundscape }) => {
      if (ticket !== request.current) return;
      engine.current?.stop(1);
      engine.current = startSoundscape(id, volume);
    });
  }

  function stop(fadeSeconds = 1.5) {
    request.current++;
    engine.current?.stop(fadeSeconds);
    engine.current = null;
    setPlaying(null);
    setTimerState(null);
  }

  const value: SoundscapeState = {
    playing,
    volume,
    timer,
    play,
    stop: () => stop(),
    toggle: (id) => (playing === id ? stop() : play(id)),
    setVolume(next) {
      setVolumeState(next);
      engine.current?.setVolume(next);
    },
    setTimer(minutes) {
      setTimerState(minutes ? { minutes, endsAt: Date.now() + minutes * 60_000 } : null);
    },
  };

  // Sleep timer: fade out gently when it runs out.
  const endsAt = timer?.endsAt;
  useEffect(() => {
    if (!endsAt) return;
    const timeout = window.setTimeout(() => stop(20), Math.max(0, endsAt - Date.now()));
    return () => window.clearTimeout(timeout);
  }, [endsAt]);

  useEffect(() => () => engine.current?.stop(0.2), []);

  return (
    <SoundscapeContext value={value}>
      {children}
      {playing ? <MiniPlayer state={value} id={playing} /> : null}
    </SoundscapeContext>
  );
}

const timerOptions = [15, 30, 60] as const;

/** Re-renders every 20 seconds so the sleep timer countdown stays current. */
function useClock(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const interval = window.setInterval(() => setNow(Date.now()), 20_000);
    return () => window.clearInterval(interval);
  }, [active]);
  return now;
}

function MiniPlayer({ state, id }: { state: SoundscapeState; id: SoundscapeId }) {
  const { name } = getSoundscape(id);
  const Icon = soundscapeIcons[id];
  const now = useClock(Boolean(state.timer));
  const minutesLeft = state.timer ? Math.max(1, Math.round((state.timer.endsAt - now) / 60_000)) : null;
  // Off → 15 → 30 → 60 → off
  const nextTimer =
    state.timer === null
      ? timerOptions[0]
      : (timerOptions[timerOptions.indexOf(state.timer.minutes as 15) + 1] ?? null);

  return (
    <section
      aria-label="Soundscape player"
      className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] z-50 mx-auto flex max-w-md animate-rise items-center gap-3 rounded-full border border-line bg-surface/95 py-2 pr-2 pl-4 shadow-lift backdrop-blur-md lg:inset-x-auto lg:bottom-6 lg:left-[18.5rem]"
    >
      <span aria-hidden="true" className="flex h-5 items-end gap-0.5">
        {[0, 1, 2].map((bar) => (
          <span
            key={bar}
            className="h-full w-1 origin-bottom animate-levels rounded-full bg-primary"
            style={{ animationDelay: `${bar * -0.35}s` }}
          />
        ))}
      </span>
      <Icon className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
      <p className="min-w-0 flex-1 truncate text-sm font-semibold">
        {name}
        {minutesLeft ? (
          <span className="font-normal text-ink-muted"> · stops in {minutesLeft} min</span>
        ) : null}
      </p>
      <label className="sr-only" htmlFor="soundscape-volume">
        Volume
      </label>
      <input
        id="soundscape-volume"
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={state.volume}
        onChange={(event) => state.setVolume(Number(event.target.value))}
        className="hidden w-20 sm:block"
      />
      <button
        type="button"
        onClick={() => state.setTimer(nextTimer)}
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full hover:bg-surface-2",
          state.timer ? "text-primary" : "text-ink-muted",
        )}
        aria-label={nextTimer ? `Stop after ${nextTimer} minutes` : "Turn off the sleep timer"}
        title="Sleep timer"
      >
        <Timer className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={state.stop}
        className="grid size-10 shrink-0 place-items-center rounded-full text-ink hover:bg-surface-2"
        aria-label={`Stop ${name}`}
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </section>
  );
}
