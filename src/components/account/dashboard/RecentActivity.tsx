"use client";

import { getAirportByCode } from "@/lib/services/airports";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Activity } from "@/types/account";
import type { Booking } from "@/types/flights/booking";
import { formatDistanceToNow } from "date-fns";
import { Clock, Plane, ScrollText } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface Props {
    bookings: Booking[];
}

function toActivity(booking: Booking): Activity {
    const title = `Flight to ${getAirportByCode(booking.flight.to)?.city ?? booking.flight.to} booked`;
    const date = formatDistanceToNow(new Date(booking.bookedAt), { addSuffix: true });
    const amount = formatPrice(booking.payment.total);

    return { title, date, icon: Plane, amount };
}

const ActivityItem = memo(function ActivityItem({ title, date, icon: Icon, amount }: Activity) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-transparent p-2 transition-colors hover:border-sand-dark hover:bg-sand">
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-sand text-ink/50">
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <p className="text-sm font-medium text-ink">{title}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-ink/50">
                        <Clock className="h-3 w-3" />
                        {date}
                    </div>
                </div>
            </div>
            {amount ? <span className="text-sm font-medium text-ink">{amount}</span> : null}
        </div>
    );
});

function EmptyActivity() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand">
                <ScrollText className="h-7 w-7 text-ink/40" />
            </div>
            <div className="text-center">
                <h3 className="font-serif text-lg font-medium text-ink">No bookings yet</h3>
                <p className="mt-1 text-sm text-ink/50">Your recent activity will appear here.</p>
            </div>
        </div>
    );
}

export default function RecentActivity({ bookings }: Props) {
    return (
        <div className="flex flex-col gap-6 col-span-1 rounded-2xl border border-sand-dark bg-white p-6 shadow-soft md:col-span-3">
            <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-ink">Recent Activity</h3>
                {bookings.length > 0 && (
                    <Link
                        href="/bookings"
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink/60 transition-colors hover:bg-sand hover:text-ink"
                    >
                        View All
                    </Link>
                )}
            </div>

            <div className="flex flex-col gap-2">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <ActivityItem key={booking.id} {...toActivity(booking)} />
                    ))
                ) : (
                    <EmptyActivity />
                )}
            </div>
        </div>
    );
}
