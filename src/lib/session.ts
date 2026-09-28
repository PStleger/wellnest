import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { auth } from "@/lib/auth";

/**
 * Data Access Layer entry point. Every query and mutation resolves the user
 * through here, so ownership is enforced on the server, never trusted from input.
 */
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session) return null;
  const { id, name, email } = session.user;
  const isGuest = Boolean((session.user as { isAnonymous?: boolean | null }).isAnonymous);
  return { id, name, email: isGuest ? "" : email, isGuest };
});

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  return user;
}
