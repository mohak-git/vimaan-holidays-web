"use client";

import { usePriceBreakdown } from "@/hooks/usePriceBreakdown";
import { useRazorpay } from "@/hooks/useRazorpay";
import { createOrder, verifyPayment } from "@/lib/razorpay/api";
import { getMeals } from "@/lib/services/addons";
import { buildBooking } from "@/lib/utils/buildBooking";
import { useBookingStore } from "@/store/useBookingStore";
import { useUserStore } from "@/store/useUserStore";
import type { FareTierName } from "@/types/flights/flight";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export function usePayment() {
    const router = useRouter();
    const params = useParams();
    const bookingStore = useBookingStore();
    const { addToBookingHistory } = useUserStore();

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [processing, setProcessing] = useState(false);

    const {
        flightId,
        selectedFare,
        farePrice,
        fareType,
        flightDetails,
        passengers,
        contactDetails,
        selectedSeats,
        selectedMeals,
        extraBaggage,
        insuranceAdded,
        promoCode,
        promoDiscount,
        applyPromo,
        removePromo,
        resetBooking,
    } = bookingStore;

    const { openRazorpay } = useRazorpay();

    const resolvedFlightId = flightId || (params.flightId as string);

    const meals = useMemo(() => getMeals(), []);

    const breakdown = usePriceBreakdown(true);

    const handleApplyPromo = useCallback(
        (code: string) => {
            return applyPromo(code, fareType ?? "regular");
        },
        [applyPromo, fareType],
    );

    const handleRemovePromo = useCallback(() => {
        removePromo();
    }, [removePromo]);

    const handlePay = useCallback(async () => {
        if (!termsAccepted) {
            toast.error("Please accept the Terms & Conditions to continue.");
            return;
        }

        if (!flightDetails) {
            toast.error("Flight details are missing. Please restart the booking.");
            return;
        }

        if (!breakdown.grandTotal) {
            toast.error("Unable to calculate total. Please try again.");
            return;
        }

        if (!contactDetails) {
            toast.error("Contact details missing. Please go back and fill them.");
            return;
        }

        setProcessing(true);

        try {
            const amountInPaise = Math.round(breakdown.grandTotal * 100);
            const receipt = `rcpt_${Date.now()}`;

            const order = await createOrder(amountInPaise, receipt);

            const prefillName = passengers[0]
                ? `${passengers[0].firstName} ${passengers[0].lastName}`.trim()
                : contactDetails.email;

            const razorpayResponse = await openRazorpay({
                key: order.key_id,
                amount: order.amount,
                currency: order.currency,
                name: "Vimaan Holidays",
                description: `Flight ${flightDetails.flightNumber} · ${flightDetails.from} → ${flightDetails.to}`,
                image: "https://digicraft.one/logo.svg",
                order_id: order.id,
                prefill: {
                    name: prefillName,
                    email: contactDetails.email,
                    contact: contactDetails.phone,
                },
                theme: { color: "#E86C5D" },
            });

            const { success } = await verifyPayment(razorpayResponse);

            if (!success) {
                toast.error("Payment verification failed. Please contact support.");
                return;
            }

            const booking = buildBooking({
                flightId: resolvedFlightId,
                flightDetails,
                passengers,
                selectedSeats,
                selectedMeals,
                extraBaggage,
                insuranceAdded,
                selectedFare: (selectedFare as FareTierName) ?? "value",
                fareType: fareType ?? "regular",
                breakdown,
                promoDiscount,
                contactDetails,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpayOrderId: razorpayResponse.razorpay_order_id,
            });

            addToBookingHistory(booking);

            toast.success("Payment successful! Booking confirmed.");
            router.push(`/flights/booking/confirmation/${booking.bookingRef}`);
            resetBooking();
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Payment failed. Please try again.";
            toast.error(message);
        } finally {
            setProcessing(false);
        }
    }, [
        termsAccepted,
        flightDetails,
        contactDetails,
        breakdown,
        passengers,
        openRazorpay,
        selectedSeats,
        selectedMeals,
        extraBaggage,
        insuranceAdded,
        selectedFare,
        fareType,
        promoDiscount,
        resolvedFlightId,
        addToBookingHistory,
        router,
        resetBooking,
    ]);

    return {
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
    };
}
