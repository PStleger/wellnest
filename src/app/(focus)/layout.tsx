import { X } from "lucide-react";
import Link from "next/link";

import { LogoMark } from "@/components/brand/logo";

/** A quiet frame for guided practice: no navigation competing for attention. */
export default function FocusLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/nest" className="rounded-full" aria-label="WellNest, back to your nest">
          <LogoMark />
        </Link>
        <Link
          href="/nest"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink-muted hover:bg-surface-2 hover:text-ink"
        >
          <X className="size-4" aria-hidden="true" /> Exit
        </Link>
      </header>
      <main id="main" className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-10 sm:px-6">
        {children}
      </main>
    </div>
  );
}
