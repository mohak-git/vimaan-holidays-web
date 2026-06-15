import type { Flight, FlightTag } from "@/types/flights/flight";
import { minFarePrice } from "./flight";

export function sortFlights(flights: Flight[], sortBy: FlightTag): Flight[] {
    const sorted = [...flights];

    switch (sortBy) {
        case "cheapest":
            sorted.sort((a, b) => minFarePrice(a) - minFarePrice(b));
            break;

        case "fastest":
            sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
            break;

        case "earliest":
            sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
            break;

        case "best":
            sorted.sort((a, b) => minFarePrice(a) / a.durationMinutes - minFarePrice(b) / b.durationMinutes);
            break;
    }

    return sorted;
}
