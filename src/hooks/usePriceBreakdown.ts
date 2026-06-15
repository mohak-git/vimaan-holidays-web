"use client";

import { CONVENIENCE_FEE, INSURANCE_PER_PERSON } from "@/config/constants";
import { calculateTotal } from "@/lib/utils/pricing";
import { useBookingStore } from "@/store/useBookingStore";
import type { PriceBreakdown } from "@/types/flights/booking";
import { useMemo } from "react";

export function usePriceBreakdown(includeConvenienceFee = false): PriceBreakdown {
    const farePrice = useBookingStore((s) => s.farePrice);
    const passengerCount = useBookingStore((s) => s.passengers.length);
    const selectedSeats = useBookingStore((s) => s.selectedSeats);
    const selectedMeals = useBookingStore((s) => s.selectedMeals);
    const extraBaggage = useBookingStore((s) => s.extraBaggage);
    const insuranceAdded = useBookingStore((s) => s.insuranceAdded);
    const promoDiscount = useBookingStore((s) => s.promoDiscount);

    return useMemo(() => {
        const seatTotal = selectedSeats.reduce((s, x) => s + x.price, 0);
        const mealTotal = selectedMeals.reduce((s, x) => s + x.price, 0);
        const baggageTotal = extraBaggage.reduce((s, x) => s + x.price, 0);

        return calculateTotal({
            farePrice,
            adults: passengerCount || 1,
            seatTotal,
            mealTotal,
            baggageTotal,
            insuranceAdded,
            insurancePerPerson: INSURANCE_PER_PERSON,
            promoDiscount,
            convenienceFee: includeConvenienceFee ? CONVENIENCE_FEE : 0,
        });
    }, [
        farePrice,
        passengerCount,
        selectedSeats,
        selectedMeals,
        extraBaggage,
        insuranceAdded,
        promoDiscount,
        includeConvenienceFee,
    ]);
}
