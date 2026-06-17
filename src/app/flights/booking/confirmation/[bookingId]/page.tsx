"use client";

import AddonsSummary from "@/components/flights/confirmation/AddonsSummary";
import BoardingPass from "@/components/flights/confirmation/BoardingPass";
import BookingHero from "@/components/flights/confirmation/BookingHero";
import FlightActions from "@/components/flights/confirmation/FlightActions";
import TravelTips from "@/components/flights/confirmation/TravelTips";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function SkeletonBlock({ className }: { className?: string }) {
    return <div className={cn("animate-pulse rounded-xl bg-ink/5", className)} />;
}

function ConfirmationSkeleton() {
    return (
        <div className="min-h-screen bg-sand pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6">
                <SkeletonBlock className="h-48 rounded-2xl" />
                <SkeletonBlock className="h-80 rounded-2xl" />
                <div className="flex gap-3 justify-center">
                    <SkeletonBlock className="h-10 w-40 rounded-xl" />
                    <SkeletonBlock className="h-10 w-40 rounded-xl" />
                    <SkeletonBlock className="h-10 w-40 rounded-xl" />
                    <SkeletonBlock className="h-10 w-24 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SkeletonBlock className="h-20 rounded-xl" />
                    <SkeletonBlock className="h-20 rounded-xl" />
                    <SkeletonBlock className="h-20 rounded-xl" />
                </div>
                <SkeletonBlock className="h-24 rounded-xl" />
                <div className="flex justify-center">
                    <SkeletonBlock className="h-12 w-56 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    const params = useParams();
    const [hydrated, setHydrated] = useState(() => useUserStore.persist.hasHydrated());
    const { bookingHistory } = useUserStore();

    useEffect(() => {
        const unsub = useUserStore.persist.onFinishHydration(() => setHydrated(true));
        return unsub;
    }, []);

    const booking = bookingHistory.find((b) => b.bookingRef === params.bookingId);

    if (!hydrated) return <ConfirmationSkeleton />;

    if (!booking) {
        return (
            <div className="min-h-screen bg-sand pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-ink/60 mb-2">
                        Booking not found
                    </h2>
                    <Link href="/" className="text-coral hover:text-coral-hover">
                        Go back home
                    </Link>
                </div>
            </div>
        );
    }

    const { bookingRef, flight, addons, contact } = booking;

    return (
        <div className="min-h-screen bg-sand pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div className="print:hidden">
                    <BookingHero bookingRef={bookingRef} email={contact.email} />
                </div>

                <BoardingPass booking={booking} />

                <div className="print:hidden">
                    <FlightActions bookingRef={bookingRef} flight={flight} email={contact.email} />
                    <TravelTips />
                    <AddonsSummary addons={addons} />

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="px-6 py-3 bg-ink text-white rounded-xl font-medium hover:bg-ink-light transition-colors"
                        >
                            Search More Flights
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
