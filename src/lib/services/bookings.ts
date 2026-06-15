import { bookings as mockBookings } from "@/lib/mock/bookings";
import type { Booking } from "@/types/flights/booking";

export function getMockBookings(): Booking[] {
    return mockBookings;
}
