import type { PromoCode } from "@/types/flights/promo";

export const promoCodes: PromoCode[] = [
    {
        code: "FIRST100",
        discount: 100,
        minAmount: 2000,
        description: "₹100 off on your first booking",
        validFor: ["all"],
    },
    {
        code: "SAVE500",
        discount: 500,
        minAmount: 5000,
        description: "₹500 off on bookings above ₹5000",
        validFor: ["all"],
    },
    {
        code: "STUDENT200",
        discount: 200,
        minAmount: 3000,
        description: "₹200 off for students",
        validFor: ["student"],
    },
    {
        code: "ARMY300",
        discount: 300,
        minAmount: 4000,
        description: "₹300 off for armed forces",
        validFor: ["army"],
    },
    {
        code: "SENIOR150",
        discount: 150,
        minAmount: 2500,
        description: "₹150 off for senior citizens",
        validFor: ["senior"],
    },
    {
        code: "FLIGHT50",
        discount: 50,
        minAmount: 500,
        description: "₹50 off on any booking",
        validFor: ["all"],
    },
];
