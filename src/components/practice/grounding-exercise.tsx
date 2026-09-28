"use client";

import { ArrowRight, Ear, Eye, Hand, Sparkles, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PracticeCompletion } from "./practice-completion";

const senses = [
  {
    count: 5,
    sense: "see",
    icon: Eye,
    prompt: "Look around slowly. Find five things you can see.",
    hint: "A colour, a shadow, the corner of a window, something small you hadn't noticed.",
  },
  {
    count: 4,
    sense: "feel",
    icon: Hand,
    prompt: "Notice four things you can feel.",
    hint: "Your feet on the floor, the weight of your hands, fabric against your skin, the air's temperature.",
  },
  {
    count: 3,
    sense: "hear",
    icon: Ear,
    prompt: "Listen for three things you can hear.",
    hint: "Near and far: your own breath, traffic, a hum, birdsong, the silence between sounds.",
  },
  {
    count: 2,
    sense: "smell",
    icon: Wind,
    prompt: "Find two things you can smell.",
    hint: "If nothing comes, think of two smells you love.",
  },
  {
    count: 1,
    sense: "taste",
    icon: Sparkles,
    prompt: "Notice one thing you can taste.",
    hint: "Or one small thing you're glad about right now.",
  },
] as const;

/** 5-4-3-2-1 grounding: attention moves outward through the senses, one tap at a time. */
export function GroundingExercise() {
  const [step, setStep] = useState(0);
  const [noticed, setNoticed] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const done = step >= senses.length;
  const current = senses[Math.min(step, senses.length - 1)]!;
  const Icon = current.icon;

  // Move focus with the exercise so keyboard and screen reader users follow along.
  useEffect(() => {
    if (step > 0) headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  // When every item of a sense is noticed, pause a beat, then move on.
  useEffect(() => {
    if (done || noticed < current.count) return;
    const timeout = window.setTimeout(() => advance(), 900);
    return () => window.clearTimeout(timeout);
  });

  function advance() {
    const next = step + 1;
    if (next >= senses.length && startedAt) setDuration(Math.round((Date.now() - startedAt) / 1000));
    setNoticed(0);
    setStep(next);
  }

  function notice() {
    if (startedAt === null) setStartedAt(Date.now());
    setNoticed((value) => Math.min(current.count, value + 1));
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="relative grid size-40 place-items-center" aria-hidden="true">
          <span className="absolute inset-0 animate-bloom rounded-full border-2 border-sage" />
          <span className="absolute inset-0 animate-bloom rounded-full border-2 border-sage [animation-delay:0.6s]" />
          <span className="size-20 rounded-full bg-sage-soft" />
        </div>
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="text-4xl outline-none">
            You&rsquo;re here.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-ink-muted">
            Take one slow breath and notice the ground holding you up.
          </p>
        </div>
        <PracticeCompletion kind="grounding" durationSeconds={Math.max(duration, 30)}>
          <Button variant="secondary" onClick={() => setStep(0)}>
            Ground again
          </Button>
        </PracticeCompletion>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <ol aria-label="Progress" className="flex gap-2">
        {senses.map((item, index) => (
          <li
            key={item.sense}
            aria-current={index === step ? "step" : undefined}
            className={cn(
              "h-1.5 w-10 rounded-full transition-colors duration-500",
              index < step ? "bg-sage" : index === step ? "bg-primary" : "bg-surface-2",
            )}
          >
            <span className="sr-only">
              {item.count} things you can {item.sense}
            </span>
          </li>
        ))}
      </ol>

      <div key={step} className="mt-10 flex animate-rise flex-col items-center">
        <span className="grid size-14 place-items-center rounded-full bg-primary-soft text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <p aria-hidden="true" className="mt-6 font-display text-8xl leading-none text-primary">
          {current.count}
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 max-w-lg text-3xl outline-none sm:text-4xl">
          {current.prompt}
        </h2>
        <p className="mt-3 max-w-md text-ink-muted">{current.hint}</p>

        <div
          role="group"
          aria-label={`Things you can ${current.sense}`}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {Array.from({ length: current.count }, (_, index) => {
            const filled = index < noticed;
            return (
              <span
                key={index}
                aria-hidden="true"
                className={cn(
                  "grid size-12 place-items-center rounded-full border-2 transition-all duration-300",
                  filled ? "animate-pop border-sage bg-sage text-canvas" : "border-dashed border-line-strong",
                )}
              >
                {filled ? index + 1 : ""}
              </span>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={notice} disabled={noticed >= current.count}>
            I noticed one
          </Button>
          <Button size="lg" variant="ghost" onClick={advance}>
            Skip <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <p aria-live="polite" className="mt-4 min-h-6 text-sm text-ink-muted">
          {noticed > 0 ? `${noticed} of ${current.count} noticed` : ""}
        </p>
      </div>
    </div>
  );
}
