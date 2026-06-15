import { airlines as mockAirlines } from "@/lib/mock/airlines";
import type { Airline } from "@/types/flights/airline";

export function getAllAirlines(): Airline[] {
    return mockAirlines;
}

export function getAirlineByCode(code: string): Airline | undefined {
    return mockAirlines.find((a) => a.code === code);
}
