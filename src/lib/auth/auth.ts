import { serverEnv } from "@/config/env.server";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema }),
    plugins: [nextCookies()],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        sendResetPassword: async ({ user, url }) =>
            console.log(`Reset password email to ${user.email}: ${url}`),
    },
    socialProviders: {
        google: {
            clientId: serverEnv.GOOGLE_CLIENT_ID,
            clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            phone: { type: "string", required: false },
            onboardingComplete: { type: "boolean", required: false, defaultValue: false },
            timezone: { type: "string", required: false },
        },
    },
    experimental: { joins: true },
    advanced: { cookiePrefix: "vh" },
});
