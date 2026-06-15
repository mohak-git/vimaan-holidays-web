import type { CalculateParams, PriceBreakdown } from "@/types/flights/booking";

export function calculateTotal(params: CalculateParams): PriceBreakdown {
    const {
        farePrice,
        adults,
        insuranceAdded,
        insurancePerPerson,
        promoDiscount,
        seatTotal,
        mealTotal,
        baggageTotal,
        convenienceFee,
    } = params;

    const baseFare = farePrice * adults;
    const taxes = Math.round(baseFare * 0.18);

    const insurance = insuranceAdded ? insurancePerPerson * adults : 0;

    const subtotal =
        baseFare + taxes + seatTotal + mealTotal + baggageTotal + insurance + convenienceFee;

    const promoDiscountValue = Math.min(promoDiscount, subtotal);
    const grandTotal = Math.max(0, subtotal - promoDiscountValue);

    return {
        baseFare,
        taxes,
        seatTotal,
        mealTotal,
        baggageTotal,
        insurance,
        convenienceFee,
        subtotal,
        promoDiscount: promoDiscountValue,
        grandTotal,
    };
}
