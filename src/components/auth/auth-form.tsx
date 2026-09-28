"use client";

import Link from "next/link";
import { useActionState } from "react";

import type { AuthFormState } from "@/app/(auth)/actions";
import { Field, Input } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";

type Mode = "sign-in" | "sign-up";

export function AuthForm({
  mode,
  action,
  next,
}: {
  mode: Mode;
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  next?: string;
}) {
  const [state, formAction] = useActionState(action, {});
  const signUp = mode === "sign-up";

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {next ? <input type="hidden" name="next" value={next} /> : null}

      {state.message ? (
        <p role="alert" className="rounded-2xl bg-danger-soft px-4 py-3 font-medium text-danger">
          {state.message}
        </p>
      ) : null}

      {signUp ? (
        <Field id="name" label="What should we call you?" errors={state.fieldErrors?.name}>
          {(props) => (
            <Input
              {...props}
              name="name"
              autoComplete="given-name"
              required
              maxLength={60}
              defaultValue={state.values?.name}
            />
          )}
        </Field>
      ) : null}

      <Field id="email" label="Email" errors={state.fieldErrors?.email}>
        {(props) => (
          <Input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            spellCheck={false}
            defaultValue={state.values?.email}
          />
        )}
      </Field>

      <Field
        id="password"
        label="Password"
        hint={signUp ? "At least 8 characters. A short phrase works well." : undefined}
        errors={state.fieldErrors?.password}
      >
        {(props) => (
          <Input
            {...props}
            name="password"
            type="password"
            autoComplete={signUp ? "new-password" : "current-password"}
            required
            minLength={signUp ? 8 : undefined}
          />
        )}
      </Field>

      <SubmitButton
        size="lg"
        className="w-full"
        pendingLabel={signUp ? "Creating your nest…" : "Signing in…"}
      >
        {signUp ? "Create account" : "Sign in"}
      </SubmitButton>

      <p className="text-center text-ink-muted">
        {signUp ? "Already have an account? " : "New here? "}
        <Link
          href={signUp ? "/sign-in" : "/sign-up"}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {signUp ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
