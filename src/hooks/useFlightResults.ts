"use client";

import { getAllFlights } from "@/lib/services/flights";
import { filterFlights } from "@/lib/utils/filterFlights";
import { sortFlights } from "@/lib/utils/sortFlights";
import { useBookingStore } from "@/store/useBookingStore";
import { useFlightSearchStore } from "@/store/useFlightSearchStore";
import type { AirlineCode } from "@/types/flights/airline";
import type { FareTierName, Flight, FlightTag } from "@/types/flights/flight";
import type { FlightFilters } from "@/types/flights/search";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_FILTERS } from "./useFlightFilters";

const ITEMS_PER_PAGE = 10;

export function useFlightResults() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { syncFromUrl, addRecentSearch, from, to, date, travellers, travelClass, fareType } =
        useFlightSearchStore();
    const { setFlight } = useBookingStore();

    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState<FlightTag>("cheapest");
    const [filters, setFilters] = useState<FlightFilters>(DEFAULT_FILTERS);

    useEffect(() => {
        syncFromUrl(searchParams);
    }, [searchParams, syncFromUrl]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (from && to && date)
            addRecentSearch({ from, to, date, travellers, travelClass, fareType });
    }, [from, to, date, addRecentSearch, travellers, travelClass, fareType]);

    const allFlights = useMemo(() => getAllFlights(), []);

    const matchingFlights = useMemo(() => {
        if (!from || !to) return [];
        return allFlights.filter(
            (f) => f.from === from && f.to === to && f.fareTypes.includes(fareType),
        );
    }, [allFlights, from, to, fareType]);

    const airlines = useMemo<AirlineCode[]>(
        () => [...new Set(matchingFlights.map((f) => f.airline))],
        [matchingFlights],
    );

    const filteredFlights = useMemo(
        () => filterFlights(matchingFlights, filters),
        [matchingFlights, filters],
    );

    const sortedFlights = useMemo(
        () => sortFlights(filteredFlights, sortBy),
        [filteredFlights, sortBy],
    );

    const visibleFlights = useMemo(
        () => sortedFlights.slice(0, visibleCount),
        [sortedFlights, visibleCount],
    );

    const hasMore = visibleCount < sortedFlights.length;

    const handleFilterChange = useCallback((newFilters: Partial<FlightFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setVisibleCount(ITEMS_PER_PAGE);
    }, []);

    const handleSortChange = useCallback((sort: FlightTag) => {
        setSortBy(sort);
        setVisibleCount(ITEMS_PER_PAGE);
    }, []);

    const handleSelectFare = useCallback(
        (flight: Flight, fare: FareTierName) => {
            setFlight(flight.id, fare, fareType, flight.fares[fare].price, {
                airline: flight.airline,
                flightNumber: flight.flightNumber,
                from: flight.from,
                to: flight.to,
                departureDate: date,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
            });
            const params = new URLSearchParams({
                from,
                to,
                date,
                adults: String(travellers.adults),
                children: String(travellers.children),
                infants: String(travellers.infants),
                class: travelClass,
                fareType,
            });
            router.push(`/flights/${flight.id}?${params.toString()}`);
        },
        [setFlight, fareType, date, from, to, travellers, travelClass, router],
    );

    const loadMore = useCallback(() => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    }, []);

    return {
        from,
        to,
        date,
        travellers,
        travelClass,
        fareType,
        loading,
        sortBy,
        filters,
        airlines,
        sortedFlights,
        visibleFlights,
        hasMore,
        mobileFiltersOpen,
        handleFilterChange,
        handleSortChange,
        handleSelectFare,
        loadMore,
        setMobileFiltersOpen,
    };
}
