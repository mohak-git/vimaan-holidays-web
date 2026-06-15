"use client";

import type { FlightTag } from "@/types/flights/flight";
import { cn } from "@/lib/utils";

interface Props {
    sortBy: FlightTag;
    onSortChange: (sort: FlightTag) => void;
    resultCount: number;
}

const SORT_OPTIONS: { value: FlightTag; label: string }[] = [
    { value: "cheapest", label: "Cheapest" },
    { value: "fastest", label: "Fastest" },
    { value: "earliest", label: "Earliest" },
    { value: "best", label: "Best Value" },
];

export default function FlightSortBar({ sortBy, onSortChange, resultCount }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-xl p-4 shadow-soft border border-sand-dark">
            <span className="text-sm text-ink/60">
                <span className="font-semibold text-ink">{resultCount}</span> flights found
            </span>
            <div className="flex items-center gap-1 bg-sand rounded-lg p-1">
                {SORT_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onSortChange(opt.value)}
                        className={cn(
                            "px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                            sortBy === opt.value
                                ? "bg-coral text-white shadow-sm"
                                : "text-ink/60 hover:text-ink",
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
