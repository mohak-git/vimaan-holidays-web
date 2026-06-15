"use client";

import type { Booking } from "@/types/flights/booking";
import { motion } from "framer-motion";
import { Plane, QrCode } from "lucide-react";

interface BoardingPassProps {
    booking: Booking;
}

export default function BoardingPass({ booking }: BoardingPassProps) {
    const { flight, pnr, bookingRef, status, passengers, fareType } = booking;
    const isConfirmed = status === "confirmed";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mb-8"
        >
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <div className="bg-coral px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-lg p-1.5">
                            <Plane className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm font-semibold tracking-wide uppercase">
                            {flight.airline} {flight.flightNumber}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                                isConfirmed
                                    ? "bg-white/20 text-white"
                                    : "bg-amber-400/20 text-amber-200"
                            }`}
                        >
                            <span
                                className={`w-1 h-1 rounded-full ${
                                    isConfirmed ? "bg-green-300" : "bg-amber-300"
                                }`}
                            />
                            {status}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6 pb-4 md:pb-6">
                        <div className="flex items-start justify-between mb-5">
                            <div className="text-center">
                                <p className="text-xs text-ink/40 font-medium uppercase tracking-wider mb-1">
                                    Depart
                                </p>
                                <p className="text-3xl md:text-4xl font-bold font-serif text-ink">
                                    {flight.from}
                                </p>
                                <p className="text-lg font-semibold text-ink mt-1">
                                    {flight.departureTime}
                                </p>
                            </div>
                            <div className="flex flex-col items-center px-3 pt-5">
                                <div className="w-20 h-px bg-sand-dark relative">
                                    <Plane className="w-3 h-3 text-coral absolute -top-1.5 left-1/2 -translate-x-1/2" />
                                </div>
                                <p className="text-[10px] text-ink/30 uppercase tracking-widest mt-2">
                                    {flight.departureDate}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-ink/40 font-medium uppercase tracking-wider mb-1">
                                    Arrive
                                </p>
                                <p className="text-3xl md:text-4xl font-bold font-serif text-ink">
                                    {flight.to}
                                </p>
                                <p className="text-lg font-semibold text-ink mt-1">
                                    {flight.arrivalTime}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm border-t border-sand-dark pt-4">
                            <div>
                                <p className="text-xs text-ink/40">Class</p>
                                <p className="font-semibold capitalize text-ink">{fareType}</p>
                            </div>
                            <div>
                                <p className="text-xs text-ink/40">Aircraft</p>
                                <p className="font-semibold text-ink">Airbus A320</p>
                            </div>
                            <div>
                                <p className="text-xs text-ink/40">Gate</p>
                                <p className="font-semibold text-ink">B12</p>
                            </div>
                            <div>
                                <p className="text-xs text-ink/40">Terminal</p>
                                <p className="font-semibold text-ink">T2</p>
                            </div>
                        </div>

                        <div className="border-t border-sand-dark pt-4 mt-4">
                            <p className="text-[10px] text-ink/30 uppercase tracking-wider font-medium mb-2">
                                Passengers
                            </p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {passengers.map((p, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-ink font-medium truncate mr-2">
                                            {p.name}
                                        </span>
                                        {p.seat && (
                                            <span className="text-[11px] font-bold font-serif text-coral bg-coral/5 px-1.5 py-0.5 rounded shrink-0">
                                                {p.seat}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative md:w-[220px] bg-sand/60 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-dashed border-sand-dark">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] text-ink/30 uppercase tracking-wider font-medium mb-0.5">
                                    PNR
                                </p>
                                <p className="text-xl font-bold font-serif text-ink tracking-wider">
                                    {pnr}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-ink/30 uppercase tracking-wider font-medium mb-0.5">
                                    Booking Ref
                                </p>
                                <p className="text-sm font-semibold text-ink">{bookingRef}</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-dashed border-sand-dark">
                            <QrCode className="w-8 h-8 text-ink shrink-0 ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
