"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { setPref, usePref } from "@/lib/prefs";
import { cn } from "@/lib/utils";

const options = [
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const theme = usePref("theme");

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn("inline-flex rounded-full bg-surface-2 p-1", className)}
    >
      {options.map(({ value, label, Icon }) => {
        const checked = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={checked}
            aria-label={label}
            title={label}
            onClick={() => setPref("theme", value)}
            className={cn(
              "grid size-10 place-items-center rounded-full transition-colors",
              checked ? "bg-surface text-primary shadow-soft" : "text-ink-muted hover:text-ink",
            )}
          >
            <Icon className="size-4.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
