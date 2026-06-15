"use client";

import { Loader2, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import BookingStepper from "@/components/flights/BookingStepper";
import ContactForm from "@/components/flights/ContactForm";
import FlightSummaryCard from "@/components/flights/FlightSummaryCard";
import PassengerForm from "@/components/flights/PassengerForm";
import PriceBreakup from "@/components/flights/PriceBreakup";
import SavedTravellerModal from "@/components/flights/SavedTravellerModal";
import { useBookingForm } from "@/hooks/useBookingForm";
import { countOfTypeUpTo, TYPE_LABEL } from "@/lib/utils/booking";
import { PASSENGER_TYPES } from "@/types/flights/constants";

function BookingPageContent() {
    const {
        passengerForms,
        formVersions,
        breakdown,
        saving,
        savedTravellerOpen,
        flightDetails,
        selectedFare,
        farePrice,
        fareType,
        storedContact,
        adults,
        children,
        infants,
        savedTravellers,
        setSavedTravellerOpen,
        setActivePassengerIdx,
        handlePassengerSave,
        handleContactSave,
        handleFillFromSaved,
        handleDeleteTraveller,
        handleAddTraveller,
        handleSaveAndContinue,
    } = useBookingForm();

    return (
        <div className="min-h-screen bg-sand pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <nav className="flex items-center gap-2 text-sm text-ink/50 mb-4">
                    <Link href="/" className="hover:text-coral transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/flights/results?from=${flightDetails?.from}&to=${flightDetails?.to}`}
                        className="hover:text-coral transition-colors"
                    >
                        Results
                    </Link>
                    <span>/</span>
                    <span className="text-ink">Booking</span>
                </nav>

                <BookingStepper currentStep={1} />

                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 min-w-0 space-y-6">
                        <div className="bg-white rounded-xl shadow-soft border border-sand-dark p-6">
                            <div className="space-y-6">
                                {passengerForms.map((passenger, idx) => (
                                    <div key={`${passenger.id}-${formVersions[idx] ?? 0}`}>
                                        <PassengerForm
                                            type={passenger.type}
                                            index={
                                                countOfTypeUpTo(
                                                    passengerForms,
                                                    passenger.type,
                                                    idx,
                                                ) - 1
                                            }
                                            formId={`passenger-form-${idx}`}
                                            fareType={fareType || "regular"}
                                            onSave={handlePassengerSave(idx)}
                                            onDelete={() => handleDeleteTraveller(idx)}
                                            canDelete={passengerForms.length > 1}
                                            onFillFromSaved={() => {
                                                setActivePassengerIdx(idx);
                                                setSavedTravellerOpen(true);
                                            }}
                                            defaultValues={passenger}
                                        />
                                        {idx < passengerForms.length - 1 && (
                                            <div className="border-t-4 border-sand-dark my-6" />
                                        )}
                                    </div>
                                ))}

                                <div className="border-t-4 border-sand-dark pt-4">
                                    <p className="text-xs font-medium text-ink/50 mb-3">
                                        Add another traveller
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {PASSENGER_TYPES.map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => handleAddTraveller(t)}
                                                className="flex items-center gap-1.5 text-xs font-medium border border-sand-dark rounded-lg px-3 py-2 text-ink/70 hover:border-coral/50 hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                                            >
                                                <UserRoundPlus className="w-3.5 h-3.5" />+{" "}
                                                {TYPE_LABEL[t]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-soft border border-sand-dark p-6">
                            <ContactForm
                                onSave={handleContactSave}
                                defaultValues={storedContact || undefined}
                            />
                        </div>
                    </div>

                    <div className="lg:w-[380px] shrink-0 space-y-4">
                        <FlightSummaryCard
                            flight={flightDetails!}
                            fareTier={selectedFare || undefined}
                            travellers={{ adults, children, infants }}
                            farePrice={farePrice}
                        />
                        {breakdown && <PriceBreakup breakdown={breakdown} />}
                        <button
                            type="button"
                            onClick={handleSaveAndContinue}
                            disabled={saving}
                            className="w-full px-8 py-3 bg-coral text-white rounded-xl font-semibold hover:bg-coral-hover transition-all disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                        >
                            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                            Save & Continue
                        </button>
                    </div>
                </div>
            </div>

            <SavedTravellerModal
                travellers={savedTravellers}
                open={savedTravellerOpen}
                onClose={() => setSavedTravellerOpen(false)}
                onSelect={handleFillFromSaved}
            />
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={null}>
            <BookingPageContent />
        </Suspense>
    );
}
