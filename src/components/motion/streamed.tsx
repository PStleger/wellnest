import { type ReactNode, Suspense, ViewTransition } from "react";

/** A Suspense boundary whose skeleton fades out as the real content rises in. */
export function Streamed({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <ViewTransition exit="fade-out" default="none">
          {fallback}
        </ViewTransition>
      }
    >
      <ViewTransition enter="rise-in" default="none">
        {children}
      </ViewTransition>
    </Suspense>
  );
}
