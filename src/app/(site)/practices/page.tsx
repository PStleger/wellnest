import { ArrowRight, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageTransition } from "@/components/motion/page-transition";
import { PracticeCards } from "@/components/practice/practice-cards";
import { SoundscapePicker } from "@/components/sound/soundscape-picker";
import { breathPatterns } from "@/lib/somatic/breathing";

export const metadata: Metadata = {
  title: "Practices",
  description:
    "Free tools for right now: guided breathing, 5-4-3-2-1 grounding, a voice-guided body scan, calming soundscapes and a space for hard moments.",
  alternates: { canonical: "/practices" },
};

export default function PracticesPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Practices</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Tools for right now</h1>
          <p className="mt-5 text-lg text-ink-muted">
            Short, guided practices you can reach in one tap. No account needed; if you have one, your
            practice is added to your insights.
          </p>
        </header>

        <Link
          href="/calm"
          className="group relative mt-12 flex flex-col gap-6 overflow-hidden rounded-[2.5rem] bg-canvas p-8 text-ink scheme-dark shadow-lift sm:flex-row sm:items-center sm:p-12"
        >
          <span
            aria-hidden="true"
            className="absolute -top-1/2 -right-1/4 size-[36rem] animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#38bdf8_28%,transparent),transparent_62%)] will-change-transform"
          />
          <span className="relative grid size-20 shrink-0 place-items-center rounded-full bg-surface-2">
            <Leaf className="size-8 text-sky" aria-hidden="true" />
          </span>
          <span className="relative flex-1">
            <span className="block font-display text-3xl sm:text-4xl">Calm now</span>
            <span className="mt-2 block max-w-lg text-lg text-ink-muted">
              For hard moments. A slow breathing guide, kind words, and gentle ways back to steady ground.
            </span>
          </span>
          <span className="relative inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-ink px-6 font-semibold text-canvas transition group-hover:gap-3 sm:self-center">
            Open <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>

        <PracticeCards className="mt-6" />

        <section aria-labelledby="rhythms-title" className="mt-20 defer-render">
          <h2 id="rhythms-title" className="text-3xl sm:text-4xl">
            Pick a breathing rhythm
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {breathPatterns.map((pattern) => (
              <li key={pattern.id}>
                <Link
                  href={`/breathe/${pattern.id}`}
                  className="flex h-full flex-col rounded-3xl border border-line bg-surface p-5 transition hover:border-line-strong hover:shadow-soft"
                >
                  <span
                    aria-hidden="true"
                    className="size-3 rounded-full"
                    style={{ background: pattern.color, boxShadow: `0 0 16px ${pattern.color}` }}
                  />
                  <span className="mt-4 font-semibold">{pattern.name}</span>
                  <span className="text-sm text-ink-muted">{pattern.tagline}</span>
                  <span className="mt-3 text-sm text-ink-muted tabular-nums">
                    {pattern.phases.map((phase) => phase.seconds).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sound-title" className="mt-20 defer-render">
          <h2 id="sound-title" className="text-3xl sm:text-4xl">
            Soundscapes
          </h2>
          <p className="mt-3 max-w-xl text-ink-muted">
            Generated live in your browser, so they never repeat exactly. They keep playing as you move around
            WellNest; set a sleep timer from the player.
          </p>
          <SoundscapePicker className="mt-6" />
        </section>
      </div>
    </PageTransition>
  );
}
