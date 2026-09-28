import Link from "next/link";

import { BodyFigure } from "@/components/somatic/body-figure";
import { Orb } from "@/components/somatic/orb";
import { cn } from "@/lib/utils";

const practices = [
  {
    href: "/breathe",
    title: "Breathe",
    body: "Five rhythms, from a quick reset to winding down for sleep, with an orb to follow.",
    time: "1–5 min",
    art: (
      <div className="relative grid size-24 place-items-center">
        <span className="absolute inset-0 animate-glow rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#38bdf8_45%,transparent),transparent_70%)]" />
        <Orb color="#38bdf8" shape="ball" texture="soft" animated className="size-16" />
      </div>
    ),
  },
  {
    href: "/practices/grounding",
    title: "Ground",
    body: "5-4-3-2-1: move through your senses, one by one, back into the room you're in.",
    time: "2 min",
    art: (
      <div aria-hidden="true" className="flex items-end gap-2 font-display text-4xl text-primary">
        {[5, 4, 3, 2, 1].map((number, index) => (
          <span
            key={number}
            className="animate-float"
            style={{ animationDelay: `${index * -1.2}s`, fontSize: `${2.6 - index * 0.3}rem` }}
          >
            {number}
          </span>
        ))}
      </div>
    ),
  },
  {
    href: "/practices/body-scan",
    title: "Body scan",
    body: "A gentle sweep from your feet to your head, read aloud if you like.",
    time: "2 min",
    art: <BodyFigure highlight={["chest", "stomach"]} className="h-28 w-auto" />,
  },
  {
    href: "/check-in",
    title: "Check in",
    body: "Give what you feel a colour, shape and texture, and watch it shift.",
    time: "4 min",
    art: (
      <div className="flex items-center -space-x-3">
        <Orb color="#e11d48" shape="knot" texture="prickly" className="size-14 animate-float" />
        <Orb
          color="#f59e0b"
          shape="cloud"
          texture="grainy"
          className="size-12 animate-float [animation-delay:-2s]"
        />
        <Orb
          color="#0f766e"
          shape="ball"
          texture="soft"
          className="size-10 animate-float [animation-delay:-4s]"
        />
      </div>
    ),
  },
] as const;

/** The four everyday practices, each with a small moving illustration. */
export function PracticeCards({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {practices.map((practice) => (
        <li key={practice.href} className="reveal">
          <Link
            href={practice.href}
            className="group flex h-full items-center gap-6 rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-8"
          >
            <span aria-hidden="true" className="grid w-28 shrink-0 place-items-center">
              {practice.art}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl">{practice.title}</span>
                <span className="shrink-0 text-sm text-ink-muted">{practice.time}</span>
              </span>
              <span className="mt-2 block text-ink-muted">{practice.body}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
