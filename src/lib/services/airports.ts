import { airports as mockAirports } from "@/lib/mock/airports";
import type { Airport } from "@/types/flights/airport";

export function getAllAirports(): Airport[] {
    return mockAirports;
}

export function getAirportByCode(code: string): Airport | undefined {
    return mockAirports.find((a) => a.code === code);
}
