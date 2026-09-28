"use client";

import {
  Activity,
  CloudRain,
  Footprints,
  MessageCircleHeart,
  Moon,
  PenLine,
  Sparkles,
  Wind,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";

import { useSoundscape } from "@/components/sound/soundscape-provider";
import { type Suggestion, type SuggestionIcon, suggestNext } from "@/lib/somatic/suggestions";
import { cn } from "@/lib/utils";

const icons: Record<SuggestionIcon, typeof Wind> = {
  wind: Wind,
  footprints: Footprints,
  pen: PenLine,
  rain: CloudRain,
  moon: Moon,
  move: Activity,
  message: MessageCircleHeart,
  sparkles: Sparkles,
};

const card =
  "flex h-full w-full items-start gap-4 rounded-3xl border border-line bg-surface p-5 text-left transition";

/** "What might help next?": a few gentle options chosen from what was just noticed. */
export function NextSteps({
  emotions,
  intensity,
  eased,
}: {
  emotions: readonly string[];
  intensity: number;
  eased: boolean;
}) {
  const [hour] = useState(() => new Date().getHours());
  const { playing, toggle } = useSoundscape();
  // Writing already has its own button just above, so it isn't repeated here.
  const suggestions = suggestNext({ emotions, intensity, hour, eased }).filter(
    (suggestion) => !("journal" in suggestion.target),
  );

  function content(suggestion: Suggestion) {
    const Icon = icons[suggestion.icon];
    return (
      <>
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block font-semibold">{suggestion.title}</span>
          <span className="mt-0.5 block text-sm text-ink-muted">{suggestion.body}</span>
        </span>
      </>
    );
  }

  return (
    <section aria-labelledby="next-title">
      <h2 id="next-title" className="text-2xl">
        What might help next?
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id}
            className="animate-rise"
            style={{ animationDelay: `${150 + index * 120}ms` }}
          >
            {"href" in suggestion.target ? (
              <Link
                href={suggestion.target.href as Route}
                className={cn(card, "hover:border-line-strong hover:shadow-soft")}
              >
                {content(suggestion)}
              </Link>
            ) : "soundscape" in suggestion.target ? (
              <button
                type="button"
                aria-pressed={playing === suggestion.target.soundscape}
                onClick={() => "soundscape" in suggestion.target && toggle(suggestion.target.soundscape)}
                className={cn(
                  card,
                  playing === suggestion.target.soundscape
                    ? "border-primary bg-primary-soft"
                    : "hover:border-line-strong hover:shadow-soft",
                )}
              >
                {content(suggestion)}
              </button>
            ) : (
              <div className={card}>{content(suggestion)}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
