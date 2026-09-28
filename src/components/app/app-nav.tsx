"use client";

import { Bookmark, ChartSpline, Home, Leaf, NotebookPen, Plus, Settings, Sparkles } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/nest", label: "Nest", icon: Home },
  { href: "/practices", label: "Practices", icon: Sparkles },
  { href: "/journal", label: "Journal", icon: NotebookPen },
  { href: "/insights", label: "Insights", icon: ChartSpline },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/settings", label: "Settings", icon: Settings },
] as const satisfies readonly { href: Route; label: string; icon: unknown }[];

type IsActive = (href: string) => boolean;
const never: IsActive = () => false;

function useIsActive(): IsActive {
  const pathname = usePathname();
  return (href) => pathname === href || pathname.startsWith(`${href}/`);
}

/** Reads the URL, so it sits behind Suspense; the fallback renders the same links without the active state. */
export function SidebarNav() {
  return <SidebarNavView isActive={useIsActive()} />;
}

export function SidebarNavFallback() {
  return <SidebarNavView isActive={never} />;
}

function SidebarNavView({ isActive }: { isActive: IsActive }) {
  return (
    <nav aria-label="App" className="flex flex-col gap-1">
      <Link
        href="/check-in"
        className="mb-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary shadow-soft transition hover:bg-primary-hover hover:shadow-lift"
      >
        <Plus className="size-4.5" aria-hidden="true" /> New check-in
      </Link>
      <Link
        href="/calm"
        className="-mt-2 mb-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-sky-soft px-5 text-sm font-semibold text-sky transition hover:brightness-95"
      >
        <Leaf className="size-4" aria-hidden="true" /> Calm now
      </Link>
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          className="flex min-h-11 items-center gap-3 rounded-full px-4 font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink aria-[current=page]:bg-primary-soft aria-[current=page]:text-primary"
        >
          <Icon className="size-4.5" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function TabBar() {
  return <TabBarView isActive={useIsActive()} />;
}

export function TabBarFallback() {
  return <TabBarView isActive={never} />;
}

function TabBarView({ isActive }: { isActive: IsActive }) {
  const [nest, practices, journal, insights] = items;
  const left = [nest, practices];
  const right = [journal, insights];

  const tab = ({ href, label, icon: Icon }: (typeof items)[number]) => (
    <li key={href}>
      <Link
        href={href}
        aria-current={isActive(href) ? "page" : undefined}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-ink-muted aria-[current=page]:text-primary"
      >
        <Icon className="size-5" aria-hidden="true" />
        {label}
      </Link>
    </li>
  );

  return (
    <nav
      aria-label="App"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-center px-2">
        {left.map(tab)}
        <li className="flex justify-center">
          <Link
            href="/check-in"
            className="-mt-6 grid size-14 place-items-center rounded-full bg-primary text-on-primary shadow-lift ring-4 ring-canvas"
          >
            <Plus className="size-6" aria-hidden="true" />
            <span className="sr-only">New check-in</span>
          </Link>
        </li>
        {right.map(tab)}
      </ul>
    </nav>
  );
}
