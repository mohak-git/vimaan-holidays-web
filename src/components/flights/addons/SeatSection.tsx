import SeatMap from "@/components/flights/SeatMap";
import type { SeatSectionProps } from "./types";

export default function SeatSection({
    passengers,
    activePassengerIdx,
    onPassengerChange,
    activePassenger,
    seatMap,
    selectedSeats,
    onSeatSelect,
    getPassengerLabel,
}: SeatSectionProps) {
    const currentSeat =
        activePassenger && selectedSeats.find((s) => s.passengerId === activePassenger.id);

    const takenSeatIds = selectedSeats
        .filter((s) => s.passengerId !== activePassenger?.id)
        .map((s) => s.seatId);

    return (
        <>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                {passengers.map((p, idx) => (
                    <button
                        key={p.id}
                        type="button"
                        onClick={() => onPassengerChange(idx)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                            activePassengerIdx === idx
                                ? "bg-coral text-white"
                                : "bg-sand text-ink/60 hover:text-ink"
                        }`}
                    >
                        {getPassengerLabel(idx)}
                    </button>
                ))}
            </div>

            <SeatMap
                seatMap={seatMap}
                selectedSeatId={currentSeat?.seatId ?? null}
                takenSeatIds={takenSeatIds}
                onSeatSelect={onSeatSelect}
            />

            {activePassenger && (
                <div className="mt-3 text-sm">
                    {currentSeat ? (
                        <span className="text-green-600 font-medium">
                            Seat {currentSeat.seatId} selected
                            {currentSeat.price > 0 ? ` (+₹${currentSeat.price})` : " (Free)"}
                        </span>
                    ) : (
                        <span className="text-ink/40">No seat selected</span>
                    )}
                </div>
            )}
        </>
    );
}
