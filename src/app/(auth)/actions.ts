"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { seedDemoData } from "@/lib/demo-seed";
import { clientIp, consume, hashKey } from "@/lib/rate-limit";

const TOO_MANY = "Too many attempts. Please wait a few minutes and try again.";

export type AuthFormState = {
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "password", string[]>>;
  values?: { name?: string; email?: string };
};

/** Only allow same-site relative redirects, e.g. "/journal/new". */
function safeNext(value: FormDataEntryValue | string | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/nest";
}

/**
 * Where to go after signing in: an explicit `next` field, else the `?next=` of the page the
 * form was posted from. Reading it here keeps the sign-in page fully static.
 */
async function nextDestination(formData: FormData) {
  const explicit = formData.get("next");
  if (typeof explicit === "string" && explicit) return safeNext(explicit);
  const referer = (await headers()).get("referer");
  try {
    return safeNext(referer ? new URL(referer).searchParams.get("next") : null);
  } catch {
    return "/nest";
  }
}

const signInSchema = z.object({
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  password: z.string().min(1, "Enter your password."),
});

export async function signIn(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  const values = { email: String(formData.get("email") ?? "") };
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const ip = await clientIp();
  const allowed =
    (await consume(`sign-in:ip:${ip}`, { limit: 30, windowSeconds: 300 })) &&
    (await consume(`sign-in:email:${hashKey(parsed.data.email)}`, { limit: 10, windowSeconds: 300 }));
  if (!allowed) return { message: TOO_MANY, values };

  try {
    await auth.api.signInEmail({ body: parsed.data, headers: await headers() });
  } catch (error) {
    if (error instanceof APIError) {
      return { message: "That email and password don't match an account.", values };
    }
    throw error;
  }

  redirect((await nextDestination(formData)) as "/nest");
}

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Tell us what to call you.").max(60),
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  password: z.string().min(8, "Use at least 8 characters.").max(128, "Use 128 characters or fewer."),
});

export async function signUp(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  const values = { name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? "") };
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  if (!(await consume(`sign-up:ip:${await clientIp()}`, { limit: 10, windowSeconds: 3600 }))) {
    return { message: TOO_MANY, values };
  }

  try {
    // If a guest is signed in, the anonymous plugin links their demo data to the new account.
    await auth.api.signUpEmail({ body: parsed.data, headers: await headers() });
  } catch (error) {
    if (error instanceof APIError) {
      const exists = error.status === "UNPROCESSABLE_ENTITY" || /exist/i.test(error.message);
      return {
        message: exists
          ? "An account with that email already exists. Try signing in instead."
          : "We couldn't create your account. Please try again.",
        values,
      };
    }
    throw error;
  }

  redirect((await nextDestination(formData)) as "/nest");
}

export async function startDemo(formData: FormData) {
  const requestHeaders = await headers();
  const existing = await auth.api.getSession({ headers: requestHeaders });

  if (!existing) {
    // Each demo writes a few dozen rows, so cap how many one address can create.
    const limit = Number(process.env.DEMO_LIMIT_PER_HOUR) || 20;
    if (!(await consume(`demo:ip:${await clientIp()}`, { limit, windowSeconds: 3600 }))) {
      redirect("/sign-in?demo=busy");
    }
    const { user } = await auth.api.signInAnonymous({ headers: requestHeaders });
    await seedDemoData(user.id);
  }

  redirect(safeNext(formData.get("next")) as "/nest");
}

export async function signInWithGitHub() {
  const { url } = await auth.api.signInSocial({
    body: { provider: "github", callbackURL: "/nest" },
    headers: await headers(),
  });
  if (!url) throw new Error("GitHub sign-in is not available.");
  redirect(url as "/");
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}
