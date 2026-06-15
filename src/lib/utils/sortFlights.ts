import type { Flight, FlightTag } from "@/types/flights/flight";

export function sortFlights(flights: Flight[], sortBy: FlightTag): Flight[] {
    const sorted = [...flights];

    switch (sortBy) {
        case "cheapest":
            sorted.sort((a, b) => {
                const aMin = Math.min(a.fares.saver.price, a.fares.value.price, a.fares.flex.price);
                const bMin = Math.min(b.fares.saver.price, b.fares.value.price, b.fares.flex.price);
                return aMin - bMin;
            });
            break;

        case "fastest":
            sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
            break;

        case "earliest":
            sorted.sort((a, b) => {
                const aTime = a.departureTime.replace(":", "");
                const bTime = b.departureTime.replace(":", "");
                return aTime.localeCompare(bTime);
            });
            break;

        case "best":
            sorted.sort((a, b) => {
                const aMin = Math.min(a.fares.saver.price, a.fares.value.price, a.fares.flex.price);
                const bMin = Math.min(b.fares.saver.price, b.fares.value.price, b.fares.flex.price);
                const aScore = aMin / a.durationMinutes;
                const bScore = bMin / b.durationMinutes;
                return aScore - bScore;
            });
            break;
    }

    return sorted;
}
