export interface PaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface OrderOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    prefill?: { name?: string; email?: string; contact?: string };
    notes?: Record<string, string>;
    theme?: { color?: string };
}

interface CheckoutOptions extends OrderOptions {
    handler: (response: PaymentResponse) => void;
    modal?: { ondismiss?: () => void; confirm_close?: boolean };
}

interface FailureEvent {
    error: { code: string; description: string; source: string; step: string; reason: string };
}

interface CheckoutInstance {
    open: () => void;
    on: (event: string, handler: (response: FailureEvent) => void) => void;
}

declare global {
    interface Window {
        Razorpay: new (options: CheckoutOptions) => CheckoutInstance;
    }
}
