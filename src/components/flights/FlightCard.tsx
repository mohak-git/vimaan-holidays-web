"use client";

import { getAllAirlines } from "@/lib/services/airlines";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { FareTierName, Flight } from "@/types/flights/flight";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Plane } from "lucide-react";
import { useState } from "react";

interface Props {
    flight: Flight;
    isSelected: boolean;
    onSelect: (flight: Flight, fare: FareTierName) => void;
}

function AirlineBadge({ code }: { code: string }) {
    const airlines = getAllAirlines();
    const airline = airlines.find((a) => a.code === code);
    if (!airline) return <span className="text-xs font-bold">{code}</span>;
    return (
        <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: airline.color }}
        >
            {airline.logo}
        </div>
    );
}

function StopsBadge({ stops }: { stops: number }) {
    if (stops === 0) return <span className="text-xs text-green-600 font-medium">Non-stop</span>;
    if (stops === 1) return <span className="text-xs text-amber-600 font-medium">1 Stop</span>;
    return <span className="text-xs text-red-600 font-medium">{stops} Stops</span>;
}

export default function FlightCard({ flight, isSelected, onSelect }: Props) {
    const [expanded, setExpanded] = useState(false);
    const airlines = getAllAirlines();
    const airline = airlines.find((a) => a.code === flight.airline);

    return (
        <div
            className={cn(
                "bg-white rounded-xl shadow-soft border-2 transition-all",
                isSelected ? "border-coral" : "border-transparent hover:border-sand-dark",
            )}
        >
            <div className="p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-[160px]">
                        <AirlineBadge code={flight.airline} />
                        <div>
                            <p className="font-semibold text-sm">
                                {airline?.name || flight.airline}
                            </p>
                            <p className="text-xs text-ink/50">{flight.flightNumber}</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-between gap-2 md:gap-4">
                        <div className="text-center">
                            <p className="text-xl font-bold font-serif">{flight.departureTime}</p>
                            <p className="text-xs text-ink/50">{flight.from}</p>
                        </div>

                        <div className="flex flex-col items-center gap-1 flex-1 max-w-[120px]">
                            <StopsBadge stops={flight.stops} />
                            <div className="w-full flex items-center gap-1">
                                <div className="h-px flex-1 bg-ink/20" />
                                <Plane className="w-3 h-3 text-ink/40" />
                                <div className="h-px flex-1 bg-ink/20" />
                            </div>
                            <span className="text-xs text-ink/50 flex items-center gap-1">
                                {flight.duration}
                            </span>
                        </div>

                        <div className="text-center">
                            <p className="text-xl font-bold font-serif">{flight.arrivalTime}</p>
                            <p className="text-xs text-ink/50">{flight.to}</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-sand-dark" />

                    <div className="flex flex-col items-end gap-2 min-w-[140px]">
                        <p className="text-lg font-bold font-serif text-coral">
                            {formatPrice(
                                Math.min(
                                    flight.fares.saver.price,
                                    flight.fares.value.price,
                                    flight.fares.flex.price,
                                ),
                            )}
                        </p>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 text-sm font-medium text-coral hover:text-coral-hover transition-colors"
                        >
                            {expanded ? "Hide Fares" : "View Fares"}
                            {expanded ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-sand-dark px-4 md:px-5 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {(
                                    Object.entries(flight.fares) as [
                                        string,
                                        typeof flight.fares.saver,
                                    ][]
                                ).map(([key, fare]) => {
                                    const fareKey = key as "saver" | "value" | "flex";
                                    const isSelectedFare = isSelected;
                                    return (
                                        <div
                                            key={key}
                                            className={cn(
                                                "border rounded-xl p-4 transition-all",
                                                isSelectedFare
                                                    ? "border-coral bg-coral/5"
                                                    : "border-sand-dark hover:border-coral/50",
                                            )}
                                        >
                                            <h4 className="font-semibold capitalize text-sm">
                                                {key}
                                            </h4>
                                            <p className="text-2xl font-bold font-serif text-coral mt-1">
                                                {formatPrice(fare.price)}
                                            </p>
                                            <div className="text-xs text-ink/60 space-y-1 mt-2">
                                                <p>{fare.checkinBaggage} check-in</p>
                                                <p>{fare.cabinBaggage} cabin</p>
                                                <p>
                                                    {fare.refundable
                                                        ? "Refundable"
                                                        : "Non-refundable"}
                                                </p>
                                                <p>
                                                    {fare.mealIncluded
                                                        ? "Meal included"
                                                        : "Meal not included"}
                                                </p>
                                                <p>
                                                    {fare.seatSelection
                                                        ? "Free seat selection"
                                                        : "Paid seat selection"}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => onSelect(flight, fareKey)}
                                                className={cn(
                                                    "w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-all",
                                                    isSelectedFare
                                                        ? "bg-coral text-white"
                                                        : "bg-ink text-white hover:bg-ink-light",
                                                )}
                                            >
                                                {isSelectedFare ? "Selected" : "Select"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
