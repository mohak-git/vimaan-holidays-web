import { getRazorpayInstance } from "@/lib/razorpay/config";
import { createOrderSchema } from "@/lib/razorpay/validations";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => null);

        if (!body) return Response.json({ error: "Invalid request body" }, { status: 400 });

        const parsed = createOrderSchema.safeParse(body);
        if (!parsed.success)
            return Response.json(
                { error: parsed.error.issues[0]?.message ?? "Invalid input data" },
                { status: 400 },
            );

        const razorpay = getRazorpayInstance();
        const order = await razorpay.orders.create(parsed.data);

        return Response.json({ ...order, key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID });
    } catch (error) {
        console.error("[create-order] Razorpay order creation failed:", error);
        return Response.json({ error: "Failed to create order" }, { status: 500 });
    }
}
