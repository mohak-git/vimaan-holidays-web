"use client";

import { getAirportByCode } from "@/lib/services/airports";
import type { Booking } from "@/types/flights/booking";
import { CalendarSearch, Plane } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RouteDisplayProps {
    from: string;
    to: string;
    date: string;
    depart: string;
    arrive: string;
    duration: string;
}

function NextTripBadge({ target }: { target: string }) {
    const [delta, setDelta] = useState(() => new Date(target).getTime() - Date.now());

    useEffect(() => {
        setDelta(new Date(target).getTime() - Date.now());
        const id = setInterval(() => setDelta(new Date(target).getTime() - Date.now()), 60_000);
        return () => clearInterval(id);
    }, [target]);

    if (delta <= 0) {
        return <span className="text-xs text-ink/50">Departed</span>;
    }

    const d = Math.floor(delta / 86_400_000);
    const h = Math.floor((delta % 86_400_000) / 3_600_000);
    const m = Math.floor((delta % 3_600_000) / 60_000);

    const units = [
        { value: d, unit: "d" },
        { value: h, unit: "h" },
        { value: m, unit: "m" },
    ];

    return (
        <div className="flex items-center">
            {units.map(({ value, unit }, i) => (
                <div key={unit} className="flex items-center">
                    {i > 0 && <span className="px-1.5 text-sm font-bold text-ink/20">:</span>}
                    <div className="flex flex-col items-center rounded-md border border-sand-dark px-2.5 py-1">
                        <span className="-mb-0.5 text-lg font-bold leading-none text-coral">
                            {String(value).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-medium uppercase text-ink/40">
                            {unit}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function RouteDisplay({ from, to, date, depart, arrive, duration }: RouteDisplayProps) {
    const fromCity = getAirportByCode(from)?.city ?? from;
    const toCity = getAirportByCode(to)?.city ?? to;
    const d = new Date(date);
    const formatted = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        weekday: "short",
    });

    return (
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
                <h3 className="truncate font-serif text-2xl font-medium text-ink">
                    {fromCity} ({from})
                </h3>
                <p className="truncate text-sm text-ink/50">
                    {getAirportByCode(from)?.name ?? from}
                </p>
                <p className="mt-2 text-lg font-medium text-ink">{depart}</p>
                <p className="text-sm text-ink/50">{formatted}</p>
            </div>

            <div className="flex w-full min-w-0 flex-col items-center px-4 md:w-auto md:flex-1">
                <div className="mb-2 flex w-full items-center gap-2 text-ink/30">
                    <div className="h-px flex-1 border-t border-dashed border-ink/20" />
                    <Plane className="h-5 w-5 shrink-0 text-coral" />
                    <div className="h-px flex-1 border-t border-dashed border-ink/20" />
                </div>
                <span className="rounded-md bg-sand-dark px-2 py-1 text-xs font-medium text-ink/50">
                    {duration}
                </span>
            </div>

            <div className="min-w-0 flex-1 text-left md:text-right">
                <h3 className="truncate font-serif text-2xl font-medium text-ink">
                    {toCity} ({to})
                </h3>
                <p className="truncate text-sm text-ink/50">{getAirportByCode(to)?.name ?? to}</p>
                <p className="mt-2 text-lg font-medium text-ink">{arrive}</p>
                <p className="text-sm text-ink/50">{formatted}</p>
            </div>
        </div>
    );
}

export default function NextTripCard({ booking }: { booking?: Booking | null }) {
    if (!booking) {
        return (
            <div className="relative col-span-1 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-dashed border-sand-dark bg-white/50 p-12 shadow-soft md:col-span-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand">
                    <CalendarSearch className="h-7 w-7 text-ink/40" />
                </div>
                <div className="text-center">
                    <h3 className="font-serif text-lg font-medium text-ink">No upcoming trips</h3>
                    <p className="mt-1 text-sm text-ink/50">Start planning your next adventure.</p>
                </div>
                <Link
                    href="/"
                    className="rounded-xl bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-hover"
                >
                    Book a Flight
                </Link>
            </div>
        );
    }

    const { flight } = booking;

    return (
        <div className="relative flex flex-col justify-center p-8 col-span-1 overflow-hidden rounded-2xl border border-sand-dark bg-white shadow-soft md:col-span-2">
            <RouteDisplay
                from={flight.from}
                to={flight.to}
                date={flight.departureDate}
                depart={flight.departureTime}
                arrive={flight.arrivalTime}
                duration="2h 45m"
            />

            <div className="mt-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex justify-center md:justify-start">
                    <NextTripBadge target={flight.departureDate} />
                </div>
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                    <Link
                        href={`/bookings/${booking.id}`}
                        className="rounded-xl bg-coral px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-coral-hover"
                    >
                        View Details
                    </Link>
                    <button className="rounded-xl border border-sand-dark px-5 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:bg-sand">
                        Web Check-in
                    </button>
                </div>
            </div>
        </div>
    );
}
