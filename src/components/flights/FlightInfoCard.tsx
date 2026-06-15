import { cn } from "@/lib/utils";
import type { Airline } from "@/types/flights/airline";
import type { Airport } from "@/types/flights/airport";
import type { Flight } from "@/types/flights/flight";
import { Clock, Plane } from "lucide-react";

interface Props {
    flight: Flight;
    airline: Airline | undefined;
    fromAirport: Airport | undefined;
    toAirport: Airport | undefined;
    date: string;
    className?: string;
}

export default function FlightInfoCard({
    flight,
    airline,
    fromAirport,
    toAirport,
    date,
    className,
}: Props) {
    return (
        <div
            className={cn("bg-white rounded-xl shadow-soft border border-sand-dark p-6", className)}
        >
            <div className="flex items-center gap-3 mb-6">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: airline?.color || "#666" }}
                >
                    {airline?.logo || flight.airline}
                </div>
                <div>
                    <h1 className="text-xl font-bold font-serif">
                        {airline?.name || flight.airline}
                    </h1>
                    <p className="text-sm text-ink/50">
                        {flight.flightNumber} &middot; {flight.aircraft}
                    </p>
                    <p className="flex items-center gap-1 mt-1 text-xs text-ink/40">
                        <Clock className="w-3 h-3" />
                        {date}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-y border-sand-dark">
                <div className="text-center md:text-left">
                    <p className="text-3xl font-bold font-serif">{flight.departureTime}</p>
                    <p className="text-sm font-medium">{flight.from}</p>
                    <p className="text-xs text-ink/50">{fromAirport?.city || flight.from}</p>
                    <p className="text-xs text-ink/40">Terminal T2</p>
                </div>

                <div className="flex flex-col items-center gap-1 px-4">
                    <span className="text-xs text-ink/50">{flight.duration}</span>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-coral" />
                        <div className="w-20 md:w-32 h-px bg-ink/20 relative">
                            {flight.stops > 0 && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 border-2 border-white" />
                            )}
                        </div>
                        <Plane className="w-4 h-4 text-coral" />
                    </div>
                    <span className="text-xs font-medium">
                        {flight.stops === 0
                            ? "Non-stop"
                            : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`}
                    </span>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-3xl font-bold font-serif">{flight.arrivalTime}</p>
                    <p className="text-sm font-medium">{flight.to}</p>
                    <p className="text-xs text-ink/50">{toAirport?.city || flight.to}</p>
                    <p className="text-xs text-ink/40">Terminal T1</p>
                </div>
            </div>

            {flight.layovers.length > 0 && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2">Layover</h4>
                    {flight.layovers.map((layover, idx) => (
                        <p key={idx} className="text-sm text-amber-700">
                            {layover.airport} &mdash; {layover.duration}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
