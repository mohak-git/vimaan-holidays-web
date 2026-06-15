"use client";

import BookingStepper from "@/components/flights/BookingStepper";
import FlightSummaryCard from "@/components/flights/FlightSummaryCard";
import PriceBreakup from "@/components/flights/PriceBreakup";
import BaggageSection from "@/components/pages/addons/BaggageSection";
import InsuranceSection from "@/components/pages/addons/InsuranceSection";
import MealSection from "@/components/pages/addons/MealSection";
import SeatSection from "@/components/pages/addons/SeatSection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { useBookingAddons } from "@/hooks/useBookingAddons";
import { ArmchairIcon, Luggage, UtensilsCrossed } from "lucide-react";

export default function BookingAddonsPage() {
    const {
        resolvedFlightId,
        selectedFare,
        farePrice,
        flightDetails,
        passengers,
        setActivePassengerIdx,
        safeActiveIdx,
        activePassenger,
        seatMap,
        meals,
        baggageOptions,
        selectedSeats,
        selectedMeals,
        extraBaggage,
        insuranceAdded,
        breakdown,
        passengerLabel,
        handleSeatSelect,
        handleMealSelect,
        handleBaggageSelect,
        handleToggleInsurance,
        handleContinue,
    } = useBookingAddons();

    if (!resolvedFlightId) return null;

    const travellers = {
        adults: passengers.filter((p) => p.type === "adult").length,
        children: passengers.filter((p) => p.type === "child").length,
        infants: passengers.filter((p) => p.type === "infant").length,
    };

    return (
        <div className="min-h-screen bg-sand pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <BookingStepper currentStep={2} />

                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 min-w-0 space-y-6">
                        <CollapsibleSection
                            title="Choose Your Seat"
                            icon={<ArmchairIcon className="w-5 h-5" />}
                            optional
                            defaultOpen
                        >
                            <SeatSection
                                passengers={passengers}
                                activePassengerIdx={safeActiveIdx}
                                onPassengerChange={setActivePassengerIdx}
                                activePassenger={activePassenger}
                                seatMap={seatMap}
                                selectedSeats={selectedSeats}
                                onSeatSelect={handleSeatSelect}
                                getPassengerLabel={passengerLabel}
                            />
                        </CollapsibleSection>

                        <CollapsibleSection
                            title="Add Meals"
                            icon={<UtensilsCrossed className="w-5 h-5" />}
                            optional
                        >
                            <MealSection
                                passengers={passengers}
                                meals={meals}
                                selectedMeals={selectedMeals}
                                onMealSelect={handleMealSelect}
                                getPassengerLabel={passengerLabel}
                            />
                        </CollapsibleSection>

                        <CollapsibleSection
                            title="Extra Baggage"
                            icon={<Luggage className="w-5 h-5" />}
                            optional
                        >
                            <BaggageSection
                                passengers={passengers}
                                baggageOptions={baggageOptions}
                                extraBaggage={extraBaggage}
                                onBaggageSelect={handleBaggageSelect}
                                getPassengerLabel={passengerLabel}
                            />
                        </CollapsibleSection>

                        <InsuranceSection
                            insuranceAdded={insuranceAdded}
                            onToggle={handleToggleInsurance}
                        />
                    </div>

                    <div className="lg:w-[380px] shrink-0 space-y-4">
                        <FlightSummaryCard
                            flight={flightDetails!}
                            fareTier={selectedFare || undefined}
                            travellers={travellers}
                            farePrice={farePrice}
                        />
                        <PriceBreakup breakdown={breakdown} />
                        <button
                            type="button"
                            onClick={handleContinue}
                            className="w-full px-8 py-3 bg-coral text-white rounded-xl font-semibold hover:bg-coral-hover transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                        >
                            Continue to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
