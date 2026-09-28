"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Item = { href: Route; label: string };

function NavList({ items, pathname }: { items: readonly Item[]; pathname: string | null }) {
  return (
    <ul className="flex items-center gap-1">
      {items.map(({ href, label }) => {
        const active = pathname !== null && (pathname === href || pathname.startsWith(`${href}/`));
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center rounded-full px-4 text-[0.95rem] font-medium transition-colors",
                active ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Reads the URL, so it renders behind Suspense with `SiteNavFallback` in the static shell. */
export function SiteNav({ items }: { items: readonly Item[] }) {
  return <NavList items={items} pathname={usePathname()} />;
}

export function SiteNavFallback({ items }: { items: readonly Item[] }) {
  return <NavList items={items} pathname={null} />;
}
