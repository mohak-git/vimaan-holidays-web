import { baggageOptions as mockBaggageOptions } from "@/lib/mock/baggageOptions";
import { meals as mockMeals } from "@/lib/mock/meals";
import { seatMap as mockSeatMap } from "@/lib/mock/seatMap";
import type { BaggageOption } from "@/types/flights/baggage";
import type { Meal } from "@/types/flights/meal";
import type { SeatMap } from "@/types/flights/seat";

export function getBaggageOptions(): BaggageOption[] {
    return mockBaggageOptions;
}

export function getMeals(): Meal[] {
    return mockMeals;
}

export function getSeatMap(): SeatMap {
    return mockSeatMap;
}
