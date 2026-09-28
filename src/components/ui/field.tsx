import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const inputStyles =
  "block w-full rounded-2xl border border-line-strong bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-muted/80 transition-colors hover:border-ink-muted focus:border-primary focus:outline-2 focus:outline-offset-0 focus:outline-primary aria-invalid:border-danger";

type FieldProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  errors?: string[];
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: true }) => ReactNode;
  className?: string;
};

/** Wires label, hint and error text to the control for assistive tech. */
export function Field({ id, label, hint, errors, children, className }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = errors?.length ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": errorId ? true : undefined,
      })}
      {errorId ? (
        <p id={errorId} className="text-sm font-medium text-danger">
          {errors?.join(" ")}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputStyles, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(inputStyles, "field-sizing-content min-h-40", className)} {...props} />;
}
