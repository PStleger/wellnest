import type { Metadata } from "next";
import Link from "next/link";

import { PageTransition } from "@/components/motion/page-transition";
import { BodyFigure } from "@/components/somatic/body-figure";
import { Orb } from "@/components/somatic/orb";
import { DemoButton } from "@/components/site/demo-button";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "What happens in a WellNest check-in, the ideas it draws on (Focusing, somatic tracking, affect labelling), and what it isn't.",
  alternates: { canonical: "/how-it-works" },
};

const stages = [
  {
    title: "Arrive",
    time: "30 seconds",
    body: "You start by noticing how you feel, in a few words or by choosing from a small, non-judgemental list. Naming a feeling, even roughly, is itself a regulating act.",
    art: (
      <div className="flex flex-wrap gap-2">
        {["restless", "tired", "hopeful", "numb"].map((word, index) => (
          <span
            key={word}
            className={
              index < 2
                ? "rounded-full bg-primary px-3 py-1 text-sm font-medium text-on-primary"
                : "rounded-full border border-line-strong px-3 py-1 text-sm text-ink-muted"
            }
          >
            {word}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Breathe",
    time: "About a minute",
    body: "A few rounds of box breathing, paced by a moving dot. Slow, even breathing gives your attention something steady to follow before you turn inward.",
    art: (
      <div className="relative size-24">
        <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-line-strong" />
        <div className="absolute inset-3 rounded-2xl bg-primary-soft" />
        <div className="absolute -top-2 left-8 size-4 rounded-full bg-primary ring-4 ring-surface" />
      </div>
    ),
  },
  {
    title: "Scan",
    time: "About two minutes",
    body: "A guided body scan moves your attention from your feet to your head. You don't have to relax or feel anything in particular, only notice what's there.",
    art: <BodyFigure highlight={["chest", "shoulders"]} className="h-28 w-auto" />,
  },
  {
    title: "Give it form",
    time: "About a minute",
    body: "Choose where the feeling is strongest, then describe it as if it were an object: its colour, shape, texture and strength. Each choice builds a small portrait of what you feel.",
    art: (
      <div className="flex items-center gap-3">
        <Orb color="#1d4ed8" shape="stone" texture="heavy" className="size-16" />
        <Orb color="#f59e0b" shape="flutter" texture="grainy" className="size-14" />
        <Orb color="#e11d48" shape="knot" texture="prickly" className="size-12" />
      </div>
    ),
  },
  {
    title: "Stay, then look again",
    time: "About a minute",
    body: "You keep your attention on the portrait for about a minute, with gentle prompts. Then you check whether anything shifted: location, colour, shape, texture or strength. Often something does.",
    art: (
      <div className="flex items-center gap-3">
        <Orb color="#1d4ed8" shape="stone" texture="heavy" className="size-14 opacity-70" />
        <span aria-hidden="true" className="text-xl text-ink-muted">
          →
        </span>
        <Orb color="#38bdf8" shape="cloud" texture="fluid" className="size-16" />
      </div>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold text-primary">How it works</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Meeting a feeling in the body</h1>
          <p className="mt-6 text-xl text-ink-muted">
            Most of us are taught to think our way out of feelings. WellNest takes the other route: find where
            a feeling lives in your body, describe it concretely, and give it a minute of steady attention.
          </p>
        </header>

        <section aria-labelledby="stages-title" className="mt-16">
          <h2 id="stages-title" className="sr-only">
            The five stages of a check-in
          </h2>
          <ol className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-[1.35rem] before:w-px before:bg-line sm:before:left-[1.6rem]">
            {stages.map((stage, index) => (
              <li key={stage.title} className="relative grid gap-5 pl-14 sm:pl-18">
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-0 grid size-11 place-items-center rounded-full bg-surface font-semibold text-primary shadow-soft ring-1 ring-line sm:size-13"
                >
                  {index + 1}
                </span>
                <div className="grid grid-cols-1 items-center gap-6 rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft sm:p-8 md:grid-cols-[1fr_12rem]">
                  <div>
                    <p className="text-sm text-ink-muted">{stage.time}</p>
                    <h3 className="mt-1 text-3xl">{stage.title}</h3>
                    <p className="mt-3 text-lg text-ink-muted">{stage.body}</p>
                  </div>
                  <div className="flex items-center md:justify-center">{stage.art}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="why-title"
          className="mt-24 grid grid-cols-1 gap-12 defer-render md:grid-cols-2"
        >
          <div>
            <h2 id="why-title" className="text-4xl">
              Where the ideas come from
            </h2>
            <p className="mt-4 text-lg text-ink-muted">
              None of this was invented here. WellNest borrows from practices with decades of use behind them,
              and tries to be honest about the evidence.
            </p>
          </div>
          <ul className="space-y-6 text-lg">
            <li>
              <strong className="font-semibold">Focusing.</strong>{" "}
              <span className="text-ink-muted">
                Eugene Gendlin&rsquo;s practice of sensing a bodily &ldquo;felt sense&rdquo; and finding words
                or images that fit it.{" "}
                <Link
                  href="/library/felt-sense"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  Read about the felt sense
                </Link>
              </span>
            </li>
            <li>
              <strong className="font-semibold">Affect labelling.</strong>{" "}
              <span className="text-ink-muted">
                Research suggests that putting feelings into words can dampen the brain&rsquo;s alarm
                response.{" "}
                <Link
                  href="/library/name-it-to-tame-it"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  Read about naming feelings
                </Link>
              </span>
            </li>
            <li>
              <strong className="font-semibold">Slow breathing and body scans.</strong>{" "}
              <span className="text-ink-muted">
                Staples of mindfulness-based programmes, used to steady attention before turning inward.{" "}
                <Link
                  href="/library/body-scan"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  Read about body scans
                </Link>
              </span>
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="isnt-title"
          className="mt-24 rounded-(--radius-card) border border-sage/30 bg-sage-soft p-8 sm:p-10"
        >
          <h2 id="isnt-title" className="text-3xl">
            What WellNest isn&rsquo;t
          </h2>
          <p className="mt-4 max-w-3xl text-lg">
            It isn&rsquo;t therapy, a diagnosis, or a crisis service. It&rsquo;s a practice space. If turning
            your attention inward brings up more than you can hold, stop, look around the room, and reach out
            to someone you trust or a professional. If you&rsquo;re in danger, call your local emergency
            number or visit{" "}
            <a
              href="https://findahelpline.com"
              className="font-semibold text-primary underline underline-offset-4"
            >
              findahelpline.com
            </a>
            .
          </p>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-4xl">Try it in four minutes</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DemoButton size="lg">Open the demo</DemoButton>
            <LinkButton href="/breathe" size="lg" variant="secondary">
              Just breathe
            </LinkButton>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
