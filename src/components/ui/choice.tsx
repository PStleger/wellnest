import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChoiceProps = Omit<ComponentProps<"input">, "type" | "className"> & {
  type?: "radio" | "checkbox";
  children: ReactNode;
  variant?: "chip" | "card";
  className?: string;
};

/**
 * A native radio/checkbox styled as a chip or card. Keeping the real input
 * means arrow keys, form semantics and screen readers all work for free.
 */
export function Choice({ type = "radio", children, variant = "chip", className, ...input }: ChoiceProps) {
  return (
    <label
      className={cn(
        "relative cursor-pointer transition-[background-color,border-color,color,box-shadow] select-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus) has-disabled:cursor-not-allowed has-disabled:opacity-50",
        variant === "chip" &&
          "inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface px-4 text-[0.95rem] font-medium text-ink hover:border-ink-muted has-checked:border-primary has-checked:bg-primary has-checked:text-on-primary",
        variant === "card" &&
          "flex flex-col items-center gap-2 rounded-3xl border border-line bg-surface p-3 text-center text-sm font-medium text-ink hover:border-line-strong has-checked:border-primary has-checked:bg-primary-soft has-checked:shadow-[0_0_0_2px_var(--primary)]",
        className,
      )}
    >
      <input type={type} className="sr-only" {...input} />
      {children}
    </label>
  );
}
