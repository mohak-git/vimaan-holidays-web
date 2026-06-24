"use client";

import DashboardSkeleton from "@/components/account/dashboard/DashboardSkeleton";
import NextTripCard from "@/components/account/dashboard/NextTripCard";
import QuickActions from "@/components/account/dashboard/QuickActions";
import RecentActivity from "@/components/account/dashboard/RecentActivity";
import { authClient } from "@/lib/auth/authClient";
import { useUserStore } from "@/store/useUserStore";
import type { Booking } from "@/types/flights/booking";
import { useMemo } from "react";

function DashboardContent({ name, bookings }: { name: string; bookings: Booking[] }) {
    const nextBooking = useMemo(
        () =>
            bookings.find(
                (b) => b.status === "confirmed" && new Date(b.flight.departureDate) > new Date(),
            ),
        [bookings],
    );

    const recentBookings = useMemo(
        () =>
            [...bookings].sort(
                (a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime(),
            ),
        [bookings],
    );

    return (
        <div className="space-y-8">
            <header>
                <h1 className="font-serif text-3xl font-medium text-ink md:text-4xl">
                    Welcome back, {name}.
                </h1>
                <p className="mt-1 text-ink/60">
                    Here&apos;s what&apos;s happening with your upcoming journeys.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <NextTripCard booking={nextBooking} />
                <QuickActions />
                <RecentActivity bookings={recentBookings} />
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { data: session, isPending } = authClient.useSession();
    const bookings = useUserStore((s) => s.bookingHistory);

    const name = session?.user?.name ?? "Guest";

    if (isPending) return <DashboardSkeleton />;

    return <DashboardContent name={name} bookings={bookings} />;
}
