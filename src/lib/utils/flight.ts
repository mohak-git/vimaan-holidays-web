import type { FareTierName, Flight } from "@/types/flights/flight";
import type { TimeSlot } from "@/types/flights/search";

export const TAX_RATE = 0.18;

export function priceWithTax(price: number): number {
    return Math.round(price * (1 + TAX_RATE));
}

export function minFarePrice(flight: Flight): number {
    return Math.min(flight.fares.saver.price, flight.fares.value.price, flight.fares.flex.price);
}

export function getTimeSlot(time: string): TimeSlot {
    const hour = parseInt(time.split(":")[0], 10);
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 16) return "afternoon";
    if (hour >= 16 && hour < 21) return "evening";
    return "night";
}

export const FARE_TIER_KEYS: FareTierName[] = ["saver", "value", "flex"];

export function getFareEntries(fares: Flight["fares"]): [FareTierName, Flight["fares"]["saver"]][] {
    return FARE_TIER_KEYS.map((key) => [key, fares[key]]);
}
