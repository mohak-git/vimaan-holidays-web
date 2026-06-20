import { serverEnv } from "@/config/env.server";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { waitUntil } from "@vercel/functions";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import "server-only";
import { passwordReset, verificationEmail } from "./email-callbacks";

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema }),
    plugins: [nextCookies()],

    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        revokeSessionsOnPasswordReset: true,
        sendResetPassword: passwordReset,
    },

    emailVerification: {
        sendVerificationEmail: verificationEmail,
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 10 * 60,
    },

    socialProviders: {
        google: {
            clientId: serverEnv.GOOGLE_CLIENT_ID,
            clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
        },
    },

    account: {
        accountLinking: { enabled: true, trustedProviders: ["google"] },
        encryptOAuthTokens: true,
    },

    session: { cookieCache: { enabled: true, maxAge: 300, strategy: "jwt" } },

    user: {
        additionalFields: {
            phone: { type: "string", required: false },
            onboardingComplete: { type: "boolean", required: false, defaultValue: false },
            timezone: { type: "string", required: false },
        },
    },

    rateLimit: {
        enabled: true,
        storage: "database",
        customRules: {
            "/api/auth/sign-in/email": { window: 60, max: 5 },
            "/api/auth/sign-up/email": { window: 60, max: 3 },
        },
    },

    advanced: {
        cookiePrefix: "vh",
        useSecureCookies: process.env.NODE_ENV === "production",
        ipAddress: { ipAddressHeaders: ["x-forwarded-for", "x-real-ip"] },
        backgroundTasks: { handler: (promise) => waitUntil(promise.catch(console.error)) },
    },

    experimental: { joins: true },
});
