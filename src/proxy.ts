import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Optimistic check only: bounces visitors without a session cookie before any
 * rendering happens. Pages still verify the session on the server (see lib/session.ts).
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const signIn = new URL("/sign-in", request.url);
  signIn.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signIn);
}

export const config = {
  matcher: [
    "/nest/:path*",
    "/check-in/:path*",
    "/check-ins/:path*",
    "/journal/:path*",
    "/insights/:path*",
    "/saved/:path*",
    "/settings/:path*",
  ],
};
