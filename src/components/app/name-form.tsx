"use client";

import { useActionState } from "react";

import { type NameFormState, updateName } from "@/app/(app)/settings/actions";
import { Field, Input } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

export function NameForm({ name }: { name: string }) {
  const [state, formAction] = useActionState<NameFormState, FormData>(updateName, {});
  return (
    <form action={formAction} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <Field
        id="settings-name"
        label="Name"
        className="flex-1"
        errors={state.ok ? undefined : state.message ? [state.message] : undefined}
      >
        {(props) => (
          <Input {...props} name="name" defaultValue={name} autoComplete="name" maxLength={60} required />
        )}
      </Field>
      <SubmitButton variant="secondary" pendingLabel="Saving…">
        Save
      </SubmitButton>
      <p aria-live="polite" className="text-sm font-medium text-sage sm:pb-3">
        {state.ok ? state.message : ""}
      </p>
    </form>
  );
}
