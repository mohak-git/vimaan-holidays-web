"use client";

import { loadScript } from "@/lib/razorpay/loader";
import type { OrderOptions, PaymentResponse } from "@/types/razorpay";
import { useCallback } from "react";
export { createOrder, verifyPayment } from "@/lib/razorpay/api";
export type { OrderOptions, PaymentResponse };

interface OpenRazorpayOptions extends OrderOptions {
    onFailed?: (event: { code: string; description: string }) => void;
}

export function useRazorpay() {
    const openRazorpay = useCallback(
        async (options: OpenRazorpayOptions): Promise<PaymentResponse> => {
            const loaded = await loadScript();
            if (!loaded) throw new Error("Failed to load Razorpay SDK");

            return new Promise<PaymentResponse>((resolve, reject) => {
                const razorpay = new window.Razorpay({
                    ...options,
                    handler: resolve,
                    modal: {
                        ondismiss() {
                            reject(new Error("Payment cancelled by user"));
                        },
                    },
                });

                razorpay.on("payment.failed", (event) => {
                    options.onFailed?.({
                        code: event.error.code,
                        description: event.error.description,
                    });
                });

                razorpay.open();
            });
        },
        [],
    );

    return { openRazorpay };
}
