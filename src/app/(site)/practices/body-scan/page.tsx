import type { Metadata } from "next";
import Link from "next/link";

import { PageTransition } from "@/components/motion/page-transition";
import { BodyScanSession } from "@/components/practice/body-scan-session";
import { SoundscapePicker } from "@/components/sound/soundscape-picker";

export const metadata: Metadata = {
  title: "Guided body scan",
  description:
    "A two-minute guided body scan from feet to head, with optional spoken guidance and soft background soundscapes.",
  alternates: { canonical: "/practices/body-scan" },
};

export default function BodyScanPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-16">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Body scan</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Notice, without fixing</h1>
          <p className="mt-5 text-lg text-ink-muted">
            Move your attention slowly from your feet to your head. Whatever you find (warmth, tension,
            nothing at all) is fine.
          </p>
        </header>
        <div className="mt-14">
          <BodyScanSession />
        </div>
        <section aria-labelledby="sound-title" className="mt-20">
          <h2 id="sound-title" className="text-center text-2xl">
            Add a soft background
          </h2>
          <SoundscapePicker className="mt-6" />
        </section>
        <p className="mx-auto mt-14 max-w-xl text-center text-ink-muted">
          New to this? Read{" "}
          <Link href="/library/body-scan" className="font-semibold text-primary underline underline-offset-4">
            The body scan: noticing without fixing
          </Link>
          .
        </p>
      </div>
    </PageTransition>
  );
}
