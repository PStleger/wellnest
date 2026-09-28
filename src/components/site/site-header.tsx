import { Leaf } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Logo } from "@/components/brand/logo";
import { LinkButton } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";

import { DemoButton } from "./demo-button";
import { MobileMenu, MobileMenuFallback } from "./mobile-menu";
import { SiteNav, SiteNavFallback } from "./nav-link";

export const siteNav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/practices", label: "Practices" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
] as const;

function GuestActions() {
  return (
    <>
      <LinkButton href="/sign-in" variant="ghost" size="sm">
        Sign in
      </LinkButton>
      <DemoButton size="sm" />
    </>
  );
}

async function AccountActions() {
  const user = await getCurrentUser();
  if (!user) return <GuestActions />;
  return (
    <LinkButton href="/nest" size="sm">
      Open your nest
    </LinkButton>
  );
}

/** Rendered in the header on wider screens and inside the menu on phones. */
function Actions() {
  return (
    <Suspense fallback={<GuestActions />}>
      <AccountActions />
    </Suspense>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:h-18 sm:px-6">
        <Link href="/" className="rounded-full text-ink" aria-label="WellNest home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="ml-6 hidden md:block">
          <Suspense fallback={<SiteNavFallback items={siteNav} />}>
            <SiteNav items={siteNav} />
          </Suspense>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/calm"
            className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full bg-sky-soft px-3 text-sm font-semibold text-sky transition hover:brightness-95 sm:px-4"
          >
            <Leaf className="size-4" aria-hidden="true" />
            <span className="max-sm:sr-only">Calm now</span>
          </Link>
          <div className="hidden items-center gap-2 sm:flex">
            <Actions />
          </div>
          <Suspense fallback={<MobileMenuFallback />}>
            <MobileMenu items={siteNav} actions={<Actions />} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
