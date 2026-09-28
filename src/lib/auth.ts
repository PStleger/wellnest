import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { anonymous } from "better-auth/plugins";
import { eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { account, bookmark, checkIn, journalEntry, session, user, verification } from "@/lib/db/schema";
import { site } from "@/lib/site";

const githubConfigured = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);

export const socialProviders = { github: githubConfigured } as const;

export const auth = betterAuth({
  appName: site.name,
  baseURL: process.env.BETTER_AUTH_URL || site.url,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [site.url, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`].filter(
    (origin): origin is string => Boolean(origin),
  ),
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  socialProviders: githubConfigured
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
      }
    : {},
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  rateLimit: {
    enabled: process.env.NODE_ENV === "production",
    window: 60,
    max: 30,
  },
  plugins: [
    anonymous({
      emailDomainName: "demo.wellnest.invalid",
      generateName: () => "Guest",
      // A guest who creates a real account keeps everything they made during the demo.
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        const from = anonymousUser.user.id;
        const to = newUser.user.id;
        await db.transaction(async (tx) => {
          await tx.update(checkIn).set({ userId: to }).where(eq(checkIn.userId, from));
          await tx.update(journalEntry).set({ userId: to }).where(eq(journalEntry.userId, from));
          await tx.execute(
            sql`insert into ${bookmark} (user_id, slug, created_at)
                select ${to}, slug, created_at from ${bookmark} where user_id = ${from}
                on conflict do nothing`,
          );
        });
      },
    }),
    // Must stay last: lets Server Actions set auth cookies.
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
