"use client";

import { SortBar, type SortOption } from "@/components/ui/SortBar";
import type { FlightTag } from "@/types/flights/flight";

const SORT_OPTIONS: SortOption<FlightTag>[] = [
    { value: "cheapest", label: "Cheapest" },
    { value: "fastest", label: "Fastest" },
    { value: "earliest", label: "Earliest" },
    { value: "best", label: "Best Value" },
];

interface FlightSortBarProps {
    sortBy: FlightTag;
    onSortChange: (sort: FlightTag) => void;
    resultCount: number;
}

export default function FlightSortBar({ sortBy, onSortChange, resultCount }: FlightSortBarProps) {
    return (
        <SortBar
            options={SORT_OPTIONS}
            sortBy={sortBy}
            onSortChange={onSortChange}
            resultCount={resultCount}
        />
    );
}

