"use client";

import { CancelDialog } from "@/components/account/bookings/CancelDialog";
import { FlightTicketCard } from "@/components/account/bookings/FlightTicketCard";
import { ManageActions } from "@/components/account/bookings/ManageActions";
import { PassengerSection } from "@/components/account/bookings/PassengerSection";
import { PaymentSummary } from "@/components/account/bookings/PaymentSummary";
import { getMockBookings } from "@/lib/services/bookings";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import type { Booking } from "@/types/flights/booking";
import { format } from "date-fns";
import { ArrowLeft, CheckCircle2, Plane } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

function StatusBadge({ status }: { status: Booking["status"] }) {
    const styles: Record<Booking["status"], { bg: string; text: string; label: string }> = {
        confirmed: { bg: "bg-green-50", text: "text-green-700", label: "Confirmed" },
        completed: { bg: "bg-blue-50", text: "text-blue-700", label: "Completed" },
        cancelled: { bg: "bg-red-50", text: "text-red-700", label: "Cancelled" },
    };
    const s = styles[status];
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                s.bg,
                s.text,
            )}
        >
            <CheckCircle2 className="h-4 w-4" />
            {s.label}
        </span>
    );
}

function NotFoundState({ bookingRef }: { bookingRef: string }) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand-dark">
                <Plane className="h-8 w-8 text-ink/30" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-ink">Booking Not Found</h2>
            <p className="text-ink/50">
                No booking found with reference{" "}
                <span className="font-mono font-medium text-ink">{bookingRef}</span>
            </p>
            <button
                onClick={() => router.push("/bookings")}
                className="mt-2 rounded-xl bg-coral px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-hover"
            >
                Back to Bookings
            </button>
        </div>
    );
}

function BookingDetailContent({ booking, bookingRef }: { booking: Booking; bookingRef: string }) {
    const router = useRouter();

    const [cancelOpen, setCancelOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const updateStatus = useUserStore((s) => s.updateBookingStatus);

    const handleAction = useCallback(async (action: string) => {
        if (action === "Download") {
            window.print();
        } else if (action === "Email") {
            toast.success(`E-ticket sent to ${booking.contact.email}`);
        } else if (action === "Calendar") {
            toast.success(`E-ticket added to your calendar`);
        } else if (action === "Share") {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `Flight Booking ${bookingRef}`,
                        text: `I booked a flight from ${booking.flight.from} to ${booking.flight.to} on ${booking.flight.departureDate}!`,
                        url: window.location.href,
                    });
                } catch {}
            } else {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard");
            }
        }
    }, [booking, bookingRef]);

    const confirmCancel = useCallback(async () => {
        setCancelling(true);
        await new Promise((r) => setTimeout(r, 900));
        setCancelling(false);
        setCancelOpen(false);
        
        const store = useUserStore.getState();
        if (!store.bookingHistory.some((b) => b.bookingRef === bookingRef) && booking) {
            store.addToBookingHistory({ ...booking, status: "cancelled" });
        } else {
            updateStatus(bookingRef, "cancelled");
        }
        
        toast.success("Booking cancelled. Refund will be processed in 5-7 days.");
        router.push("/bookings");
    }, [bookingRef, updateStatus, router, booking]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-medium text-ink/50 hover:text-ink transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Bookings
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-medium text-ink">Booking Details</h1>
                    <p className="text-ink/50 mt-1">
                        PNR: <span className="font-medium text-ink">{booking.pnr}</span> &bull;
                        Booked on {format(new Date(booking.bookedAt), "d MMM yyyy")}
                    </p>
                </div>
                <StatusBadge status={booking.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <FlightTicketCard booking={booking} />
                    <PassengerSection booking={booking} />
                </div>

                <div className="space-y-6">
                    {booking.status !== "cancelled" && (
                        <ManageActions onCancel={() => setCancelOpen(true)} onAction={handleAction} />
                    )}
                    <PaymentSummary booking={booking} />
                </div>
            </div>

            <CancelDialog
                open={cancelOpen}
                booking={booking}
                onClose={() => setCancelOpen(false)}
                onConfirm={confirmCancel}
                loading={cancelling}
            />
        </div>
    );
}

export default function BookingDetailPage() {
    const params = useParams<{ bookingRef: string }>();
    const bookingRef = params.bookingRef;
    const { bookingHistory } = useUserStore();

    const booking = useMemo(() => {
        const fromStore = bookingHistory.find((b) => b.bookingRef === bookingRef);
        if (fromStore) return fromStore;
        return getMockBookings().find((b) => b.bookingRef === bookingRef);
    }, [bookingRef, bookingHistory]);

    if (!booking) return <NotFoundState bookingRef={bookingRef} />;

    return <BookingDetailContent booking={booking} bookingRef={bookingRef} />;
}
