"use client";

import { Menu, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Item = { href: Route; label: string };

export function MobileMenu({ items, actions }: { items: readonly Item[]; actions?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-full text-ink hover:bg-surface-2"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full border-b border-line bg-canvas px-4 pt-2 pb-6 shadow-lift",
        )}
      >
        <ul className="grid gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex min-h-12 items-center rounded-2xl px-4 text-lg font-medium text-ink hover:bg-surface-2 aria-[current=page]:bg-primary-soft aria-[current=page]:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {actions ? (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">{actions}</div>
        ) : null}
      </nav>
    </div>
  );
}

/** Static stand-in rendered in the prerendered shell until the menu hydrates. */
export function MobileMenuFallback() {
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={false}
        className="grid size-11 place-items-center rounded-full text-ink hover:bg-surface-2"
      >
        <Menu aria-hidden="true" className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>
    </div>
  );
}
