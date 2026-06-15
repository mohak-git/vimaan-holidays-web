"use client";

import { SPECIAL_FARES } from "@/components/home/constants";
import { FARE_LABEL_TO_VALUE } from "@/config/constants";
import type { FareType } from "@/types/flights/search";

interface Props {
    selected: FareType;
    onSelect: (fare: FareType) => void;
}

export default function SpecialFares({ selected, onSelect }: Props) {
    return (
        <div className="flex flex-wrap items-center px-2 gap-2">
            <span className="text-xs font-medium text-ink/60 uppercase tracking-wider">
                Special Fares:
            </span>
            <ul className="flex gap-4 flex-wrap">
                {SPECIAL_FARES.map((fare) => {
                    const fareValue = FARE_LABEL_TO_VALUE[fare];
                    const isActive = selected === fareValue;
                    return (
                        <li key={fare}>
                            <button
                                type="button"
                                onClick={() => onSelect(fareValue)}
                                className={`text-xs px-3 py-1 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coral ${
                                    isActive
                                        ? "border-coral text-coral bg-coral/5"
                                        : "border-black/10 text-ink/70 hover:border-black/20"
                                }`}
                            >
                                {fare}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
