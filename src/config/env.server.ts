import "server-only";
import { z } from "zod";

const serverSchema = z.object({
    BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
    BETTER_AUTH_URL: z.url("BETTER_AUTH_URL must be a valid URL"),

    GOOGLE_CLIENT_ID: z.string().min(1, "Google Client ID is required"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "Google Client Secret is required"),

    DATABASE_URL: z.url("DATABASE_URL must be a valid connection string"),

    RAZORPAY_KEY_SECRET: z.string().min(1, "Razorpay Key Secret is required"),

    BREVO_API_KEY: z.string().min(1, "Brevo API key is required"),
    BREVO_SENDER_EMAIL: z.email("Brevo sender email must be a valid email"),
    BREVO_REPLY_TO_EMAIL: z.email("Brevo reply to email must be a valid email"),
    BREVO_SENDER_NAME: z.string().min(1, "Brevo sender name is required"),
});

export const serverEnv = serverSchema.parse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    DATABASE_URL: process.env.DATABASE_URL,

    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,

    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
    BREVO_REPLY_TO_EMAIL: process.env.BREVO_REPLY_TO_EMAIL,
    BREVO_SENDER_NAME: process.env.BREVO_SENDER_NAME,
});
