import { z } from "zod";

const publicSchema = z.object({
    NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1, "Razorpay Key ID is required"),
});

export const publicEnv = publicSchema.parse({
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
});
