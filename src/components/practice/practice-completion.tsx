"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { logPractice, ratePractice } from "@/app/practice-actions";
import { type FeltAfter, feelings, type PracticeKind } from "@/lib/somatic/practices";
import { cn } from "@/lib/utils";

/**
 * Shown when a practice ends: records it (for signed-in people) and asks, gently,
 * how they feel. The answer feeds Insights; skipping it is fine.
 */
export function PracticeCompletion({
  kind,
  pattern,
  durationSeconds,
  children,
  className,
}: {
  kind: PracticeKind;
  pattern?: string;
  durationSeconds: number;
  children?: ReactNode;
  className?: string;
}) {
  const [record, setRecord] = useState<{ id: string } | null | undefined>(undefined);
  const [felt, setFelt] = useState<FeltAfter | null>(null);
  const logged = useRef(false);

  useEffect(() => {
    if (logged.current || durationSeconds < 5) return;
    logged.current = true;
    void logPractice({ kind, pattern, durationSeconds }).then(setRecord, () => setRecord(null));
  }, [kind, pattern, durationSeconds]);

  function choose(value: FeltAfter) {
    setFelt(value);
    if (record) void ratePractice({ id: record.id, feltAfter: value });
  }

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-lg rounded-(--radius-card) border border-line bg-surface p-6 text-center shadow-soft sm:p-8",
        className,
      )}
    >
      <p className="font-display text-2xl">How do you feel now?</p>
      <div
        role="group"
        aria-label="How you feel after practising"
        className="mt-5 flex flex-wrap justify-center gap-2"
      >
        {feelings.map((feeling) => (
          <button
            key={feeling.id}
            type="button"
            aria-pressed={felt === feeling.id}
            onClick={() => choose(feeling.id)}
            className={cn(
              "min-h-11 rounded-full border px-5 font-medium transition",
              felt === feeling.id
                ? "animate-pop border-primary bg-primary text-on-primary"
                : "border-line-strong hover:border-ink-muted",
            )}
          >
            {feeling.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-5 min-h-6 text-sm text-ink-muted">
        {felt === "calmer"
          ? "Lovely. Your body knows how to do this."
          : felt === "same"
            ? "That's okay. Sometimes the benefit shows up later."
            : felt === "unsure"
              ? "Not knowing is a fine answer too."
              : null}
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        {record ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-sage">
            <Check className="size-4" aria-hidden="true" /> Added to your practice history
          </span>
        ) : record === null ? (
          <>
            Want to see your practice over time?{" "}
            <Link href="/sign-up" className="font-semibold text-primary underline underline-offset-4">
              Create a free account
            </Link>
            .
          </>
        ) : null}
      </p>
      {children ? <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  );
}
