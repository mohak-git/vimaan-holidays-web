import type { Flight } from "@/types/flights/flight";
import type { FlightFilters, TimeSlot } from "@/types/flights/search";

function getTimeSlot(time: string): TimeSlot {
    const hour = parseInt(time.split(":")[0], 10);
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 16) return "afternoon";
    if (hour >= 16 && hour < 21) return "evening";
    return "night";
}

export function filterFlights(flights: Flight[], filters: FlightFilters): Flight[] {
    return flights.filter((flight) => {
        const minPrice = Math.min(
            flight.fares.saver.price,
            flight.fares.value.price,
            flight.fares.flex.price,
        );

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
