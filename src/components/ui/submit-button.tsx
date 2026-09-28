"use client";

import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { type ButtonSize, type ButtonVariant, buttonStyles } from "./button";

type SubmitButtonProps = Omit<ComponentProps<"button">, "type"> & {
  pendingLabel?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** A submit button that reflects its parent form's pending state. */
export function SubmitButton({
  children,
  pendingLabel,
  variant,
  size,
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending || disabled}
      disabled={disabled}
      onClick={(event) => {
        if (pending) event.preventDefault();
      }}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {pending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          <span>{pendingLabel ?? children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
