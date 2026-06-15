import { AIRCRAFT_TYPES, FARE_TIER_NAMES, FLIGHT_TAGS } from "@/config/constants";
import type { AirlineCode } from "./airline";
import type { FareType } from "./search";

export type Aircraft = (typeof AIRCRAFT_TYPES)[number];
export type FareTierName = (typeof FARE_TIER_NAMES)[number];
export type FlightTag = (typeof FLIGHT_TAGS)[number];

export interface FareTier {
    price: number;
    refundable: boolean;
    checkinBaggage: string;
    cabinBaggage: string;
    mealIncluded: boolean;
    seatSelection: boolean;
}

export interface FlightBookingInfo {
    airline: AirlineCode;
    flightNumber: string;
    from: string;
    to: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
}

export interface Layover {
    airport: string;
    duration: string;
}

export interface Flight {
    id: string;
    airline: AirlineCode;
    flightNumber: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    durationMinutes: number;
    stops: number;
    layovers: Layover[];
    aircraft: Aircraft;
    fares: { saver: FareTier; value: FareTier; flex: FareTier };
    fareTypes: FareType[];
    tags: FlightTag[];
}
