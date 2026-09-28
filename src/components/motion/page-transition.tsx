import { type ReactNode, ViewTransition } from "react";

/**
 * Page content fades in and rises gently on navigation; layouts (header, sidebar)
 * stay put. Browsers without View Transitions simply swap pages.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
