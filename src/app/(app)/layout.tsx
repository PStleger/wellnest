import { LogOut } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { signOut } from "@/app/(auth)/actions";
import { SidebarNav, SidebarNavFallback, TabBar, TabBarFallback } from "@/components/app/app-nav";
import { Logo, LogoMark } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { LinkButton } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";

async function AccountCard() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-3 rounded-3xl bg-surface-2/70 p-4">
      <p className="truncate font-semibold" title={user.name}>
        {user.isGuest ? "Guest" : user.name}
      </p>
      {user.isGuest ? (
        <>
          <p className="-mt-1 text-sm text-ink-muted">A demo nest, cleared after a week.</p>
          <LinkButton href="/sign-up" size="sm" className="w-full">
            Keep my nest
          </LinkButton>
        </>
      ) : null}
      {user.email ? <p className="-mt-2 truncate text-sm text-ink-muted">{user.email}</p> : null}
      <form action={signOut}>
        <button
          type="submit"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink"
        >
          <LogOut className="size-4" aria-hidden="true" /> Sign out
        </button>
      </form>
    </div>
  );
}

async function MobileAccountLink() {
  const user = await getCurrentUser();
  if (user?.isGuest) {
    return (
      <LinkButton href="/sign-up" size="sm">
        Keep my nest
      </LinkButton>
    );
  }
  return <SettingsLink />;
}

function SettingsLink() {
  return (
    <Link
      href="/settings"
      className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold text-ink-muted hover:bg-surface-2"
    >
      Settings
    </Link>
  );
}

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-line p-6 lg:flex">
        <Link href="/" className="self-start rounded-full" aria-label="WellNest home">
          <Logo />
        </Link>
        <Suspense fallback={<SidebarNavFallback />}>
          <SidebarNav />
        </Suspense>
        <div className="mt-auto space-y-4">
          <Suspense fallback={<div className="h-28 rounded-3xl bg-surface-2/70" />}>
            <AccountCard />
          </Suspense>
          <ThemeToggle />
        </div>
      </aside>

      <header className="flex items-center justify-between px-4 py-3 lg:hidden">
        <Link href="/nest" className="rounded-full" aria-label="WellNest, your nest">
          <LogoMark />
        </Link>
        <Suspense fallback={<SettingsLink />}>
          <MobileAccountLink />
        </Suspense>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl px-4 pt-4 pb-32 sm:px-6 lg:px-10 lg:pt-10 lg:pb-16">
        {children}
      </main>

      <Suspense fallback={<TabBarFallback />}>
        <TabBar />
      </Suspense>
    </div>
  );
}
