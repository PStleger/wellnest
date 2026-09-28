"use client";

import { Pause, Play } from "lucide-react";

import { soundscapes } from "@/lib/audio/soundscape-list";
import { cn } from "@/lib/utils";

import { soundscapeIcons, useSoundscape } from "./soundscape-provider";

export function SoundscapePicker({ compact, className }: { compact?: boolean; className?: string }) {
  const { playing, toggle } = useSoundscape();

  return (
    <ul className={cn("grid gap-3", compact ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4", className)}>
      {soundscapes.map(({ id, name, description }) => {
        const Icon = soundscapeIcons[id];
        const on = playing === id;
        return (
          <li key={id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => toggle(id)}
              className={cn(
                "group flex h-full w-full items-center gap-3 rounded-3xl border p-4 text-left transition",
                on
                  ? "border-primary bg-primary-soft shadow-soft"
                  : "border-line bg-surface hover:border-line-strong hover:shadow-soft",
              )}
            >
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-2xl transition-colors",
                  on ? "bg-primary text-on-primary" : "bg-surface-2 text-ink group-hover:text-primary",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{name}</span>
                {!compact ? <span className="block text-sm text-ink-muted">{description}</span> : null}
              </span>
              {on ? (
                <Pause className="size-4 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <Play className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
