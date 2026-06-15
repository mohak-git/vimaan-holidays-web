import { CONVENIENCE_FEE } from "@/config/constants";
import { validatePromoCode } from "@/lib/services/promoCodes";
import type { ContactDetails, PassengerDetails } from "@/types/flights/booking";
import type { FareTierName, FlightBookingInfo } from "@/types/flights/flight";
import type { FareType } from "@/types/flights/search";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
    flightId: string;
    selectedFare: FareTierName | null;
    fareType: FareType | null;
    farePrice: number;
    flightDetails: FlightBookingInfo | null;
    passengers: PassengerDetails[];
    contactDetails: ContactDetails | null;
    selectedSeats: { passengerId: string; seatId: string; price: number }[];
    selectedMeals: { passengerId: string; mealId: string; price: number }[];
    extraBaggage: { passengerId: string; baggageId: string; price: number }[];
    insuranceAdded: boolean;
    promoCode: string;
    promoDiscount: number;
    setFlight: (
        flightId: string,
        fare: FareTierName,
        fareType: FareType,
        farePrice: number,
        details: BookingState["flightDetails"],
    ) => void;
    setPassengers: (passengers: PassengerDetails[]) => void;
    setContactDetails: (details: ContactDetails) => void;
    setSeat: (passengerId: string, seatId: string, price: number) => void;
    removeSeat: (passengerId: string) => void;
    setMeal: (passengerId: string, mealId: string, price: number) => void;
    removeMeal: (passengerId: string) => void;
    setExtraBaggage: (passengerId: string, baggageId: string, price: number) => void;
    removeExtraBaggage: (passengerId: string) => void;
    toggleInsurance: () => void;
    applyPromo: (code: string, fareTypeContext: FareType) => boolean;
    removePromo: () => void;
    resetBooking: () => void;
}

const initialState = {
    flightId: "",
    selectedFare: null,
    fareType: null,
    farePrice: 0,
    flightDetails: null,
    passengers: [],
    contactDetails: null,
    selectedSeats: [],
    selectedMeals: [],
    extraBaggage: [],
    insuranceAdded: false,
    promoCode: "",
    promoDiscount: 0,
};

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            ...initialState,
            setFlight: (flightId, fare, fareType, farePrice, details) =>
                set({ flightId, selectedFare: fare, fareType, farePrice, flightDetails: details }),
            setPassengers: (passengers) => set({ passengers }),
            setContactDetails: (details) => set({ contactDetails: details }),
            setSeat: (passengerId, seatId, price) =>
                set((state) => {
                    const existing = state.selectedSeats.filter(
                        (s) => s.passengerId !== passengerId,
                    );
                    return { selectedSeats: [...existing, { passengerId, seatId, price }] };
                }),
            removeSeat: (passengerId) =>
                set((state) => ({
                    selectedSeats: state.selectedSeats.filter((s) => s.passengerId !== passengerId),
                })),
            setMeal: (passengerId, mealId, price) =>
                set((state) => {
                    const existing = state.selectedMeals.filter(
                        (m) => m.passengerId !== passengerId,
                    );
                    return { selectedMeals: [...existing, { passengerId, mealId, price }] };
                }),
            removeMeal: (passengerId) =>
                set((state) => ({
                    selectedMeals: state.selectedMeals.filter((m) => m.passengerId !== passengerId),
                })),
            setExtraBaggage: (passengerId, baggageId, price) =>
                set((state) => {
                    const existing = state.extraBaggage.filter(
                        (b) => b.passengerId !== passengerId,
                    );
                    return { extraBaggage: [...existing, { passengerId, baggageId, price }] };
                }),
            removeExtraBaggage: (passengerId) =>
                set((state) => ({
                    extraBaggage: state.extraBaggage.filter((b) => b.passengerId !== passengerId),
                })),
            toggleInsurance: () => set((state) => ({ insuranceAdded: !state.insuranceAdded })),
            applyPromo: (code, fareTypeContext) => {
                const state = get();
                const baseFare = state.farePrice * state.passengers.length;
                const subtotal = baseFare + Math.round(baseFare * 0.18) + CONVENIENCE_FEE;

                const promo = validatePromoCode(code, fareTypeContext, subtotal);
                if (!promo) return false;

                set({ promoCode: promo.code, promoDiscount: promo.discount });
                return true;
            },
            removePromo: () => set({ promoCode: "", promoDiscount: 0 }),
            resetBooking: () => set({ ...initialState }),
        }),
        { name: "booking-storage" },
    ),
);
