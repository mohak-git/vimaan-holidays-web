import { AppStoreIcon, GooglePlayIcon, WhatsAppIcon } from "@/components/layout/Icons";
import {
    Compass,
    Facebook,
    Home,
    Instagram,
    Luggage,
    Phone,
    Twitter,
    Users,
    Youtube,
} from "lucide-react";
import { ContactLink, DownloadLink, IconLink, Link, NavColumn } from "./types";

export const SOCIAL_LINKS: IconLink[] = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export const NAV_COLUMNS: NavColumn[] = [
    {
        title: "Book",
        links: [
            { label: "Flights", href: "/flights" },
            { label: "Hotels & Homes", href: "/hotels" },
            { label: "Cabs & Transfers", href: "/cabs" },
            { label: "Buses", href: "/buses" },
            { label: "Tours", href: "/tours" },
            { label: "Cruises", href: "/cruises" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "/help" },
            { label: "Contact Us", href: "/contact" },
            { label: "Cancellation Policy", href: "/cancellation-policy" },
            { label: "Travel Advisories", href: "/travel-advisories" },
            { label: "Visa Information", href: "/visa-info" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" },
            { label: "Investor Relations", href: "/investors" },
            { label: "List Your Property", href: "/list-property" },
        ],
    },
];

export const LEGAL_LINKS: Link[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
];

export const NAV_LINKS: IconLink[] = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: Compass, label: "About" },
    { href: "/packages", icon: Luggage, label: "Packages" },
    { href: "/community", icon: Users, label: "Community" },
];

export const DOWNLOAD_LINKS: readonly DownloadLink[] = [
    { label: "Google Play", href: "#", icon: GooglePlayIcon },
    { label: "App Store", href: "#", icon: AppStoreIcon },
];

export const CONTACT_LINKS: readonly ContactLink[] = [
    { icon: Phone, href: "tel:+91 85218 67596", label: "Call Support" },
    { icon: WhatsAppIcon, href: "https://wa.me/+918521867596", label: "WhatsApp Support" },
];

export const SITE_TAGLINE = "India's premium boutique travel agency";

// ─── Travel & domain constants ───────────────────────────────────────────────

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
