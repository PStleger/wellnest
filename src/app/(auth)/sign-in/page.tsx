import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthAlternatives } from "@/components/auth/auth-alternatives";
import { AuthForm } from "@/components/auth/auth-form";
import { DemoBusyNotice } from "@/components/auth/demo-busy-notice";
import { PageTransition } from "@/components/motion/page-transition";

import { signIn } from "../actions";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your WellNest journal.",
  alternates: { canonical: "/sign-in" },
};

export default function SignInPage() {
  return (
    <PageTransition>
      <h1 className="text-4xl sm:text-5xl">Welcome back</h1>
      <p className="mt-3 text-lg text-ink-muted">Your nest is where you left it.</p>
      <Suspense fallback={null}>
        <DemoBusyNotice />
      </Suspense>
      <div className="mt-10">
        <AuthForm mode="sign-in" action={signIn} />
      </div>
      <AuthAlternatives />
    </PageTransition>
  );
}
