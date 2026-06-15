import "server-only";
import { z } from "zod";

const serverSchema = z.object({
    RAZORPAY_KEY_SECRET: z.string().min(1, "Razorpay Key Secret is required"),
});

export const serverEnv = serverSchema.parse({
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
});
