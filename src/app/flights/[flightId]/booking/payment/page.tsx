"use client";

import BookingStepper from "@/components/flights/BookingStepper";
import FlightSummaryCard from "@/components/flights/FlightSummaryCard";
import PriceBreakup from "@/components/flights/PriceBreakup";
import PromoCodeInput from "@/components/flights/PromoCodeInput";
import OrderSummary from "@/components/flights/OrderSummary";
import { usePayment } from "@/hooks/usePayment";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
    const {
        resolvedFlightId,
        selectedFare,
        farePrice,
        fareType,
        flightDetails,
        passengers,
        contactDetails,
        selectedSeats,
        selectedMeals,
        meals,
        promoCode,
        promoDiscount,
        breakdown,
        termsAccepted,
        setTermsAccepted,
        processing,
        handleApplyPromo,
        handleRemovePromo,
        handlePay,
    } = usePayment();

    if (!resolvedFlightId || !flightDetails) return null;

    const travellers = {
        adults: passengers.filter((p) => p.type === "adult").length,
        children: passengers.filter((p) => p.type === "child").length,
        infants: passengers.filter((p) => p.type === "infant").length,
    };

    return (
        <div className="min-h-screen bg-sand pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <BookingStepper currentStep={3} />

                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 min-w-0 space-y-6">
                        <OrderSummary
                            flight={flightDetails!}
                            fareTier={selectedFare}
                            fareType={fareType}
                            passengers={passengers}
                            selectedSeats={selectedSeats}
                            selectedMeals={selectedMeals}
                            meals={meals}
                            contactDetails={contactDetails}
                        />

                        <div className="bg-white rounded-xl shadow-soft border border-sand-dark p-6">
                            <PromoCodeInput
                                onApply={handleApplyPromo}
                                onRemove={handleRemovePromo}
                                appliedCode={promoCode}
                                discount={promoDiscount}
                            />
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-1 accent-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                            />
                            <label htmlFor="terms" className="text-sm text-ink/60">
                                I agree to the{" "}
                                <Link
                                    href="/terms"
                                    className="text-coral hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                                >
                                    Terms & Conditions
                                </Link>
                                {" and "}
                                <Link
                                    href="/cancellation-policy"
                                    className="text-coral hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                                >
                                    Cancellation Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            onClick={handlePay}
                            disabled={processing || !termsAccepted}
                            className="w-full px-8 py-4 bg-coral text-white rounded-xl font-bold text-lg hover:bg-coral-hover transition-all disabled:opacity-50 shadow-glow flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                <>Pay {formatPrice(breakdown.grandTotal)}</>
                            )}
                        </button>
                    </div>

                    <div className="lg:w-[380px] shrink-0 space-y-4">
                        <FlightSummaryCard
                            flight={flightDetails!}
                            fareTier={selectedFare || undefined}
                            travellers={travellers}
                            farePrice={farePrice}
                        />
                        <PriceBreakup breakdown={breakdown} />
                    </div>
                </div>
            </div>
        </div>
    );
}
