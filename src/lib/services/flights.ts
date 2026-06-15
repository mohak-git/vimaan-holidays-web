import { flights as mockFlights } from "@/lib/mock/flights";
import type { Flight } from "@/types/flights/flight";
import type { FareType } from "@/types/flights/search";

export function getFlightById(id: string): Flight | undefined {
    return mockFlights.find((f) => f.id === id);
}

export function getAllFlights(): Flight[] {
    return mockFlights;
}

export function searchFlights(from: string, to: string, fareType?: FareType): Flight[] {
    return mockFlights.filter(
        (f) => f.from === from && f.to === to && (fareType ? f.fareTypes.includes(fareType) : true),
    );
}
