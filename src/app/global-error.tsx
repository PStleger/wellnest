"use client";

import "./globals.css";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center p-6 text-center">
        <main>
          <h1 className="text-4xl">WellNest couldn&rsquo;t load</h1>
          <p className="mt-4 text-lg">Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 min-h-12 rounded-full bg-primary px-6 font-semibold text-on-primary"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
