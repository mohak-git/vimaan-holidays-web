import type { Booking } from "@/types/flights/booking";

export function PassengerSection({ booking }: { booking: Booking }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-dark">
            <h3 className="font-serif text-xl text-ink mb-4">Traveller Details</h3>
            {booking.passengers.map((p, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-sand-dark last:border-0"
                >
                    <div>
                        <p className="font-medium text-ink">{p.name}</p>
                        <p className="text-sm text-ink/50">
                            {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-ink">Seat {p.seat}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
