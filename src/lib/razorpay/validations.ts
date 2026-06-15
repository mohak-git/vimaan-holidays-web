import { z } from "zod";

export const createOrderSchema = z.object({
    amount: z.number().int().positive("amount must be a positive integer (in paise)"),
    currency: z.string().default("INR"),
    receipt: z.string().optional(),
    notes: z.record(z.string(), z.string()).optional(),
});

export const verifyPaymentSchema = z.object({
    razorpay_order_id: z.string("Missing razorpay_order_id"),
    razorpay_payment_id: z.string("Missing razorpay_payment_id"),
    razorpay_signature: z.string("Missing razorpay_signature"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
