import type { FareType, RecentSearch, SearchParams, TravelClass } from "@/types/flights/search";
import { addDays, format } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FlightSearchState extends SearchParams {
    recentSearches: RecentSearch[];
    setSearchParams: (params: Partial<SearchParams>) => void;
    syncFromUrl: (params: URLSearchParams) => void;
    addRecentSearch: (search: SearchParams) => void;
    clearRecentSearches: () => void;
}

const isDuplicateSearch = (a: SearchParams, b: SearchParams): boolean => {
    return (
        a.from === b.from &&
        a.to === b.to &&
        a.date === b.date &&
        a.travellers.adults === b.travellers.adults &&
        a.travellers.children === b.travellers.children &&
        a.travellers.infants === b.travellers.infants &&
        a.travelClass === b.travelClass &&
        a.fareType === b.fareType
    );
};

const defaultSearchParams: SearchParams = {
    from: "DEL",
    to: "BOM",
    date: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    travellers: { adults: 1, children: 0, infants: 0 },
    travelClass: "economy",
    fareType: "regular",
};

export const useFlightSearchStore = create<FlightSearchState>()(
    persist(
        (set) => ({
            ...defaultSearchParams,

            recentSearches: [],

            setSearchParams: (params) => set(params),

            syncFromUrl: (sp) =>
                set((state) => ({
                    from: sp.get("from") ?? state.from,
                    to: sp.get("to") ?? state.to,
                    date: sp.get("date") ?? state.date,
                    travellers: {
                        adults: parseInt(sp.get("adults") ?? String(state.travellers.adults), 10),
                        children: parseInt(
                            sp.get("children") ?? String(state.travellers.children),
                            10,
                        ),
                        infants: parseInt(
                            sp.get("infants") ?? String(state.travellers.infants),
                            10,
                        ),
                    },
                    travelClass: (sp.get("class") as TravelClass) ?? state.travelClass,
                    fareType: (sp.get("fareType") as FareType) ?? state.fareType,
                })),

            addRecentSearch: (search) =>
                set((state) => {
                    const newSearch: RecentSearch = { ...search, timestamp: Date.now() };
                    const filtered = state.recentSearches.filter(
                        (item) => !isDuplicateSearch(item, search),
                    );

                    return { recentSearches: [newSearch, ...filtered].slice(0, 10) };
                }),

            clearRecentSearches: () => set({ recentSearches: [] }),
        }),
        {
            name: "flight-search-storage",
            partialize: (state) => ({ recentSearches: state.recentSearches }),
        },
    ),
);
