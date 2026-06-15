"use client";

import type { FlightFilters } from "@/types/flights/search";
import { useCallback, useState } from "react";

export const DEFAULT_FILTERS: FlightFilters = {
    priceRange: [0, 100000],
    stops: [],
    airlines: [],
    departureTimeSlots: [],
    arrivalTimeSlots: [],
    fareType: "all",
    maxDuration: 0,
};

export function useFlightFilters(
    initialFilters: FlightFilters,
    onFilterChange: (filters: Partial<FlightFilters>) => void,
) {
    const [filters, setFilters] = useState(initialFilters);

    const updateFilter = useCallback(
        (key: keyof FlightFilters, value: unknown) => {
            setFilters((prev) => {
                const updated = { ...prev, [key]: value } as FlightFilters;
                onFilterChange({ [key]: value } as Partial<FlightFilters>);
                return updated;
            });
        },
        [onFilterChange],
    );

    const toggleArrayFilter = useCallback(
        (key: "stops" | "airlines" | "departureTimeSlots" | "arrivalTimeSlots", value: unknown) => {
            setFilters((prev) => {
                const current = prev[key] as unknown[];
                const updated = current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value];
                onFilterChange({ [key]: updated } as Partial<FlightFilters>);
                return { ...prev, [key]: updated } as FlightFilters;
            });
        },
        [onFilterChange],
    );

    const handlePriceChange = useCallback(
        (idx: 0 | 1, value: number) => {
            setFilters((prev) => {
                const newRange: [number, number] = [...prev.priceRange];
                newRange[idx] = value;
                onFilterChange({ priceRange: newRange });
                return { ...prev, priceRange: newRange };
            });
        },
        [onFilterChange],
    );

    const resetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
        onFilterChange(DEFAULT_FILTERS);
    }, [onFilterChange]);

    return { filters, updateFilter, toggleArrayFilter, handlePriceChange, resetFilters };
}
