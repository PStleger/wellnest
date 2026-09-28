"use client";

import { useEffect } from "react";

import { Button, LinkButton } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="grid min-h-[70dvh] place-items-center px-4 py-16 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl">Something went wrong</h1>
        <p className="mt-4 text-lg text-ink-muted">
          That&rsquo;s on us, not you. Your saved check-ins and entries are safe.
        </p>
        {error.digest ? <p className="mt-2 text-sm text-ink-muted">Reference: {error.digest}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <LinkButton href="/" variant="secondary">
            Go home
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
