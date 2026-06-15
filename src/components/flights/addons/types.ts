import type { BaggageOption } from "@/types/flights/baggage";
import type { Meal } from "@/types/flights/meal";
import type { SeatMap } from "@/types/flights/seat";

export interface PassengerInfo {
    id: string;
    firstName?: string;
    lastName?: string;
    type?: string;
}

export interface SeatSectionProps {
    passengers: PassengerInfo[];
    activePassengerIdx: number;
    onPassengerChange: (idx: number) => void;
    activePassenger: PassengerInfo | undefined;
    seatMap: SeatMap;
    selectedSeats: { passengerId: string; seatId: string; price: number }[];
    onSeatSelect: (seatId: string, price: number) => void;
    getPassengerLabel: (idx: number) => string;
}

export interface MealSectionProps {
    passengers: PassengerInfo[];
    meals: Meal[];
    selectedMeals: { passengerId: string; mealId: string }[];
    onMealSelect: (passengerId: string) => (mealId: string | null) => void;
    getPassengerLabel: (idx: number) => string;
}

export interface BaggageSectionProps {
    passengers: PassengerInfo[];
    baggageOptions: BaggageOption[];
    extraBaggage: { passengerId: string; baggageId: string }[];
    onBaggageSelect: (passengerId: string) => (baggageId: string | null) => void;
    getPassengerLabel: (idx: number) => string;
}

export interface InsuranceSectionProps {
    insuranceAdded: boolean;
    onToggle: () => void;
}
