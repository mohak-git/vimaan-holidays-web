import { cn } from "@/lib/utils";
import type { ContactDetails, PassengerDetails } from "@/types/flights/booking";
import type { FareTierName, FlightBookingInfo } from "@/types/flights/flight";
import type { Meal } from "@/types/flights/meal";
import { useMemo } from "react";

interface OrderSummaryProps {
    flight: FlightBookingInfo;
    fareTier: FareTierName | null;
    fareType: string | null;
    passengers: PassengerDetails[];
    selectedSeats: { passengerId: string; seatId: string; price: number }[];
    selectedMeals: { passengerId: string; mealId: string; price: number }[];
    meals: Meal[];
    contactDetails: ContactDetails | null;
    className?: string;
}

export default function OrderSummary({
    flight,
    fareTier,
    fareType,
    passengers,
    selectedSeats,
    selectedMeals,
    meals,
    contactDetails,
    className,
}: OrderSummaryProps) {
    const mealsById = useMemo(() => new Map(meals.map((m) => [m.id, m.name])), [meals]);

    return (
        <div
            className={cn(
                "bg-white rounded-xl shadow-soft border border-sand-dark p-5 md:p-6",
                className,
            )}
        >
            <h3 className="text-base font-semibold mb-5">Order Summary</h3>

            {/* Passengers */}
            {passengers.length > 0 && (
                <div className="mb-5">
                    <p className="text-xs text-ink/40 mb-3">Passengers</p>
                    <div className="grid gap-3">
                        {passengers.map((p, i) => {
                            const seat = selectedSeats.find((s) => s.passengerId === p.id);
                            const meal = selectedMeals.find((m) => m.passengerId === p.id);
                            const mealName = meal ? mealsById.get(meal.mealId) : undefined;

                            return (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-between gap-2 py-2.5 border-b border-sand-dark last:border-b-0"
                                >
                                    <div className="w-full flex justify-between">
                                        <p className="text-sm font-medium truncate">
                                            {p.title} {p.firstName} {p.lastName}
                                        </p>
                                        <div className="flex flex-wrap gap-x-3 text-xs text-ink/50 mt-0.5">
                                            {seat && <span>Seat {seat.seatId}</span>}
                                            {mealName && <span>{mealName}</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {contactDetails && (
                <div>
                    <p className="text-xs text-ink/40 mb-3">Contact</p>
                    <div className="flex justify-between text-sm text-ink/70 ">
                        <span className="leading-relaxed">{contactDetails.email}</span>
                        <span>
                            {contactDetails.countryCode} {contactDetails.phone}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
