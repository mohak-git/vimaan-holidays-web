import type { FareTierName, Flight, FlightTag } from "@/types/flights/flight";
import type { FlightFilters } from "@/types/flights/search";
import { create } from "zustand";

interface FlightResultsState {
    allFlights: Flight[];
    selectedFlight: Flight | null;
    selectedFare: FareTierName | null;
    appliedFilters: FlightFilters;
    sortBy: FlightTag;
    loading: boolean;
    error: string | null;

    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    loadFlights: (flights: Flight[]) => void;
    applyFilters: (filters: Partial<FlightFilters>) => void;
    clearFilters: () => void;
    setSortBy: (sort: FlightTag) => void;
    selectFlight: (flight: Flight | null, fare: FareTierName | null) => void;
}

const createDefaultFilters = (): FlightFilters => ({
    priceRange: [0, 50000],
    stops: [],
    airlines: [],
    departureTimeSlots: [],
    arrivalTimeSlots: [],
    fareType: "all",
    maxDuration: 0,
});

export const useFlightResultsStore = create<FlightResultsState>()((set) => ({
    allFlights: [],
    selectedFlight: null,
    selectedFare: null,
    appliedFilters: createDefaultFilters(),
    sortBy: "fastest",
    loading: false,
    error: null,

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    loadFlights: (flights) =>
        set({
            allFlights: flights,
            selectedFlight: null,
            selectedFare: null,
            appliedFilters: createDefaultFilters(),
            sortBy: "fastest",
            loading: false,
            error: null,
        }),

    applyFilters: (filters) =>
        set((state) => ({ appliedFilters: { ...state.appliedFilters, ...filters } })),
    clearFilters: () => set({ appliedFilters: createDefaultFilters() }),

    setSortBy: (sortBy) => set({ sortBy }),

    selectFlight: (flight, fare) => set({ selectedFlight: flight, selectedFare: fare }),
}));
