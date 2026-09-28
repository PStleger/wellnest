"use client";

import { Lightbulb, X } from "lucide-react";
import { useActionState, useState } from "react";

import type { EntryFormState } from "@/app/(app)/journal/actions";
import { Field, Input, Textarea } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

export const journalPrompts = [
  "What is this feeling trying to protect?",
  "If this feeling could speak, what would it say?",
  "What helped today, even a little?",
  "What do I need right now that I'm not getting?",
  "What would I tell a friend who felt this way?",
  "What am I carrying that isn't mine to carry?",
  "Where in my body do I feel most at ease?",
  "What do I want to remember about today?",
];

export function EntryForm({
  action,
  defaults,
  checkInId,
  submitLabel = "Save entry",
  showPrompts = true,
}: {
  action: (state: EntryFormState, formData: FormData) => Promise<EntryFormState>;
  defaults?: { title?: string; body?: string; prompt?: string | null };
  checkInId?: string;
  submitLabel?: string;
  showPrompts?: boolean;
}) {
  const [state, formAction] = useActionState(action, {});
  const [prompt, setPrompt] = useState(defaults?.prompt ?? "");

  return (
    <form action={formAction} className="space-y-6">
      {checkInId ? <input type="hidden" name="checkInId" value={checkInId} /> : null}
      <input type="hidden" name="prompt" value={prompt} />

      {state.message ? (
        <p role="alert" className="rounded-2xl bg-danger-soft px-4 py-3 font-medium text-danger">
          {state.message}
        </p>
      ) : null}

      {showPrompts ? (
        prompt ? (
          <div className="flex items-start gap-3 rounded-3xl bg-primary-soft p-5">
            <Lightbulb className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="flex-1 font-display text-xl text-ink">{prompt}</p>
            <button
              type="button"
              onClick={() => setPrompt("")}
              className="grid size-10 shrink-0 place-items-center rounded-full text-ink-muted hover:bg-surface hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Remove prompt</span>
            </button>
          </div>
        ) : (
          <details className="group rounded-3xl border border-line bg-surface">
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 rounded-3xl px-5 font-semibold text-ink marker:content-none">
              <Lightbulb className="size-4 text-primary" aria-hidden="true" /> Need a prompt?
              <span className="ml-auto text-sm font-normal text-ink-muted group-open:hidden">Show ideas</span>
            </summary>
            <ul className="flex flex-wrap gap-2 px-5 pb-5">
              {journalPrompts.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setPrompt(item)}
                    className="min-h-10 rounded-full border border-line-strong px-4 py-1.5 text-left text-sm hover:border-primary hover:text-primary"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )
      ) : null}

      <Field
        id="title"
        label="Title"
        hint="Optional. We'll use your first few words if you leave it blank."
        errors={state.fieldErrors?.title}
      >
        {(props) => (
          <Input
            {...props}
            name="title"
            maxLength={120}
            defaultValue={state.values?.title ?? defaults?.title}
          />
        )}
      </Field>

      <Field id="body" label="Entry" errors={state.fieldErrors?.body}>
        {(props) => (
          <Textarea
            {...props}
            name="body"
            required
            maxLength={20_000}
            className="min-h-72 text-lg leading-relaxed"
            placeholder="Start anywhere…"
            defaultValue={state.values?.body ?? defaults?.body}
          />
        )}
      </Field>

      <SubmitButton size="lg" pendingLabel="Saving…">
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
