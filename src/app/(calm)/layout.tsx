import { X } from "lucide-react";
import Link from "next/link";

import { LogoMark } from "@/components/brand/logo";

/**
 * Always a night sky, whatever the theme: `.scheme-dark` re-resolves every colour token
 * to its dark value for this subtree. Slow light drifts behind.
 */
export default function CalmLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-canvas text-ink scheme-dark">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 size-[70vmax] animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#38bdf8_22%,transparent),transparent_60%)] will-change-transform" />
        <div className="absolute -right-1/4 -bottom-1/3 size-[75vmax] animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#7c3aed_20%,transparent),transparent_62%)] will-change-transform [animation-delay:-9s] [animation-duration:26s]" />
      </div>
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="rounded-full" aria-label="WellNest home">
          <LogoMark />
        </Link>
        <Link
          href="/practices"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink-muted hover:bg-surface-2 hover:text-ink"
        >
          <X className="size-4" aria-hidden="true" /> Close
        </Link>
      </header>
      <main id="main" className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 pb-12 sm:px-6">
        {children}
      </main>
    </div>
  );
}
