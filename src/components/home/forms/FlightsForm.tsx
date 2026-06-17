"use client";

import AirportInput from "@/components/flights/search/AirportInput";
import DatePicker from "@/components/flights/search/DatePicker";
import SpecialFares from "@/components/flights/search/SpecialFares";
import TravellerPicker from "@/components/flights/search/TravellerPicker";
import { getAirportByCode } from "@/lib/services/airports";
import { useFlightSearchStore } from "@/store/useFlightSearchStore";
import type { Airport } from "@/types/flights/airport";
import type { FareType, TravelClass, Travellers } from "@/types/flights/search";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import SwapLocationsButton from "../elements/SwapLocationsButton";

const airportFromCode = (code: string): Airport =>
    getAirportByCode(code) ?? { code, city: code, name: "", country: "" };

export default function FlightsForm() {
    const router = useRouter();
    const {
        from: fromCode,
        to: toCode,
        date,
        travellers,
        travelClass,
        fareType,
        setSearchParams,
        addRecentSearch,
    } = useFlightSearchStore();

    const from = airportFromCode(fromCode);
    const to = airportFromCode(toCode);

    const handleSelectFrom = useCallback(
        (airport: Airport) => setSearchParams({ from: airport.code }),
        [setSearchParams],
    );
    const handleSelectTo = useCallback(
        (airport: Airport) => setSearchParams({ to: airport.code }),
        [setSearchParams],
    );

    const handleSwap = useCallback(() => {
        setSearchParams({ from: toCode, to: fromCode });
    }, [fromCode, setSearchParams, toCode]);

    const handleDateChange = useCallback(
        (d: string) => setSearchParams({ date: d }),
        [setSearchParams],
    );
    const handleTravellersChange = useCallback(
        (t: Travellers) => setSearchParams({ travellers: t }),
        [setSearchParams],
    );
    const handleClassChange = useCallback(
        (c: TravelClass) => setSearchParams({ travelClass: c }),
        [setSearchParams],
    );
    const handleFareTypeChange = useCallback(
        (f: FareType) => setSearchParams({ fareType: f }),
        [setSearchParams],
    );

    const handleSearch = useCallback(() => {
        const params = new URLSearchParams({
            from: fromCode,
            to: toCode,
            date,
            adults: String(travellers.adults),
            children: String(travellers.children),
            infants: String(travellers.infants),
            class: travelClass,
            fareType,
        });

        addRecentSearch({
            from: fromCode,
            to: toCode,
            date,
            travellers,
            travelClass,
            fareType,
        });

        router.push(`/flights/results?${params.toString()}`);
    }, [addRecentSearch, date, fareType, fromCode, router, toCode, travelClass, travellers]);

    return (
        <div className="w-full flex flex-col gap-4">
            <FormContainer>
                <AirportInput
                    label="From"
                    value={from}
                    onSelect={handleSelectFrom}
                    icon={MapPin}
                    excludeCode={toCode}
                />

                <SwapLocationsButton onClick={handleSwap} />

                <AirportInput
                    label="To"
                    value={to}
                    onSelect={handleSelectTo}
                    icon={MapPin}
                    excludeCode={fromCode}
                />

                <FieldSeparator />

                <DatePicker value={date} onChange={handleDateChange} />

                <FieldSeparator />

                <TravellerPicker
                    travellers={travellers}
                    travelClass={travelClass}
                    onTravellersChange={handleTravellersChange}
                    onClassChange={handleClassChange}
                />
            </FormContainer>

            <SpecialFares selected={fareType} onSelect={handleFareTypeChange} />

            <div className="flex justify-center md:justify-end">
                <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-linear-to-bl from-coral/50 to-coral-hover to-75% text-white text-lg font-semibold px-10 py-3 rounded-xl shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-hover hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                    <Search className="w-5 h-5 shrink-0" />
                    Search Flights
                </button>
            </div>
        </div>
    );
}
