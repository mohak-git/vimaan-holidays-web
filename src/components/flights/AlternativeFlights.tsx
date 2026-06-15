import { getAllAirlines } from "@/lib/services/airlines";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Flight } from "@/types/flights/flight";
import Link from "next/link";

interface Props {
    flights: Flight[];
    currentFlightId: string;
}

function StopsLabel({ stops }: { stops: number }) {
    if (stops === 0) return <span className="text-xs text-green-600 font-medium">Non-stop</span>;
    return (
        <span className="text-xs text-amber-600 font-medium">
            {stops} stop{stops > 1 ? "s" : ""}
        </span>
    );
}

export default function AlternativeFlights({ flights, currentFlightId }: Props) {
    const airlines = getAllAirlines();
    const alternatives = flights.filter((f) => f.id !== currentFlightId).slice(0, 3);

    if (alternatives.length === 0) return null;

    return (
        <div className="mt-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Alternative Flights</h2>
            <p className="text-sm text-ink/60 mb-4">Other flights on the same route</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {alternatives.map((flight) => {
                    const airline = airlines.find((a) => a.code === flight.airline);
                    const minPrice = Math.min(
                        flight.fares.saver.price,
                        flight.fares.value.price,
                        flight.fares.flex.price,
                    );

                    return (
                        <Link
                            key={flight.id}
                            target="_blank"
                            href={`/flights/${flight.id}`}
                            className={cn(
                                "block bg-white border border-sand-dark rounded-xl p-4",
                                "hover:border-coral/50 transition-all shadow-soft",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                            )}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                                    style={{ backgroundColor: airline?.color || "#666" }}
                                >
                                    {airline?.logo || flight.airline}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate">
                                        {airline?.name || flight.airline}
                                    </p>
                                    <p className="text-xs text-ink/50">{flight.flightNumber}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="font-bold">{flight.departureTime}</span>
                                <span className="text-xs text-ink/40">{flight.duration}</span>
                                <span className="font-bold">{flight.arrivalTime}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <StopsLabel stops={flight.stops} />
                                <span className="text-lg font-bold font-serif text-coral">
                                    {formatPrice(minPrice)}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
