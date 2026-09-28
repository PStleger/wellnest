import { CalendarPlus, Download } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { signOut } from "@/app/(auth)/actions";
import { NameForm } from "@/components/app/name-form";
import { CueSettings, MotionSetting } from "@/components/app/preference-settings";
import { PageHeader, Skeleton } from "@/components/app/page-header";
import { PageTransition } from "@/components/motion/page-transition";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { buttonStyles, LinkButton } from "@/components/ui/button";
import { inputStyles } from "@/components/ui/field";
import { ConfirmDelete } from "@/components/ui/confirm-delete";
import { SubmitButton } from "@/components/ui/submit-button";
import { requireUser } from "@/lib/session";

import { deleteAccount } from "./actions";

export const metadata: Metadata = { title: "Settings" };

const section = "rounded-(--radius-card) border border-line bg-surface p-6 shadow-soft sm:p-8";

export default function SettingsPage() {
  return (
    <PageTransition>
      <PageHeader title="Settings" />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Settings />
      </Suspense>
    </PageTransition>
  );
}

async function Settings() {
  const user = await requireUser();

  return (
    <div className="max-w-3xl space-y-6">
      <section aria-labelledby="profile-title" className={section}>
        <h2 id="profile-title" className="text-2xl">
          Profile
        </h2>
        {user.isGuest ? (
          <div className="mt-4 space-y-4">
            <p className="text-ink-muted">
              You&rsquo;re using a guest nest. Create an account to keep your check-ins and journal, and to
              sign in from other devices.
            </p>
            <LinkButton href="/sign-up">Create an account</LinkButton>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <NameForm name={user.name} />
            <p className="text-sm text-ink-muted">Signed in as {user.email}</p>
          </div>
        )}
      </section>

      <section aria-labelledby="appearance-title" className={section}>
        <h2 id="appearance-title" className="text-2xl">
          Appearance
        </h2>
        <p className="mt-2 text-ink-muted">Follow your device, or choose light or dark.</p>
        <ThemeToggle className="mt-5" />
      </section>

      <section aria-labelledby="calm-title" className={section}>
        <h2 id="calm-title" className="text-2xl">
          Motion &amp; guidance
        </h2>
        <div className="mt-6 space-y-8">
          <MotionSetting />
          <CueSettings />
        </div>
      </section>

      <section aria-labelledby="reminder-title" className={section}>
        <h2 id="reminder-title" className="text-2xl">
          Daily reminder
        </h2>
        <p className="mt-2 text-ink-muted">
          Add a gentle daily nudge to your own calendar. It works with Apple, Google and Outlook calendars,
          and you can change or delete it there any time.
        </p>
        <form action="/api/reminder" method="get" className="mt-5 flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="reminder-time" className="mb-2 block text-sm font-semibold">
              Time
            </label>
            <input
              id="reminder-time"
              name="time"
              type="time"
              defaultValue="20:00"
              required
              className={`${inputStyles} w-40`}
            />
          </div>
          <button type="submit" className={buttonStyles({ variant: "secondary" })}>
            <CalendarPlus className="size-4" aria-hidden="true" /> Add to calendar
          </button>
        </form>
      </section>

      <section aria-labelledby="data-title" className={section}>
        <h2 id="data-title" className="text-2xl">
          Your data
        </h2>
        <p className="mt-2 text-ink-muted">
          Download everything WellNest stores about you (check-ins, journal entries and saved guides) as a
          JSON file.
        </p>
        <a href="/api/export" download className={buttonStyles({ variant: "secondary", className: "mt-5" })}>
          <Download className="size-4" aria-hidden="true" /> Download my data
        </a>
      </section>

      <section aria-labelledby="account-title" className={section}>
        <h2 id="account-title" className="text-2xl">
          Account
        </h2>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <form action={signOut}>
            <SubmitButton variant="secondary" pendingLabel="Signing out…">
              Sign out
            </SubmitButton>
          </form>
          <ConfirmDelete
            action={deleteAccount}
            label={user.isGuest ? "Delete this guest nest" : "Delete my account"}
            description="Your check-ins, journal and saved guides will be permanently deleted. This can't be undone."
            confirmLabel="Delete everything"
          />
        </div>
      </section>
    </div>
  );
}
