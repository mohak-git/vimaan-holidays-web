import "server-only";
import { z } from "zod";

const serverSchema = z.object({
    BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
    BETTER_AUTH_URL: z.url("BETTER_AUTH_URL must be a valid URL"),

    GOOGLE_CLIENT_ID: z.string().min(1, "Google Client ID is required"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "Google Client Secret is required"),

    DATABASE_URL: z.url("DATABASE_URL must be a valid connection string"),

    RAZORPAY_KEY_SECRET: z.string().min(1, "Razorpay Key Secret is required"),
});

export const serverEnv = serverSchema.parse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    DATABASE_URL: process.env.DATABASE_URL,

    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
});
