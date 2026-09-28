import type { Metadata } from "next";

import { Logo } from "@/components/brand/logo";
import { Orb } from "@/components/somatic/orb";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4 py-16 text-center">
      <div className="flex max-w-md flex-col items-center">
        <Logo />
        <Orb color="#78716c" shape="cloud" texture="soft" animated className="mt-12 size-32" />
        <h1 className="mt-8 text-4xl sm:text-5xl">This page has drifted off</h1>
        <p className="mt-4 text-lg text-ink-muted">
          The link might be old, or the page may have moved. Take a breath; you haven&rsquo;t broken anything.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/">Go home</LinkButton>
          <LinkButton href="/nest" variant="secondary">
            Open your nest
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
