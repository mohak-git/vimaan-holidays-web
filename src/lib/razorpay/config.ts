import { publicEnv } from "@/config/env";
import { serverEnv } from "@/config/env.server";
import Razorpay from "razorpay";

let instance: Razorpay | null = null;

export function getRazorpayInstance(): Razorpay {
    if (!instance)
        instance = new Razorpay({
            key_id: publicEnv.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: serverEnv.RAZORPAY_KEY_SECRET,
        });

    return instance;
}
