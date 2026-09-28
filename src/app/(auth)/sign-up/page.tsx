import type { Metadata } from "next";

import { AuthAlternatives } from "@/components/auth/auth-alternatives";
import { AuthForm } from "@/components/auth/auth-form";
import { PageTransition } from "@/components/motion/page-transition";

import { signUp } from "../actions";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a free WellNest account to keep your check-ins and journal.",
  alternates: { canonical: "/sign-up" },
};

export default function SignUpPage() {
  return (
    <PageTransition>
      <h1 className="text-4xl sm:text-5xl">Make yourself a nest</h1>
      <p className="mt-3 text-lg text-ink-muted">
        Free, private, and yours to export or delete at any time. If you&rsquo;ve been trying the demo,
        everything you made comes with you.
      </p>
      <div className="mt-10">
        <AuthForm mode="sign-up" action={signUp} />
      </div>
      <AuthAlternatives />
    </PageTransition>
  );
}
