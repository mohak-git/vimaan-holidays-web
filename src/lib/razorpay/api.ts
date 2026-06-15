import type { PaymentResponse } from "@/types/razorpay";

interface OrderResult {
    id: string;
    amount: number;
    currency: string;
    key_id: string;
}

export async function createOrder(amountInPaise: number, receipt?: string): Promise<OrderResult> {
    const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise, currency: "INR", receipt }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Failed to create payment order");
    }

    return res.json();
}

interface VerificationResult {
    success: boolean;
    message?: string;
}

export async function verifyPayment(response: PaymentResponse): Promise<VerificationResult> {
    const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? "Payment verification failed");
    }

    return res.json();
}
