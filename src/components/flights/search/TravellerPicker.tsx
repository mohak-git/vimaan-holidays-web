"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { TRAVEL_CLASSES, TRAVEL_CLASS_LABELS } from "@/types/flights/constants";
import type { TravelClass, Travellers } from "@/types/flights/search";
import { Minus, Plus, Users } from "lucide-react";
import { useState } from "react";

export interface TravellerPickerProps {
    travellers: Travellers;
    travelClass: TravelClass;
    onTravellersChange: (t: Travellers) => void;
    onClassChange: (c: TravelClass) => void;
}

const totalTravellers = (t: Travellers): number => t.adults + t.children + t.infants;

const travellerSummary = (t: Travellers): string => {
    const parts: string[] = [];
    if (t.adults) parts.push(`${t.adults} ${t.adults === 1 ? "Adult" : "Adults"}`);
    if (t.children) parts.push(`${t.children} ${t.children === 1 ? "Child" : "Children"}`);
    if (t.infants) parts.push(`${t.infants} ${t.infants === 1 ? "Infant" : "Infants"}`);
    return parts.join(", ") || "1 Adult";
};

function Counter({
    label,
    value,
    min,
    max,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (v: number) => void;
}) {
    return (
        <div>
            <p className="text-xs font-medium text-ink/60 mb-2">{label}</p>
            <div className="flex items-center justify-between bg-sand rounded-xl px-4 py-2">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center disabled:opacity-30 hover:shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-lg">{value}</span>
                <button
                    type="button"
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={value >= max}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center disabled:opacity-30 hover:shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default function TravellerPicker({
    travellers,
    travelClass,
    onTravellersChange,
    onClassChange,
}: TravellerPickerProps) {
    const [open, setOpen] = useState(false);
    const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

    return (
        <div ref={ref} className="flex-1 min-w-0 relative w-full">
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full p-3 hover:bg-black/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-black/5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
                <p className="text-xs font-medium text-ink/60 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    Travellers & Class
                </p>
                <p className="font-serif text-lg font-semibold text-ink truncate">
                    {totalTravellers(travellers)}{" "}
                    {totalTravellers(travellers) === 1 ? "Traveller" : "Travellers"}
                </p>
                <p className="text-xs text-ink/50 truncate mt-0.5">
                    {travellerSummary(travellers)} &middot; {TRAVEL_CLASS_LABELS[travelClass]}
                </p>
            </button>

            {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-xl border border-black/10 z-5 p-4 w-[260px] max-w-[calc(100vw-2rem)]">
                    <div className="space-y-4 mb-4">
                        <Counter
                            label="Adults"
                            value={travellers.adults}
                            min={1}
                            max={9}
                            onChange={(v) => onTravellersChange({ ...travellers, adults: v })}
                        />
                        <Counter
                            label="Children"
                            value={travellers.children}
                            min={0}
                            max={9}
                            onChange={(v) => onTravellersChange({ ...travellers, children: v })}
                        />
                        <Counter
                            label="Infants"
                            value={travellers.infants}
                            min={0}
                            max={9}
                            onChange={(v) => onTravellersChange({ ...travellers, infants: v })}
                        />
                    </div>

                    <div className="border-t border-sand-dark pt-4">
                        <p className="text-xs font-medium text-ink/60 mb-2">Class</p>
                        <div className="space-y-1">
                            {TRAVEL_CLASSES.map((cls) => (
                                <button
                                    key={cls}
                                    type="button"
                                    onClick={() => {
                                        onClassChange(cls);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                                        travelClass === cls
                                            ? "bg-coral/10 text-coral font-semibold"
                                            : "hover:bg-sand text-ink",
                                    )}
                                >
                                    {TRAVEL_CLASS_LABELS[cls]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
