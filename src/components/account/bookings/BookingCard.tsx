import { getAirlineByCode } from "@/lib/services/airlines";
import { getAirportByCode } from "@/lib/services/airports";
import type { Booking } from "@/types/flights/booking";
import { format } from "date-fns";
import { ChevronRight, Plane } from "lucide-react";
import Link from "next/link";

function formatTime(t: string) {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

interface RouteProps {
    from: string;
    to: string;
    date: string;
    depart: string;
    arrive: string;
    duration: string;
}

function FlightRoute({ from, to, depart, arrive, date, duration }: RouteProps) {
    const fromAirport = getAirportByCode(from);
    const toAirport = getAirportByCode(to);

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
                <p className="font-serif text-3xl font-medium text-ink">{from}</p>
                <p className="truncate text-sm text-ink/50">{fromAirport?.city ?? from}</p>
                <p className="mt-2 text-sm font-medium text-ink">{formatTime(depart)}</p>
                <p className="text-xs text-ink/40">{format(new Date(date), "d MMM yy")}</p>
            </div>

            <div className="flex shrink-0 flex-col items-center px-2">
                <span className="text-xs text-ink/40">{duration}</span>
                <div className="my-2 flex w-24 items-center gap-1.5">
                    <div className="h-px flex-1 border-t border-dashed border-ink/20" />
                    <Plane className="h-4 w-4 shrink-0 text-coral" />
                    <div className="h-px flex-1 border-t border-dashed border-ink/20" />
                </div>
                <span className="text-xs text-ink/40">Non-stop</span>
            </div>

            <div className="min-w-0 text-right">
                <p className="font-serif text-3xl font-medium text-ink">{to}</p>
                <p className="truncate text-sm text-ink/50">{toAirport?.city ?? to}</p>
                <p className="mt-2 text-sm font-medium text-ink">{formatTime(arrive)}</p>
                <p className="text-xs text-ink/40">{format(new Date(date), "d MMM yy")}</p>
            </div>
        </div>
    );
}

export default function BookingCard({ booking }: { booking: Booking }) {
    const airline = getAirlineByCode(booking.flight.airline);
    const [dh, dm] = booking.flight.departureTime.split(":").map(Number);
    const [ah, am] = booking.flight.arrivalTime.split(":").map(Number);
    const diff = ah * 60 + am - (dh * 60 + dm);
    const duration = `${Math.floor(diff / 60)}h ${diff % 60}m`;
    const paxLabel = booking.passengers.length === 1 ? "Traveller" : "Travellers";

    return (
        <Link
            href={`/bookings/flight/${booking.bookingRef}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-coral bg-white shadow-sm transition-shadow hover:shadow-soft md:flex-row"
        >
            <div className="flex-1 p-6">
                <div className="mb-6 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral/10">
                        <Plane className="h-4 w-4 text-coral" />
                    </div>
                    <span className="font-medium text-ink">
                        {airline?.name ?? booking.flight.airline}
                    </span>
                    <span className="text-sm text-ink/40">
                        &bull; {booking.flight.flightNumber}
                    </span>
                </div>

                <FlightRoute
                    from={booking.flight.from}
                    to={booking.flight.to}
                    depart={booking.flight.departureTime}
                    arrive={booking.flight.arrivalTime}
                    date={booking.flight.departureDate}
                    duration={duration}
                />
            </div>

            <div className="border-t border-dashed border-coral bg-coral/20 p-6 md:border-t-0 md:border-l md:px-8">
                <div className="mb-6 flex items-start justify-between gap-4 md:mb-10 md:flex-col md:gap-3">
                    <div>
                        <p className="mb-0.5 text-xs uppercase tracking-wider text-ink/40">PNR</p>
                        <p className="font-mono text-lg font-medium text-ink">{booking.pnr}</p>
                    </div>
                    <div>
                        <p className="mb-0.5 text-xs uppercase tracking-wider text-ink/40">
                            {paxLabel}
                        </p>
                        <p className="font-mono text-lg font-medium text-ink">
                            {booking.passengers.length}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-coral transition-colors group-hover:text-coral-hover">
                    View Details
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
            </div>
        </Link>
    );
}
