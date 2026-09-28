import { ArrowRight, BookOpen, Leaf, LockKeyhole, NotebookPen, Search, Sparkles, Wind } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageTransition } from "@/components/motion/page-transition";
import { PracticeCards } from "@/components/practice/practice-cards";
import { BodyFigure } from "@/components/somatic/body-figure";
import { Orb } from "@/components/somatic/orb";
import { DemoButton } from "@/components/site/demo-button";
import { HeroArt } from "@/components/site/hero-art";
import { LinkButton } from "@/components/ui/button";
import { site } from "@/lib/site";
import type { ShapeId } from "@/lib/somatic/shapes";
import type { TextureId } from "@/lib/somatic/textures";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const steps = [
  {
    title: "Arrive",
    body: "Name what's here, in your own words or from a gentle list of feelings.",
    art: (
      <div className="flex flex-wrap gap-1.5">
        {["anxious", "tired", "hopeful"].map((word, index) => (
          <span
            key={word}
            className={
              index === 0
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
    title: "Breathe & scan",
    body: "A few rounds of box breathing, then a slow body scan from your feet to your head.",
    art: (
      <div className="relative size-16">
        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-line-strong" />
        <div className="absolute -top-1.5 -left-1.5 size-3 rounded-full bg-primary shadow-soft" />
      </div>
    ),
  },
  {
    title: "Give it form",
    body: "Find where the feeling sits. Choose its colour, shape, texture and strength.",
    art: (
      <div className="flex items-end gap-2">
        <BodyFigure className="h-16 w-auto" fills={{ stomach: "#f59e0b" }} />
        <Orb color="#f59e0b" shape="flutter" texture="grainy" className="size-12" />
      </div>
    ),
  },
  {
    title: "Watch it shift",
    body: "Stay with it for a minute, then check again. Most feelings soften when they're met.",
    art: (
      <div className="flex items-center gap-3">
        <Orb color="#1d4ed8" shape="stone" texture="heavy" className="size-12" />
        <ArrowRight className="size-5 text-ink-muted" aria-hidden="true" />
        <Orb color="#38bdf8" shape="cloud" texture="fluid" className="size-12" />
      </div>
    ),
  },
];

const week: { color: string; shape: ShapeId; texture: TextureId; day: string }[] = [
  { day: "Mon", color: "#f59e0b", shape: "knot", texture: "prickly" },
  { day: "Tue", color: "#c2410c", shape: "band", texture: "rough" },
  { day: "Wed", color: "#1d4ed8", shape: "stone", texture: "heavy" },
  { day: "Thu", color: "#78716c", shape: "cloud", texture: "heavy" },
  { day: "Fri", color: "#facc15", shape: "wave", texture: "soft" },
  { day: "Sat", color: "#0f766e", shape: "ball", texture: "smooth" },
  { day: "Sun", color: "#db2777", shape: "ball", texture: "soft" },
];

const features = [
  {
    icon: NotebookPen,
    title: "A journal that remembers the body",
    body: "Write after a check-in and the entry keeps the portrait of what you felt. Prompts help when the page is blank.",
  },
  {
    icon: Search,
    title: "Search everything you've written",
    body: "Full-text search across your entries, ranked by relevance, so you can find the week you felt like this before.",
  },
  {
    icon: Wind,
    title: "Tools for right now",
    body: "Five breathing rhythms, grounding, a guided body scan and generated soundscapes. No account needed.",
  },
  {
    icon: BookOpen,
    title: "A small, careful library",
    body: "Short guides to the practices behind WellNest, with the research and its limits stated plainly.",
  },
  {
    icon: LockKeyhole,
    title: "Private by design",
    body: "No ads, no trackers, no selling data. Export everything as JSON or delete your account in two clicks.",
  },
  {
    icon: Sparkles,
    title: "Built to be calm",
    body: "Accessible to keyboard and screen reader users, respects reduced motion, and works in light or dark.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: site.name,
    url: site.url,
    description: site.description,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    author: { "@type": "Person", name: site.author.name, url: site.author.url },
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-16 lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage-soft px-3.5 py-1.5 text-sm font-semibold text-sage">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />A somatic journal
          </p>
          <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[1.02]">
            Feel it <em className="text-primary">where it lives.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted sm:text-xl">
            WellNest guides you through a four-minute check-in: breathe, scan your body, and give what you
            feel a colour, shape and texture. Then stay with it, and watch it shift.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DemoButton size="lg">Try the demo, no sign-up</DemoButton>
            <LinkButton href="/breathe" size="lg" variant="secondary">
              Take one slow breath
            </LinkButton>
          </div>
          <p className="mt-5 text-sm text-ink-muted">
            The demo opens a private guest nest with two weeks of sample entries. Keep it by creating an
            account.
          </p>
        </div>
        <HeroArt />
      </section>

      {/* Steps */}
      <section aria-labelledby="steps-title" className="mx-auto max-w-6xl px-4 py-16 defer-render sm:px-6">
        <div className="max-w-2xl">
          <h2 id="steps-title" className="text-4xl sm:text-5xl">
            A check-in, in four gentle steps
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Feelings are easier to meet when they have edges. Describing a sensation concretely helps you stay
            with it long enough for it to change.
          </p>
        </div>
        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="reveal flex flex-col gap-5 rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft"
            >
              <div className="flex h-18 items-end">{step.art}</div>
              <div>
                <p className="text-sm font-semibold text-primary">Step {index + 1}</p>
                <h3 className="mt-1 text-2xl">{step.title}</h3>
                <p className="mt-2 text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link
            href="/how-it-works"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            Read how it works and why <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </section>

      {/* Practices */}
      <section
        aria-labelledby="practices-title"
        className="mx-auto max-w-6xl px-4 py-16 defer-render sm:px-6"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="practices-title" className="text-4xl sm:text-5xl">
              Tools for right now
            </h2>
            <p className="mt-4 text-lg text-ink-muted">
              When you don&rsquo;t have four minutes, or the words: a breathing orb to follow, grounding
              through your senses, and soundscapes that keep playing while you write.
            </p>
          </div>
          <Link
            href="/calm"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-sky-soft px-5 font-semibold text-sky transition hover:brightness-95 sm:self-auto"
          >
            <Leaf className="size-4" aria-hidden="true" /> Calm now
          </Link>
        </div>
        <PracticeCards className="mt-10" />
      </section>

      {/* Patterns */}
      <section aria-labelledby="patterns-title" className="px-4 py-16 defer-render sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-canvas sm:px-12 md:grid-cols-2">
          <div>
            <h2 id="patterns-title" className="text-4xl sm:text-5xl">
              Your week, in colour
            </h2>
            <p className="mt-4 text-lg opacity-80">
              Over time, check-ins become a quiet map: where stress tends to land, which colours return, and
              how much a few minutes of attention changes things.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-sm opacity-75">Most often felt in</dt>
                <dd className="font-display text-3xl">Stomach</dd>
              </div>
              <div>
                <dt className="text-sm opacity-75">Average shift</dt>
                <dd className="font-display text-3xl">−1.9 points</dd>
              </div>
            </dl>
          </div>
          <ul className="grid grid-cols-4 gap-4 sm:grid-cols-7 md:grid-cols-4 lg:grid-cols-7">
            {week.map((day) => (
              <li key={day.day} className="flex flex-col items-center gap-2">
                <Orb color={day.color} shape={day.shape} texture={day.texture} className="size-14" />
                <span className="text-sm opacity-80">{day.day}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-16 defer-render sm:px-6">
        <h2 id="features-title" className="max-w-2xl text-4xl sm:text-5xl">
          Everything you need, nothing that nags
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <li key={title} className="reveal">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-5.5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-2 text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section
        aria-labelledby="cta-title"
        className="mx-auto max-w-3xl px-4 py-20 text-center defer-render sm:px-6"
      >
        <Orb color="#7c3aed" shape="cloud" texture="soft" animated className="mx-auto size-28" />
        <h2 id="cta-title" className="mt-8 text-4xl sm:text-5xl">
          You don&rsquo;t have to fix a feeling to feel better.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-muted">
          Often it&rsquo;s enough to notice it clearly, for a little longer than usual. WellNest gives you a
          place to do that.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <DemoButton size="lg">Start with the demo</DemoButton>
          <LinkButton href="/sign-up" size="lg" variant="secondary">
            Create a free account
          </LinkButton>
        </div>
      </section>
    </PageTransition>
  );
}
