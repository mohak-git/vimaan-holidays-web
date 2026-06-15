"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { FareTier, FareTierName } from "@/types/flights/flight";
import { ArmchairIcon, BadgeCheck, Luggage, RotateCcw, UtensilsCrossed } from "lucide-react";

interface Props {
    fares: { saver: FareTier; value: FareTier; flex: FareTier };
    selectedFare: FareTierName | null;
    adults: number;
    onSelect: (fare: FareTierName) => void;
}

const fareMeta: Record<FareTierName, { label: string; description: string }> = {
    saver: { label: "Saver", description: "Best price for budget travellers" },
    value: { label: "Value", description: "Great balance of price & comfort" },
    flex: { label: "Flex", description: "Maximum flexibility & benefits" },
};

export default function FareTierSelector({ fares, selectedFare, adults, onSelect }: Props) {
    return (
        <div className="bg-white rounded-xl border border-sand-dark shadow-soft p-4">
            <h3 className="font-semibold font-serif text-lg mb-4">Select Fare</h3>
            <div className="space-y-3">
                {(Object.entries(fares) as [FareTierName, FareTier][]).map(([key, fare]) => {
                    const isSelected = selectedFare === key;
                    const meta = fareMeta[key];

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onSelect(key)}
                            className={cn(
                                "w-full text-left border-2 rounded-xl p-4 transition-all",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                                isSelected
                                    ? "border-coral bg-coral/5 shadow-md shadow-coral/10"
                                    : "border-sand-dark bg-white hover:border-coral/50 hover:shadow-sm",
                            )}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h4 className="font-semibold">{meta.label}</h4>
                                    <p className="text-xs text-ink/50">{meta.description}</p>
                                </div>
                                {isSelected && <BadgeCheck className="w-5 h-5 text-coral" />}
                            </div>

                            <p className="text-2xl font-bold font-serif text-coral mb-2">
                                {formatPrice(fare.price)}
                                <span className="text-sm font-normal text-ink/40"> / adult</span>
                            </p>
                            <p className="text-xs text-ink/50 mb-2">
                                Total: {formatPrice(fare.price * adults)}
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-xs text-ink/60">
                                <div className="flex items-center gap-1.5">
                                    <Luggage className="w-3 h-3" />
                                    {fare.checkinBaggage}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <UtensilsCrossed className="w-3 h-3" />
                                    {fare.mealIncluded ? "Meal" : "No meal"}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <ArmchairIcon className="w-3 h-3" />
                                    {fare.seatSelection ? "Seat selection" : "No seat"}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RotateCcw className="w-3 h-3" />
                                    {fare.refundable ? "Refundable" : "Non-refundable"}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
