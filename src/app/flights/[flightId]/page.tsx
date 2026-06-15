"use client";

import AlternativeFlights from "@/components/flights/AlternativeFlights";
import FareRules from "@/components/flights/FareRules";
import FareTierSelector from "@/components/flights/FareTierSelector";
import FlightInfoCard from "@/components/flights/FlightInfoCard";
import PriceBreakup from "@/components/flights/PriceBreakup";
import SearchSummaryBar from "@/components/flights/SearchSummaryBar";
import { INSURANCE_PER_PERSON } from "@/config/constants";
import { getAirlineByCode } from "@/lib/services/airlines";
import { getAirportByCode } from "@/lib/services/airports";
import { getAllFlights, getFlightById } from "@/lib/services/flights";
import { calculateTotal } from "@/lib/utils/pricing";
import { useBookingStore } from "@/store/useBookingStore";
import { useFlightSearchStore } from "@/store/useFlightSearchStore";
import type { FareTierName } from "@/types/flights/flight";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function FlightDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { setFlight, selectedFare } = useBookingStore();
    const { from, to, date, travellers, travelClass, fareType } = useFlightSearchStore();
    const totalPassengers = travellers.adults + travellers.children + travellers.infants;

    const allFlights = getAllFlights();
    const flight = getFlightById(params.flightId as string);
    const airline = flight ? getAirlineByCode(flight.airline) : undefined;
    const fromAirport = flight ? getAirportByCode(flight.from) : undefined;
    const toAirport = flight ? getAirportByCode(flight.to) : undefined;

    const [selectedFareState, setSelectedFareState] = useState<FareTierName | null>(selectedFare);

    const breakdown = useMemo(() => {
        if (!flight || !selectedFareState) return null;
        const fare = flight.fares[selectedFareState];
        return calculateTotal({
            farePrice: fare.price,
            adults: totalPassengers,
            seatTotal: 0,
            mealTotal: 0,
            baggageTotal: 0,
            insuranceAdded: false,
            insurancePerPerson: INSURANCE_PER_PERSON,
            promoDiscount: 0,
            convenienceFee: 0,
        });
    }, [flight, selectedFareState, totalPassengers]);

    if (!flight) {
        return (
            <div className="min-h-screen bg-sand pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-ink/60 mb-2">
                        Flight not found
                    </h2>
                    <Link
                        href="/"
                        className="text-coral hover:text-coral-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        );
    }

    const handleSelectFare = (fare: FareTierName) => {
        setSelectedFareState(fare);
        setFlight(flight.id, fare, fareType, flight.fares[fare].price, {
            airline: flight.airline,
            flightNumber: flight.flightNumber,
            from: flight.from,
            to: flight.to,
            departureDate: date,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
        });
    };

    const handleContinue = () => {
        if (!selectedFareState) return;
        const searchQuery = new URLSearchParams({
            from,
            to,
            date,
            adults: String(travellers.adults),
            children: String(travellers.children),
            infants: String(travellers.infants),
            class: travelClass,
            fareType,
        }).toString();
        router.push(`/flights/${flight.id}/booking?${searchQuery}`);
    };

    return (
        <div className="min-h-screen bg-sand pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <nav className="flex items-center gap-2 text-sm text-ink/50 mb-4">
                    <Link
                        href="/"
                        className="hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                    >
                        Home
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/flights/results?from=${from}&to=${to}&date=${date}&adults=${travellers.adults}&children=${travellers.children}&infants=${travellers.infants}&class=${travelClass}&fareType=${fareType}`}
                        className="hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                    >
                        Results
                    </Link>
                    <span>/</span>
                    <span className="text-ink">{flight.flightNumber}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 min-w-0 space-y-6">
                        <SearchSummaryBar
                            from={from}
                            to={to}
                            date={date}
                            travellers={travellers}
                            travelClass={travelClass}
                            fareType={fareType}
                        />

                        <FlightInfoCard
                            flight={flight}
                            airline={airline}
                            fromAirport={fromAirport}
                            toAirport={toAirport}
                            date={date}
                        />

                        <div className="bg-white rounded-xl shadow-soft border border-sand-dark p-6">
                            <h3 className="font-semibold font-serif text-lg mb-4">
                                Baggage Allowance
                            </h3>
                            {selectedFareState ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border border-sand-dark rounded-xl p-4">
                                        <p className="text-xs text-ink/50 uppercase tracking-wider mb-1">
                                            Cabin Baggage
                                        </p>
                                        <p className="text-lg font-bold">
                                            {flight.fares[selectedFareState].cabinBaggage}
                                        </p>
                                    </div>
                                    <div className="border border-sand-dark rounded-xl p-4">
                                        <p className="text-xs text-ink/50 uppercase tracking-wider mb-1">
                                            Check-in Baggage
                                        </p>
                                        <p className="text-lg font-bold">
                                            {flight.fares[selectedFareState].checkinBaggage}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-ink/40">
                                    Select a fare tier to see baggage details
                                </p>
                            )}
                        </div>

                        <FareRules />
                    </div>

                    <div className="lg:w-[380px] shrink-0">
                        <div className="sticky top-24 space-y-4">
                            <FareTierSelector
                                fares={flight.fares}
                                selectedFare={selectedFareState}
                                adults={totalPassengers}
                                onSelect={handleSelectFare}
                            />

                            {breakdown && <PriceBreakup breakdown={breakdown} />}

                            {selectedFareState && (
                                <button
                                    onClick={handleContinue}
                                    className="w-full px-6 py-3 bg-coral text-white rounded-xl font-semibold text-lg hover:bg-coral-hover transition-all shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                                >
                                    Continue to Book
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <AlternativeFlights flights={allFlights} currentFlightId={flight.id} />
            </div>
        </div>
    );
}
