import { promoCodes as mockPromoCodes } from "@/lib/mock/promoCodes";
import type { PromoCode } from "@/types/flights/promo";
import type { FareType } from "@/types/flights/search";

export function getAllPromoCodes(): PromoCode[] {
    return mockPromoCodes;
}

export function validatePromoCode(
    code: string,
    fareTypeContext: FareType,
    subtotal: number,
): PromoCode | null {
    const promo = mockPromoCodes.find((p) => p.code.toUpperCase() === code.toUpperCase());
    if (!promo) return null;

    const isValidForFareType =
        promo.validFor.includes("all" as const) || promo.validFor.includes(fareTypeContext);
    if (!isValidForFareType) return null;

    if (subtotal < promo.minAmount) return null;

    return promo;
}
