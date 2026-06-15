import { FARE_TYPES, REFUND_TYPES, TIME_SLOTS, TRAVEL_CLASSES } from "@/config/constants";
import type { AirlineCode } from "./airline";

export type TravelClass = (typeof TRAVEL_CLASSES)[number];
export type FareType = (typeof FARE_TYPES)[number];
export type TimeSlot = (typeof TIME_SLOTS)[number];
export type RefundType = (typeof REFUND_TYPES)[number];

export interface Travellers {
    adults: number;
    children: number;
    infants: number;
}

export interface SearchParams {
    from: string;
    to: string;
    date: string;
    travellers: Travellers;
    travelClass: TravelClass;
    fareType: FareType;
}

export interface RecentSearch extends SearchParams {
    timestamp: number;
}

export interface FlightFilters {
    priceRange: [number, number];
    stops: number[];
    airlines: AirlineCode[];
    departureTimeSlots: TimeSlot[];
    arrivalTimeSlots: TimeSlot[];
    fareType: RefundType | "all";
    maxDuration: number;
}
