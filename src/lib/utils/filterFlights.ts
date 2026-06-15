import type { Flight } from "@/types/flights/flight";
import type { FlightFilters } from "@/types/flights/search";
import { getTimeSlot, minFarePrice } from "./flight";

export function filterFlights(flights: Flight[], filters: FlightFilters): Flight[] {
    return flights.filter((flight) => {
        const minPrice = minFarePrice(flight);

        if (minPrice < filters.priceRange[0] || minPrice > filters.priceRange[1]) return false;

        if (filters.stops.length > 0 && !filters.stops.includes(flight.stops)) return false;

        if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;

        if (filters.departureTimeSlots.length > 0) {
            const slot = getTimeSlot(flight.departureTime);
            if (!filters.departureTimeSlots.includes(slot)) return false;
        }

        if (filters.arrivalTimeSlots.length > 0) {
            const slot = getTimeSlot(flight.arrivalTime);
            if (!filters.arrivalTimeSlots.includes(slot)) return false;
        }

        if (filters.maxDuration > 0 && flight.durationMinutes > filters.maxDuration) return false;

        if (filters.fareType === "refundable") {
            const hasRefundable = Object.values(flight.fares).some((f) => f.refundable);
            if (!hasRefundable) return false;
        } else if (filters.fareType === "non-refundable") {
            const hasNonRefundable = Object.values(flight.fares).some((f) => !f.refundable);
            if (!hasNonRefundable) return false;
        }

        return true;
    });
}
