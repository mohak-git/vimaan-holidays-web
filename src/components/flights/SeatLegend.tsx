"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";

const LEGEND_ITEMS = [
    { className: "bg-white border border-sand-dark", label: "Available" },
    { className: "bg-coral", label: "Selected" },
    { className: "bg-gray-200", label: "Occupied" },
    { className: "bg-gray-100 border border-gray-300 border-dashed", label: "Taken" },
    { className: "bg-amber-100 border border-amber-300", label: "Premium" },
] as const;

function SeatLegend() {
    return (
        <div className="flex flex-wrap items-center justify-center mt-4 text-xs text-ink/60">
            {LEGEND_ITEMS.map((item) => (
                <div
                    key={item.label}
                    className="flex items-center gap-1.5 shrink-0 mx-2 last:mr-0 mb-1"
                >
                    <div className={cn("size-3 rounded-sm", item.className)} />
                    <span className="whitespace-nowrap">{item.label}</span>
                </div>
            ))}
        </div>
    );
}

export default memo(SeatLegend);
