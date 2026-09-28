import type { Metadata } from "next";
import Link from "next/link";

import { PageTransition } from "@/components/motion/page-transition";
import { GroundingExercise } from "@/components/practice/grounding-exercise";

export const metadata: Metadata = {
  title: "5-4-3-2-1 grounding",
  description:
    "An interactive 5-4-3-2-1 grounding exercise: move your attention through your senses to come back to the present.",
  alternates: { canonical: "/practices/grounding" },
};

export default function GroundingPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <header className="text-center">
          <p className="text-sm font-semibold text-primary">Grounding</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Come back to your senses</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-muted">
            When thoughts are racing, the senses bring you back to the room you&rsquo;re in. Go slowly;
            there&rsquo;s no prize for speed.
          </p>
        </header>
        <div className="mt-14">
          <GroundingExercise />
        </div>
        <p className="mx-auto mt-16 max-w-xl text-center text-ink-muted">
          Read more in{" "}
          <Link
            href="/library/grounding-5-4-3-2-1"
            className="font-semibold text-primary underline underline-offset-4"
          >
            5-4-3-2-1 grounding
          </Link>
          .
        </p>
      </div>
    </PageTransition>
  );
}
