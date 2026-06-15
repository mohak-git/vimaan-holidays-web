"use client";

import AddonsSummary from "@/components/flights/confirmation/AddonsSummary";
import BoardingPass from "@/components/flights/confirmation/BoardingPass";
import BookingHero from "@/components/flights/confirmation/BookingHero";
import FlightActions from "@/components/flights/confirmation/FlightActions";
import TravelTips from "@/components/flights/confirmation/TravelTips";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ConfirmationPage() {
    const params = useParams();
    const { bookingHistory } = useUserStore();
    const booking = bookingHistory.find((b) => b.bookingRef === params.bookingId);

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
                <BookingHero bookingRef={bookingRef} email={contact.email} />
                <BoardingPass booking={booking} />
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
    );
}
