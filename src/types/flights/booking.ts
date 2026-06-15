import { BOOKING_STATUSES, PASSENGER_TYPES, PAYMENT_METHODS } from "@/config/constants";
import type { Person } from "../person";
import type { FareTierName, FlightBookingInfo } from "./flight";
import type { Meal } from "./meal";
import type { FareType } from "./search";
import type { Seat } from "./seat";

export type PassengerType = (typeof PASSENGER_TYPES)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

type SeatId = Seat["id"];
type MealId = Meal["id"];

export interface Passenger {
    name: string;
    seat: SeatId;
    type: PassengerType;
}

export interface PassengerDetails extends Person {
    phone: string;
    email: string;
    studentId?: string;
    serviceId?: string;
    type: PassengerType;
}

export interface ContactDetails {
    email: string;
    phone: string;
    countryCode: string;
}

export interface SeatSelection {
    passengerId: string;
    seatId: string;
    price: number;
}

export interface MealSelection {
    passengerId: string;
    mealId: string;
    price: number;
}

export interface BaggageSelection {
    passengerId: string;
    baggageId: string;
    price: number;
}

export interface PriceBreakdown {
    baseFare: number;
    taxes: number;
    seatTotal: number;
    mealTotal: number;
    baggageTotal: number;
    insurance: number;
    convenienceFee: number;
    subtotal: number;
    promoDiscount: number;
    grandTotal: number;
}

export interface CalculateParams {
    farePrice: number;
    adults: number;
    seatTotal: number;
    mealTotal: number;
    baggageTotal: number;
    insuranceAdded: boolean;
    insurancePerPerson: number;
    promoDiscount: number;
    convenienceFee: number;
}

export interface BookingAddons {
    seats: SeatId[];
    meals: MealId[];
    extraBaggage: number;
    insurance: boolean;
}

export interface BookingPayment {
    baseFare: number;
    taxes: number;
    addons: number;
    promoDiscount: number;
    convenienceFee: number;
    total: number;
    method: PaymentMethod;
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
}

export interface Booking {
    id: string;
    bookingRef: string;
    pnr: string;
    status: BookingStatus;
    flightId: string;
    flight: FlightBookingInfo;
    passengers: Passenger[];
    fareType: FareTierName;
    specialFare: FareType;
    addons: BookingAddons;
    payment: BookingPayment;
    contact: ContactDetails;
    bookedAt: string;
}
