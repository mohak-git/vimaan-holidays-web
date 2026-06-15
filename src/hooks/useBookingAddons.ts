import { getBaggageOptions, getMeals, getSeatMap } from "@/lib/services/addons";
import { calculateTotal } from "@/lib/utils/calculateFare";
import { useBookingStore } from "@/store/useBookingStore";
import type { PriceBreakdown } from "@/types/flights/booking";
import { CONVENIENCE_FEE, INSURANCE_PER_PERSON } from "@/types/flights/constants";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function useBookingAddons() {
    const router = useRouter();
    const params = useParams();
    const flightIdFromUrl = params.flightId as string;

    const {
        flightId,
        selectedFare,
        farePrice,
        flightDetails,
        passengers,
        selectedSeats,
        selectedMeals,
        extraBaggage,
        insuranceAdded,
        setSeat,
        removeSeat,
        setMeal,
        removeMeal,
        setExtraBaggage,
        removeExtraBaggage,
        toggleInsurance,
        calculateTotal: recalcTotal,
    } = useBookingStore();

    const resolvedFlightId = flightId || flightIdFromUrl;

    useEffect(() => {
        if (!resolvedFlightId) router.replace("/");
    }, [resolvedFlightId, router]);

    const [activePassengerIdx, setActivePassengerIdx] = useState(0);
    const safeActiveIdx = Math.min(activePassengerIdx, Math.max(passengers.length - 1, 0));

    const baggageOptions = useMemo(() => getBaggageOptions(), []);
    const meals = useMemo(() => getMeals(), []);
    const seatMap = useMemo(() => getSeatMap(), []);

    const activePassenger = passengers[safeActiveIdx];

    const breakdown = useMemo((): PriceBreakdown => {
        const seatTotal = selectedSeats.reduce((s, seat) => s + seat.price, 0);
        const mealTotal = selectedMeals.reduce((s, m) => s + m.price, 0);
        const baggageTotal = extraBaggage.reduce((s, b) => s + b.price, 0);

        return calculateTotal({
            farePrice,
            adults: passengers.length || 1,
            seatTotal,
            mealTotal,
            baggageTotal,
            insuranceAdded,
            insurancePerPerson: INSURANCE_PER_PERSON,
            promoDiscount: 0,
            convenienceFee: CONVENIENCE_FEE,
        });
    }, [farePrice, passengers.length, selectedSeats, selectedMeals, extraBaggage, insuranceAdded]);

    const passengerLabel = useCallback(
        (idx: number) => {
            const p = passengers[idx];
            if (p?.firstName) return `${p.firstName} ${p.lastName}`;
            const label = p?.type === "child" ? "Child" : p?.type === "infant" ? "Infant" : "Adult";
            return `${label} ${idx + 1}`;
        },
        [passengers],
    );

    const handleSeatSelect = useCallback(
        (seatId: string, price: number) => {
            if (!activePassenger) return;

            const takenByOther = selectedSeats.some(
                (s) => s.seatId === seatId && s.passengerId !== activePassenger.id,
            );
            if (takenByOther) {
                toast.error("This seat is already taken");
                return;
            }

            const existing = selectedSeats.find((s) => s.passengerId === activePassenger.id);

            if (existing) {
                if (existing.seatId !== seatId) {
                    removeSeat(activePassenger.id);
                    setSeat(activePassenger.id, seatId, price);
                }
                return;
            }

            setSeat(activePassenger.id, seatId, price);
            toast.success(`Seat ${seatId} selected`);
        },
        [activePassenger, selectedSeats, setSeat, removeSeat],
    );

    const handleMealSelect = useCallback(
        (passengerId: string) => (mealId: string | null) => {
            if (mealId === null) {
                removeMeal(passengerId);
                return;
            }
            const meal = meals.find((m) => m.id === mealId);
            if (meal) {
                setMeal(passengerId, mealId, meal.price);
                toast.success("Meal added");
            }
        },
        [meals, setMeal, removeMeal],
    );

    const handleBaggageSelect = useCallback(
        (passengerId: string) => (baggageId: string | null) => {
            if (baggageId === null) {
                removeExtraBaggage(passengerId);
                return;
            }
            const option = baggageOptions.find((b) => b.id === baggageId);
            if (option) {
                setExtraBaggage(passengerId, baggageId, option.price);
                toast.success("Extra baggage added");
            }
        },
        [baggageOptions, setExtraBaggage, removeExtraBaggage],
    );

    const handleContinue = useCallback(() => {
        recalcTotal();
        router.push(`/flights/${resolvedFlightId}/booking/payment`);
    }, [recalcTotal, router, resolvedFlightId]);

    return {
        resolvedFlightId,
        selectedFare,
        farePrice,
        flightDetails,
        passengers,
        activePassengerIdx,
        setActivePassengerIdx,
        safeActiveIdx,
        activePassenger,
        seatMap,
        meals,
        baggageOptions,
        selectedSeats,
        selectedMeals,
        extraBaggage,
        insuranceAdded,
        breakdown,
        passengerLabel,
        handleSeatSelect,
        handleMealSelect,
        handleBaggageSelect,
        handleToggleInsurance: toggleInsurance,
        handleContinue,
    };
}
