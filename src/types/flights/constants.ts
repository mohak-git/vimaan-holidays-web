export const TRAVEL_CLASSES = ["economy", "premium", "business", "first"] as const;

export const FARE_TYPES = ["regular", "student", "senior", "army"] as const;

export const TIME_SLOTS = ["morning", "afternoon", "evening", "night"] as const;

export const REFUND_TYPES = ["all", "refundable", "non-refundable"] as const;

export const AIRCRAFT_TYPES = [
    "Airbus A319",
    "Airbus A320",
    "Airbus A321",
    "Airbus A340",
    "Airbus A350",
    "Airbus A380",
    "ATR 72",
    "Boeing 737",
    "Boeing 737 MAX",
    "Boeing 777",
    "Boeing 787",
] as const;

export const FARE_TIER_NAMES = ["saver", "value", "flex"] as const;

export const FLIGHT_TAGS = ["cheapest", "fastest", "earliest", "best"] as const;

export const AIRLINE_CODES = [
    "AI",
    "6E",
    "SG",
    "UK",
    "G8",
    "I5",
    "QP",
    "EK",
    "SQ",
    "LH",
    "BA",
    "QR",
    "9W",
] as const;

export const PASSENGER_TYPES = ["adult", "child", "infant"] as const;

export const BOOKING_STATUSES = ["confirmed", "cancelled", "completed"] as const;

export const PAYMENT_METHODS = ["Card", "UPI", "Net Banking", "EMI"] as const;

export const SEAT_TYPES = ["window", "middle", "aisle"] as const;

export const SEAT_STATUSES = ["available", "occupied", "selected"] as const;

export const MEAL_TYPES = ["veg", "non-veg", "vegan", "jain"] as const;

export const TRAVEL_CLASS_LABELS: Record<(typeof TRAVEL_CLASSES)[number], string> = {
    economy: "Economy",
    premium: "Premium Economy",
    business: "Business",
    first: "First",
};

export const FARE_TYPE_LABELS: Record<(typeof FARE_TYPES)[number], string> = {
    regular: "Regular",
    student: "Student",
    senior: "Senior Citizen",
    army: "Armed Forces",
};

export const FARE_LABEL_TO_VALUE: Record<string, (typeof FARE_TYPES)[number]> = {
    Regular: "regular",
    Student: "student",
    "Senior Citizen": "senior",
    "Armed Forces": "army",
};

export const FLIGHT_TAG_LABELS: Record<(typeof FLIGHT_TAGS)[number], string> = {
    cheapest: "Cheapest",
    fastest: "Fastest",
    earliest: "Earliest",
    best: "Best Value",
};

export const STOP_VALUES = [0, 1, 2] as const;

export const STOP_LABELS: Record<(typeof STOP_VALUES)[number], string> = {
    0: "Non-stop",
    1: "1 Stop",
    2: "2+ Stops",
};

export const TIME_SLOT_LABELS: Record<(typeof TIME_SLOTS)[number], string> = {
    morning: "Morning (5AM-12PM)",
    afternoon: "Afternoon (12PM-5PM)",
    evening: "Evening (5PM-9PM)",
    night: "Night (9PM-5AM)",
};

export const REFUND_TYPE_LABELS: Record<(typeof REFUND_TYPES)[number], string> = {
    all: "All",
    refundable: "Refundable",
    "non-refundable": "Non-refundable",
};

export const INSURANCE_PER_PERSON = 299;
export const CONVENIENCE_FEE = 299;
