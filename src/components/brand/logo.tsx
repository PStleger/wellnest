import { useId } from "react";

import { cn } from "@/lib/utils";

/** A small egg resting in a nest: the brand mark. Decorative next to the wordmark. */
export function LogoMark({ className }: { className?: string }) {
  // A per-instance id: a shared one breaks when the first logo on the page is display:none.
  const gradientId = `logo-egg-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-8", className)}>
      <defs>
        <radialGradient id={gradientId} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="var(--apricot)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="17" rx="8.5" ry="10" fill={`url(#${gradientId})`} />
      <path
        d="M5 21c2 9 8.5 13 15 13s13-4 15-13"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M9 25.5c3 3.5 6.8 5 11 5s8-1.5 11-5"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-display text-2xl font-medium tracking-tight">WellNest</span>
    </span>
  );
}
