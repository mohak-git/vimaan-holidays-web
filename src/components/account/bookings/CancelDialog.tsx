import { getAirlineByCode } from "@/lib/services/airlines";
import { cn } from "@/lib/utils";
import type { Booking } from "@/types/flights/booking";
import { AlertTriangle } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";

interface Props {
    open: boolean;
    booking: Booking;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export function CancelDialog({ open, booking, onClose, onConfirm, loading }: Props) {
    useScrollLock(open);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-5 flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-serif text-lg font-semibold text-ink">
                            Cancel this booking?
                        </h3>
                        <p className="mt-2 text-sm text-ink/50">
                            Cancelling flight{" "}
                            <span className="font-medium text-ink">
                                {getAirlineByCode(booking.flight.airline)?.name ??
                                    booking.flight.airline}{" "}
                                {booking.flight.flightNumber}
                            </span>{" "}
                            (PNR {booking.pnr}) is irreversible. A cancellation fee may apply and
                            your refund will be processed within 5–7 business days.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-6">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl px-5 py-2.5 text-sm font-medium text-ink/50 transition-colors hover:bg-sand"
                    >
                        Keep Booking
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={cn(
                            "rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors",
                            "bg-red-500 hover:bg-red-600",
                            loading && "opacity-60 cursor-not-allowed",
                        )}
                    >
                        {loading ? "Cancelling..." : "Cancel Booking"}
                    </button>
                </div>
            </div>
        </div>
    );
}
