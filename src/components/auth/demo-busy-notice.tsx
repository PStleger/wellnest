"use client";

import { useSearchParams } from "next/navigation";

/** Shown when the demo was rate-limited for this network. */
export function DemoBusyNotice() {
  const busy = useSearchParams().get("demo") === "busy";
  if (!busy) return null;
  return (
    <p role="status" className="mt-6 rounded-2xl bg-apricot/20 px-4 py-3 text-[0.95rem]">
      Lots of demos have been started from your network recently, so we&rsquo;ve paused new ones for a little
      while. You can create a free account instead, or try again later.
    </p>
  );
}
