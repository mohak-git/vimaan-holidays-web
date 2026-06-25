"use client";

import BookingCard from "@/components/account/bookings/BookingCard";
import BookingsSkeleton from "@/components/account/bookings/BookingsSkeleton";
import { BOOKING_FILTERS } from "@/components/account/constants";
import { authClient } from "@/lib/auth/authClient";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import type { Booking } from "@/types/flights/booking";
import { Plane } from "lucide-react";
import { useMemo, useState } from "react";

type FilterTab = (typeof BOOKING_FILTERS)[number]["value"];

function EmptyState({ filter }: { filter: FilterTab }) {
    const label = BOOKING_FILTERS.find((f) => f.value === filter)!.label.toLowerCase();
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-sand-dark bg-white/50 p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand">
                <Plane className="h-7 w-7 text-ink/40" />
            </div>
            <div className="text-center">
                <h3 className="font-serif text-lg font-medium text-ink">No {label} flights</h3>
                <p className="mt-1 text-sm text-ink/50">
                    You don&apos;t have any {label} flight bookings at the moment.
                </p>
            </div>
        </div>
    );
}

function BookingsList({ bookings }: { bookings: Booking[] }) {
    const [filter, setFilter] = useState<FilterTab>("confirmed");

    const filtered = useMemo(() => {
        const sorted = [...bookings.filter((b) => b.status === filter)];
        const dir = filter === "confirmed" ? 1 : -1;
        return sorted.sort(
            (a, b) =>
                dir *
                (new Date(a.flight.departureDate).getTime() -
                    new Date(b.flight.departureDate).getTime()),
        );
    }, [bookings, filter]);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="font-serif text-3xl font-medium text-ink md:text-4xl">
                    My Flight Bookings
                </h1>
                <p className="mt-1 text-ink/50">View and manage all your flight reservations.</p>
            </header>

            <div className="inline-flex w-full rounded-xl border border-sand-dark bg-sand p-1">
                {BOOKING_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={cn(
                            "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200",
                            filter === f.value
                                ? "border border-coral/30 bg-white text-coral shadow-sm"
                                : "border border-transparent text-ink/40 hover:text-ink",
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <EmptyState filter={filter} />
            ) : (
                <div className="grid gap-6">
                    {filtered.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FlightBookingsPage() {
    const { data: session, isPending } = authClient.useSession();
    const { bookingHistory } = useUserStore();

    if (isPending) return <BookingsSkeleton />;
    if (!session) return null;

    return <BookingsList bookings={bookingHistory} />;
}
