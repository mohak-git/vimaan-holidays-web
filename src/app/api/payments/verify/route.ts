import { verifyPaymentSchema } from "@/lib/razorpay/validations";
import { NextRequest } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => null);

        if (!body) {
            return Response.json(
                { success: false, message: "Invalid request body" },
                { status: 400 },
            );
        }

        const parsed = verifyPaymentSchema.safeParse(body);
        if (!parsed.success)
            return Response.json(
                { success: false, message: "Missing or invalid required payment fields" },
                { status: 400 },
            );

        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret) {
            console.error("[verify] RAZORPAY_KEY_SECRET is not configured");
            return Response.json(
                { success: false, message: "Server configuration error" },
                { status: 500 },
            );
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

        const isValid = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            secret,
        );

        if (isValid) return Response.json({ success: true });

        return Response.json(
            { success: false, message: "Invalid payment signature" },
            { status: 400 },
        );
    } catch (error) {
        console.error("[verify] Payment verification failed:", error);
        return Response.json({ success: false, message: "Verification failed" }, { status: 500 });
    }
}
