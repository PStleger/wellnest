import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What WellNest stores, why, and how to export or delete it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="text-sm font-semibold text-primary">Privacy</p>
        <h1 className="mt-2 text-5xl sm:text-6xl">Your inner life is yours</h1>
        <p className="mt-6 text-xl text-ink-muted">
          The short version: WellNest stores only what it needs to work, shows no ads, runs no trackers, and
          lets you take everything with you or delete it at any time.
        </p>

        <div className="prose-calm mt-12">
          <h2>What we store</h2>
          <ul>
            <li>
              <strong>Your account:</strong> name, email and a securely hashed password. Guest accounts have
              no email.
            </li>
            <li>
              <strong>Your check-ins:</strong> the words and feelings you chose, the body area, colour, shape,
              texture and intensity, and how long the check-in took.
            </li>
            <li>
              <strong>Your journal:</strong> entries you write, and which check-in they belong to.
            </li>
            <li>
              <strong>Saved guides:</strong> which library articles you bookmarked.
            </li>
          </ul>

          <h2>Cookies and local storage</h2>
          <ul>
            <li>A session cookie keeps you signed in. It is HTTP-only and can&rsquo;t be read by scripts.</li>
            <li>A small time zone cookie makes dates show in your local time.</li>
            <li>
              Your theme choice and any unfinished check-in stay in your browser and never reach our servers.
            </li>
          </ul>
          <p>There are no analytics, advertising or third-party tracking cookies.</p>

          <h2>Your controls</h2>
          <ul>
            <li>
              <strong>Export:</strong> download all of your data as JSON from Settings.
            </li>
            <li>
              <strong>Delete:</strong> delete your account from Settings. Everything linked to it is removed
              immediately.
            </li>
            <li>
              <strong>Guest nests</strong> are deleted automatically a week after they were created.
            </li>
          </ul>

          <h2>A portfolio project</h2>
          <p>
            WellNest is a personal portfolio project, not a medical service. Please don&rsquo;t rely on it to
            store anything you couldn&rsquo;t bear to lose, and never use it in place of professional care.
          </p>
        </div>
      </article>
    </PageTransition>
  );
}
