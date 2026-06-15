"use client";

import { useFlightFilters } from "@/hooks/useFlightFilters";
import { cn } from "@/lib/utils";
import type { AirlineCode } from "@/types/flights/airline";
import {
    REFUND_TYPE_LABELS,
    REFUND_TYPES,
    STOP_LABELS,
    STOP_VALUES,
    TIME_SLOT_LABELS,
    TIME_SLOTS,
} from "@/types/flights/constants";
import type { FlightFilters as FilterType } from "@/types/flights/search";
import { SlidersHorizontal } from "lucide-react";
import { ReactNode } from "react";

interface Props {
    onFilterChange: (filters: Partial<FilterType>) => void;
    initialFilters: FilterType;
    airlines: AirlineCode[];
    showHeader?: boolean;
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="border-b border-sand-dark pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <h4 className="text-sm font-semibold text-ink mb-3">{title}</h4>
            {children}
        </div>
    );
}

function ChipButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                active
                    ? "bg-coral text-white border-coral"
                    : "bg-white text-ink/70 border-sand-dark hover:border-coral/50",
            )}
        >
            {children}
        </button>
    );
}

export default function FlightFilters({
    onFilterChange,
    initialFilters,
    airlines,
    showHeader = true,
}: Props) {
    const { filters, updateFilter, toggleArrayFilter, handlePriceChange, resetFilters } =
        useFlightFilters(initialFilters, onFilterChange);

    return (
        <div className="space-y-1">
            <div
                className={cn(
                    "flex items-center mb-4",
                    showHeader ? "justify-between" : "justify-end",
                )}
            >
                {showHeader && (
                    <h3 className="font-semibold font-serif text-lg flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </h3>
                )}
                <button
                    onClick={resetFilters}
                    className="rounded text-xs text-coral hover:text-coral-hover font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                    Reset All
                </button>
            </div>

            <FilterSection title="Price Range">
                <div className="space-y-2">
                    <input
                        type="range"
                        min={0}
                        max={50000}
                        step={500}
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                        className="w-full accent-coral rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                    />
                    <div className="flex justify-between text-xs text-ink/60">
                        <span>₹0</span>
                        <span>₹{filters.priceRange[1].toLocaleString("en-IN")}</span>
                    </div>
                </div>
            </FilterSection>

            <FilterSection title="Stops">
                <div className="flex flex-wrap gap-2">
                    {STOP_VALUES.map((num) => (
                        <ChipButton
                            key={num}
                            active={filters.stops.includes(num)}
                            onClick={() => toggleArrayFilter("stops", num)}
                        >
                            {STOP_LABELS[num]}
                        </ChipButton>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Airlines">
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {airlines.map((code) => (
                        <ChipButton
                            key={code}
                            active={filters.airlines.includes(code)}
                            onClick={() => toggleArrayFilter("airlines", code)}
                        >
                            {code}
                        </ChipButton>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Departure Time">
                <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => (
                        <ChipButton
                            key={slot}
                            active={filters.departureTimeSlots.includes(slot)}
                            onClick={() => toggleArrayFilter("departureTimeSlots", slot)}
                        >
                            {TIME_SLOT_LABELS[slot]}
                        </ChipButton>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Arrival Time">
                <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => (
                        <ChipButton
                            key={slot}
                            active={filters.arrivalTimeSlots.includes(slot)}
                            onClick={() => toggleArrayFilter("arrivalTimeSlots", slot)}
                        >
                            {TIME_SLOT_LABELS[slot]}
                        </ChipButton>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Refund Type">
                <div className="flex flex-wrap gap-2">
                    {REFUND_TYPES.map((type) => (
                        <ChipButton
                            key={type}
                            active={filters.fareType === type}
                            onClick={() => updateFilter("fareType", type)}
                        >
                            {REFUND_TYPE_LABELS[type]}
                        </ChipButton>
                    ))}
                </div>
            </FilterSection>
        </div>
    );
}
