import Link, { type LinkProps } from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "soft";
export type ButtonSize = "sm" | "md" | "lg";
type Variant = ButtonVariant;
type Size = ButtonSize;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 ease-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary shadow-soft hover:bg-primary-hover hover:shadow-lift",
  secondary: "bg-surface text-ink ring-1 ring-line-strong ring-inset hover:bg-surface-2",
  soft: "bg-primary-soft text-primary hover:bg-surface-2",
  ghost: "text-ink hover:bg-surface-2",
  danger: "bg-danger text-canvas hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-7 text-lg",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

type LinkButtonProps<T extends string> = LinkProps<T> &
  Omit<ComponentProps<"a">, keyof LinkProps<T>> & { variant?: Variant; size?: Size };

export function LinkButton<T extends string>({ variant, size, className, ...props }: LinkButtonProps<T>) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
