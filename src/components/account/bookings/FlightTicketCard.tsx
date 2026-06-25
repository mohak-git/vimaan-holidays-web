import { getAirlineByCode } from "@/lib/services/airlines";
import { getAirportByCode } from "@/lib/services/airports";
import { getFlightById } from "@/lib/services/flights";
import { formatTime } from "@/lib/utils/formatTime";
import type { Booking } from "@/types/flights/booking";
import type { FareTierName } from "@/types/flights/flight";
import { format } from "date-fns";

const FARE_TIER_LABELS: Record<FareTierName, string> = {
    saver: "Saver",
    value: "Value",
    flex: "Flex",
};

export function FlightTicketCard({ booking }: { booking: Booking }) {
    const airline = getAirlineByCode(booking.flight.airline);
    const fromAirport = getAirportByCode(booking.flight.from);
    const toAirport = getAirportByCode(booking.flight.to);
    const flight = getFlightById(booking.flightId);
    const fareLabel = FARE_TIER_LABELS[booking.fareType];
    const stops = [
        {
            dotClass: "bg-coral",
            time: formatTime(booking.flight.departureTime),
            code: booking.flight.from,
            name: fromAirport?.name ?? booking.flight.from,
            date: booking.flight.departureDate,
        },
        {
            dotClass: "bg-ink",
            time: formatTime(booking.flight.arrivalTime),
            code: booking.flight.to,
            name: toAirport?.name ?? booking.flight.to,
            date: booking.flight.departureDate,
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-dark">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-sand-dark">
                <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: airline?.color ?? "#d4af37" }}
                >
                    {airline?.logo ?? booking.flight.airline}
                </div>
                <div>
                    <h3 className="font-medium text-ink">
                        {airline?.name ?? booking.flight.airline} {booking.flight.flightNumber}
                    </h3>
                    <p className="text-sm text-ink/50">
                        {fareLabel} &bull; {flight?.aircraft ?? "Aircraft"}
                    </p>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-[9px] top-8 bottom-8 w-0.5 bg-sand-dark" />
                <div className="space-y-8">
                    {stops.map((s, i) => (
                        <div key={i} className="flex gap-4">
                            <div className={`h-5 w-5 rounded-full border-4 border-white ${s.dotClass} relative z-10 mt-1`} />
                            <div className="flex-1">
                                <p className="text-lg font-medium text-ink">
                                    {s.time} &bull; {s.code}
                                </p>
                                <p className="text-sm text-ink/50">{s.name}</p>
                                <p className="text-sm text-ink/50">
                                    {format(new Date(s.date), "EEE, d MMM yyyy")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
