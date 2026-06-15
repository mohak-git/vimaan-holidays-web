"use client";

import FareCalendarStrip from "@/components/flights/FareCalendarStrip";
import FlightCard from "@/components/flights/FlightCard";
import FlightFiltersComponent from "@/components/flights/FlightFilters";
import FlightSortBar from "@/components/flights/FlightSortBar";
import SearchSummaryBar from "@/components/flights/SearchSummaryBar";
import SkeletonFlightCard from "@/components/flights/SkeletonFlightCard";
import { useFlightResults } from "@/hooks/useFlightResults";
import type { AirlineCode } from "@/types/flights/airline";
import type { FareTierName, Flight } from "@/types/flights/flight";
import type { FlightFilters } from "@/types/flights/search";
import { ArrowLeft, Plane, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";

function FlightBreadcrumb({ from, to }: { from: string; to: string }) {
    return (
        <nav className="flex items-center gap-2 text-sm text-ink/50 mb-4">
            <Link
                href="/"
                className="hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
            >
                Home
            </Link>
            <span>/</span>
            <span className="text-ink">Flights</span>
            <span>/</span>
            <span className="text-ink/70">
                {from} &rarr; {to}
            </span>
        </nav>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-16 bg-white rounded-xl shadow-soft">
            <Plane className="w-16 h-16 text-ink/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-ink/60 mb-2">No flights found</h3>
            <p className="text-sm text-ink/40 mb-6">Try changing your search or filters</p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-xl font-medium hover:bg-coral-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
                <ArrowLeft className="w-4 h-4" />
                Change Your Search
            </Link>
        </div>
    );
}

function LoadingState() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonFlightCard key={i} />
            ))}
        </div>
    );
}

function FlightList({
    flights,
    onSelect,
    hasMore,
    onLoadMore,
}: {
    flights: Flight[];
    onSelect: (flight: Flight, fare: FareTierName) => void;
    hasMore: boolean;
    onLoadMore: () => void;
}) {
    if (flights.length === 0) return <EmptyState />;

    return (
        <div className="space-y-3">
            {flights.map((flight) => (
                <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSelected={false}
                    onSelect={onSelect}
                />
            ))}
            {hasMore && (
                <div className="text-center pt-4">
                    <button
                        onClick={onLoadMore}
                        className="px-8 py-3 bg-white border border-sand-dark rounded-xl font-medium text-sm hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                    >
                        Load More Flights
                    </button>
                </div>
            )}
        </div>
    );
}

function MobileFilterDrawer({
    open,
    onClose,
    filters,
    airlines,
    onFilterChange,
}: {
    open: boolean;
    onClose: () => void;
    filters: FlightFilters;
    airlines: AirlineCode[];
    onFilterChange: (filters: Partial<FlightFilters>) => void;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-5 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-sand-dark sticky top-0 bg-white z-1">
                    <h3 className="font-semibold font-serif text-lg">Filters</h3>
                    <button
                        onClick={onClose}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <FlightFiltersComponent
                        onFilterChange={onFilterChange}
                        initialFilters={filters}
                        airlines={airlines}
                        showHeader={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default function FlightResultsPage() {
    const {
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
    } = useFlightResults();

    return (
        <div className="min-h-screen bg-sand pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <FlightBreadcrumb from={from} to={to} />

                <SearchSummaryBar
                    from={from}
                    to={to}
                    date={date}
                    travellers={travellers}
                    travelClass={travelClass}
                    fareType={fareType}
                />

                <div className="mt-4 max-w-full overflow-x-auto">
                    <FareCalendarStrip
                        selectedDate={date}
                        from={from}
                        to={to}
                        travellers={travellers}
                        travelClass={travelClass}
                        fareType={fareType}
                    />
                </div>

                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    <aside className="hidden lg:block w-[280px] shrink-0">
                        <div className="sticky top-24 bg-white rounded-xl p-4 shadow-soft border border-sand-dark">
                            <FlightFiltersComponent
                                onFilterChange={handleFilterChange}
                                initialFilters={filters}
                                airlines={airlines}
                            />
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <div className="flex-1">
                                <FlightSortBar
                                    sortBy={sortBy}
                                    onSortChange={handleSortChange}
                                    resultCount={sortedFlights.length}
                                />
                            </div>
                            <button
                                onClick={() => setMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-sand-dark text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                        </div>

                        {loading ? (
                            <LoadingState />
                        ) : (
                            <FlightList
                                flights={visibleFlights}
                                onSelect={handleSelectFare}
                                hasMore={hasMore}
                                onLoadMore={loadMore}
                            />
                        )}
                    </div>
                </div>
            </div>

            <MobileFilterDrawer
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                filters={filters}
                airlines={airlines}
                onFilterChange={handleFilterChange}
            />
        </div>
    );
}
