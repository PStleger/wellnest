import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";
import { Orb } from "@/components/somatic/orb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & case study",
  description:
    "How WellNest went from a three-week team project to a production-grade Next.js app: architecture, decisions and trade-offs.",
  alternates: { canonical: "/about" },
};

const comparison = [
  [
    "Framework",
    "React 18 SPA (Vite) + Express API",
    "Next.js 16 App Router, React Server Components, Server Actions",
  ],
  [
    "Rendering",
    "Client-side only, blank page until JS loads",
    "Static shells with personal data streamed in (Partial Prerendering)",
  ],
  ["Data", "MongoDB + Mongoose", "Postgres + Drizzle ORM, typed schema and migrations"],
  [
    "Auth",
    "Hand-rolled JWT cookie, bcrypt at 6 rounds",
    "Better Auth sessions, rate limiting, guest accounts that upgrade in place",
  ],
  [
    "Authorisation",
    "Any signed-in user could edit or delete anyone's entries",
    "Every query scoped to the session user in a Data Access Layer",
  ],
  [
    "Search",
    "Substring match in the browser",
    "Postgres full-text search with ranking and safe highlighting",
  ],
  [
    "Accessibility",
    "Clickable divs, empty alt text, no focus handling",
    "Native controls, managed focus, live regions, tested with axe",
  ],
  [
    "Styling",
    "Tailwind 3 + MUI + Material Tailwind + Flowbite + styled-components",
    "Tailwind 4 with a small token system, light and dark",
  ],
  ["Quality", "No tests, no types", "Strict TypeScript, Vitest, Playwright, CI and Lighthouse budgets"],
];

const highlights = [
  {
    title: "Textures without images",
    body: "Every texture (soft, prickly, fluid…) is an SVG filter recipe of turbulence and lighting. Portraits adapt to any colour and cost zero image bytes.",
  },
  {
    title: "A check-in as a state machine",
    body: "The twelve-step flow is a pure reducer with typed actions, so it's unit-tested, restorable from session storage, and impossible to put in an invalid state.",
  },
  {
    title: "Search that respects your words",
    body: "A generated tsvector column with weighted title and body, a GIN index, and websearch syntax. Highlights use private-use markers, never raw HTML.",
  },
  {
    title: "Instant, then personal",
    body: "Cache Components prerender every page's shell. Session reads and queries stream in behind Suspense boundaries, so first paint never waits on the database.",
  },
  {
    title: "A demo that becomes an account",
    body: "One click signs you in as a guest with two weeks of believable data. Sign up later and the anonymous account links in place: nothing is lost.",
  },
  {
    title: "Sound without files",
    body: "Rain, ocean, wind and brown noise are synthesised live with the Web Audio API, loaded on first play, and keep playing across pages.",
  },
  {
    title: "Motion that respects you",
    body: "View transitions, scroll-driven reveals and a breathing orb that is driven frame by frame, all off with one setting or your device's preference.",
  },
  {
    title: "Charts you can read without colour",
    body: "Palettes validated for colour-blind separation and contrast in both themes, with legends, keyboard-reachable marks and table views.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16">
        <header className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary">About & case study</p>
            <h1 className="mt-2 text-5xl sm:text-6xl">From a three-week team project to a product</h1>
            <p className="mt-6 text-xl text-ink-muted">
              WellNest started in August 2023 as a final group project: five of us, three weeks, a MERN stack
              and a lot of enthusiasm. In 2026 I rebuilt it from scratch, keeping the idea we loved and
              replacing everything else.
            </p>
          </div>
          <Orb color="#7b2d63" shape="knot" texture="soft" animated className="hidden size-40 md:block" />
        </header>

        <section aria-labelledby="idea-title" className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
          <h2 id="idea-title" className="text-4xl">
            The idea worth keeping
          </h2>
          <div className="space-y-4 text-lg text-ink-muted">
            <p>
              The original app asked a strange, lovely question: if the feeling in your chest had a colour, a
              shape and a texture, what would they be? Then it asked you to watch it for a while and check
              whether it changed.
            </p>
            <p>
              That exercise is the heart of the rebuild. Everything around it (the breathing, the body scan,
              the journal, the insights) exists to make it easier to reach and more rewarding to come back to.
            </p>
          </div>
        </section>

        <section aria-labelledby="changed-title" className="mt-20 defer-render">
          <h2 id="changed-title" className="text-4xl">
            What changed
          </h2>
          <div
            role="region"
            aria-label="Comparison table (scrolls sideways on small screens)"
            tabIndex={0}
            className="mt-8 overflow-x-auto rounded-(--radius-card) border border-line bg-surface shadow-soft"
          >
            <table className="w-full min-w-[40rem] text-left">
              <caption className="sr-only">The 2023 app compared with the 2026 rebuild</caption>
              <thead className="border-b border-line text-sm text-ink-muted">
                <tr>
                  <th scope="col" className="p-4 font-medium sm:p-5">
                    Area
                  </th>
                  <th scope="col" className="p-4 font-medium sm:p-5">
                    2023
                  </th>
                  <th scope="col" className="p-4 font-medium sm:p-5">
                    2026
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([area, before, after]) => (
                  <tr key={area} className="border-b border-line align-top last:border-0">
                    <th scope="row" className="p-4 font-semibold sm:p-5">
                      {area}
                    </th>
                    <td className="p-4 text-ink-muted sm:p-5">{before}</td>
                    <td className="p-4 sm:p-5">{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="highlights-title" className="mt-20 defer-render">
          <h2 id="highlights-title" className="text-4xl">
            Engineering highlights
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft"
              >
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="stack-title"
          className="mt-20 grid grid-cols-1 gap-10 defer-render md:grid-cols-2"
        >
          <h2 id="stack-title" className="text-4xl">
            Stack
          </h2>
          <ul className="flex flex-wrap gap-2">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS 4",
              "Postgres",
              "Drizzle ORM",
              "Better Auth",
              "Zod",
              "MDX",
              "Vitest",
              "Playwright",
              "axe-core",
              "Vercel",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-line-strong bg-surface px-4 py-2 font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 flex flex-col items-start gap-6 rounded-(--radius-card) bg-ink p-8 text-canvas sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-3xl">Read the code</h2>
            <p className="mt-2 opacity-80">Architecture notes, decisions and trade-offs are in the README.</p>
          </div>
          <a
            href={site.repo}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-canvas px-6 font-semibold text-ink hover:opacity-90"
          >
            View on GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </section>
      </div>
    </PageTransition>
  );
}
