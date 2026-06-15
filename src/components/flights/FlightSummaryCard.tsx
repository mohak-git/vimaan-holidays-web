import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import { formatTravellers } from "@/lib/utils/travellers";
import type { FareTierName, FlightBookingInfo } from "@/types/flights/flight";
import { Calendar, Plane, Users } from "lucide-react";
import { ReactNode } from "react";

interface InfoRowProps {
    icon: typeof Calendar;
    children: ReactNode;
}

function InfoRow({ icon: Icon, children }: InfoRowProps) {
    return (
        <div className="flex items-center gap-2 text-sm text-ink/60">
            <Icon className="w-4 h-4 shrink-0" />
            {children}
        </div>
    );
}

interface TravellerCount {
    adults: number;
    children?: number;
    infants?: number;
}

interface FlightSummaryProps {
    flight: FlightBookingInfo;
    fareTier?: FareTierName;
    travellers?: TravellerCount;
    adults?: number;
    travelClass?: string;
    farePrice?: number;
    className?: string;
}

function RouteVisual({ from, to, departureTime, arrivalTime }: FlightBookingInfo) {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="text-center min-w-0">
                <p className="text-lg font-bold font-serif">{departureTime}</p>
                <p className="text-sm font-semibold mt-0.5">{from}</p>
            </div>
            <div className="flex items-center gap-1.5 px-1">
                <div className="w-8 md:w-12 h-px bg-ink/20" />
                <Plane className="w-4 h-4 text-coral shrink-0" />
                <div className="w-8 md:w-12 h-px bg-ink/20" />
            </div>
            <div className="text-center min-w-0">
                <p className="text-lg font-bold font-serif">{arrivalTime}</p>
                <p className="text-sm font-semibold mt-0.5">{to}</p>
            </div>
        </div>
    );
}

export default function FlightSummaryCard({
    flight,
    fareTier,
    travellers,
    adults = 1,
    travelClass = "Economy",
    farePrice,
    className,
}: FlightSummaryProps) {
    const travellerLabel = travellers ? formatTravellers(travellers) : `${adults} Adult${adults > 1 ? "s" : ""}`;

    return (
        <div
            className={cn("bg-white rounded-xl p-4 border border-sand-dark shadow-soft", className)}
        >
            <h3 className="font-semibold font-serif text-lg mb-4">Flight Summary</h3>

            <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-sand-dark">
                    <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center">
                        <Plane className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{flight.airline}</p>
                        <p className="text-xs text-ink/50">{flight.flightNumber}</p>
                    </div>
                </div>

                <RouteVisual
                    from={flight.from}
                    to={flight.to}
                    departureTime={flight.departureTime}
                    arrivalTime={flight.arrivalTime}
                    airline={flight.airline}
                    flightNumber={flight.flightNumber}
                    departureDate={flight.departureDate}
                />

                <InfoRow icon={Calendar}>{flight.departureDate}</InfoRow>

                <InfoRow icon={Users}>
                    {travellerLabel}, {travelClass}
                </InfoRow>

                {fareTier && (
                    <div className="pt-3 border-t border-sand-dark">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium capitalize">{fareTier} Fare</span>
                            {farePrice != null && (
                                <span className="text-lg font-bold font-serif text-coral">
                                    {formatPrice(farePrice)}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
