import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site";

import { ThemeToggle } from "./theme-toggle";

const columns = [
  {
    title: "Practise",
    links: [
      { href: "/check-in", label: "Somatic check-in" },
      { href: "/breathe", label: "Guided breathing" },
      { href: "/practices/grounding", label: "Grounding" },
      { href: "/calm", label: "Calm now" },
      { href: "/library", label: "Library" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/about", label: "About & case study" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-ink-muted">
            A quiet place to notice what you feel, where you feel it, and how it changes.
          </p>
          <ThemeToggle />
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-ink-muted sm:px-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            <strong className="font-semibold text-ink">
              WellNest is not a crisis service or a substitute for therapy.
            </strong>{" "}
            If you are in danger or thinking about ending your life, call your local emergency number or find
            free, confidential support at{" "}
            <a
              href="https://findahelpline.com"
              className="font-medium text-primary underline underline-offset-4"
              rel="noopener"
            >
              findahelpline.com
            </a>
            .
          </p>
          <p>
            Made by{" "}
            <a
              href={site.author.url}
              className="font-medium text-ink underline underline-offset-4"
              rel="author"
            >
              {site.author.name}
            </a>{" "}
            ·{" "}
            <a href={site.repo} className="font-medium text-ink underline underline-offset-4">
              Source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
