import { CONVENIENCE_FEE } from "@/config/constants";
import { generateBookingRef, generatePNR } from "@/lib/utils/generateBookingRef";
import type {
    Booking,
    BookingPayment,
    ContactDetails,
    PassengerDetails,
    PriceBreakdown,
} from "@/types/flights/booking";
import type { FareTierName, FlightBookingInfo } from "@/types/flights/flight";
import type { FareType } from "@/types/flights/search";

export interface BuildBookingParams {
    flightId: string;
    flightDetails: FlightBookingInfo;
    passengers: PassengerDetails[];
    selectedSeats: { passengerId: string; seatId: string; price: number }[];
    selectedMeals: { passengerId: string; mealId: string; price: number }[];
    extraBaggage: { passengerId: string; baggageId: string; price: number }[];
    insuranceAdded: boolean;
    selectedFare: FareTierName;
    fareType: FareType;
    breakdown: PriceBreakdown;
    promoDiscount: number;
    contactDetails: ContactDetails;
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
}

function buildPayment(
    breakdown: PriceBreakdown,
    promoDiscount: number,
    razorpayPaymentId?: string,
    razorpayOrderId?: string,
): BookingPayment {
    const { baseFare, taxes, seatTotal, mealTotal, baggageTotal, insurance, grandTotal } =
        breakdown;
    return {
        baseFare,
        taxes,
        addons: seatTotal + mealTotal + baggageTotal + insurance,
        promoDiscount,
        convenienceFee: CONVENIENCE_FEE,
        total: grandTotal,
        method: "Card",
        razorpayPaymentId,
        razorpayOrderId,
    };
}

export function buildBooking({
    flightId,
    flightDetails,
    passengers,
    selectedSeats,
    selectedMeals,
    extraBaggage,
    insuranceAdded,
    selectedFare,
    fareType,
    breakdown,
    promoDiscount,
    contactDetails,
    razorpayPaymentId,
    razorpayOrderId,
}: BuildBookingParams): Booking {
    const bookingRef = generateBookingRef();
    const pnr = generatePNR();

    return {
        id: `B${Date.now()}`,
        bookingRef,
        pnr,
        status: "confirmed",
        flightId,
        flight: { ...flightDetails },
        passengers: passengers.map((p) => ({
            name: `${p.firstName} ${p.lastName}`.trim(),
            seat: selectedSeats.find((s) => s.passengerId === p.id)?.seatId ?? "",
            type: p.type,
        })),
        fareType: selectedFare,
        specialFare: fareType,
        addons: {
            seats: selectedSeats.map((s) => s.seatId),
            meals: selectedMeals.map((m) => m.mealId),
            extraBaggage: extraBaggage.length,
            insurance: insuranceAdded,
        },
        payment: buildPayment(breakdown, promoDiscount, razorpayPaymentId, razorpayOrderId),
        contact: { ...contactDetails },
        bookedAt: new Date().toISOString(),
    };
}
