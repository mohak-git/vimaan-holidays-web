import { CalendarX, FileCheck2, HeartHandshake, ShieldCheck } from "lucide-react";
import type { Destination, Feature, Route, Trip } from "./types";

export const BG_IMG_URL = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4";

export const SEARCH_EXAMPLES = [
    "Delhi to Goa next weekend for 4",
    "Tokyo in November",
    "Cab from Bangalore airport",
    "Bali visa for Indian passport",
    "Boutique stay in Jaipur",
] as const;

export const POPULAR_SEARCH_TAGS = [
    "Maldives Honeymoon",
    "Dubai Visa",
    "Weekend Getaways",
] as const;

export const FLIGHT_TRIP_TYPES = ["One Way", "Round Trip", "Multi City"] as const;

export const CAB_TRIP_TYPES = ["Outstation", "Airport Transfers", "Hourly Rentals"] as const;

export const SPECIAL_FARES = ["Regular", "Student", "Senior Citizen", "Armed Forces"] as const;

export const POPULAR_ROUTES = [
    {
        origin: { code: "DEL", city: "New Delhi" },
        destination: { code: "BOM", city: "Mumbai" },
        airline: "IndiGo",
        price: "3, 499",
        duration: "2h 10m",
        stops: "Non-stop",
    },
    {
        origin: { code: "BLR", city: "Bengaluru" },
        destination: { code: "DEL", city: "New Delhi" },
        airline: "Vistara",
        price: "4, 210",
        duration: "2h 45m",
        stops: "Non-stop",
    },
    {
        origin: { code: "BOM", city: "Mumbai" },
        destination: { code: "GOI", city: "Goa" },
        airline: "Air India",
        price: "2, 150",
        duration: "1h 20m",
        stops: "Non-stop",
    },
    {
        origin: { code: "DEL", city: "New Delhi" },
        destination: { code: "DXB", city: "Dubai" },
        airline: "Emirates",
        price: "14, 200",
        duration: "3h 55m",
        stops: "Non-stop",
    },
    {
        origin: { code: "CCU", city: "Kolkata" },
        destination: { code: "GAU", city: "Guwahati" },
        airline: "SpiceJet",
        price: "2, 850",
        duration: "1h 15m",
        stops: "Non-stop",
    },
    {
        origin: { code: "HYD", city: "Hyderabad" },
        destination: { code: "MAA", city: "Chennai" },
        airline: "Akasa Air",
        price: "1, 999",
        duration: "1h 10m",
        stops: "Non-stop",
    },
    {
        origin: { code: "DEL", city: "New Delhi" },
        destination: { code: "JFK", city: "New York" },
        airline: "Air India",
        price: "72, 400",
        duration: "15h 40m",
        stops: "Non-stop",
    },
    {
        origin: { code: "MAA", city: "Chennai" },
        destination: { code: "COK", city: "Kochi" },
        airline: "IndiGo",
        price: "2, 450",
        duration: "1h 15m",
        stops: "Non-stop",
    },
    {
        origin: { code: "DEL", city: "New Delhi" },
        destination: { code: "SFO", city: "San Francisco" },
        airline: "Emirates",
        price: "89, 000",
        duration: "21h 15m",
        stops: "1 stop",
    },
    {
        origin: { code: "CCU", city: "Kolkata" },
        destination: { code: "BOM", city: "Mumbai" },
        airline: "Vistara",
        price: "5, 600",
        duration: "2h 40m",
        stops: "Non-stop",
    },
] as const satisfies readonly Route[];

export const POPULAR_DESTINATIONS = [
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1499678329028-101435549a4e",
        title: "Vernazza Village",
        subtitle:
            "Sun-drenched cliffs, pastel houses, and a glass of local wine with your name on it.",
        location: "Cinque Terre, Italy",
        price: "84, 999",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b",
        title: "Luxury Atolls",
        subtitle:
            "The ultimate main-character energy destination—just you, overwater bungalows, and turquoise endlessness.",
        location: "Maldives",
        price: "1, 44, 999",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1708174093275-5cddab3865ab",
        title: "Balloon Valley",
        subtitle:
            "Float above a surreal landscape of fairy chimneys at sunrise. Yes, your Instagram will blow up.",
        location: "Cappadocia, Turkey",
        price: "66, 999",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
        title: "Oia Caldera",
        subtitle:
            "Where whitewashed dreams meet the world's most dramatic sunsets and infinite blue horizons.",
        location: "Santorini, Greece",
        price: "97, 999",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1589704379319-3b83010f661e",
        title: "White Pueblo Andaluz",
        subtitle:
            "Get lost in a labyrinth of sun-bleached streets, blooming geraniums, and old-world Andalusian charm.",
        location: "Mijas, Spain",
        price: "53, 999",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada",
        title: "Taj Mahal",
        subtitle:
            "The ultimate monument to love, rendered in flawless marble. Pictures don't even do it justice.",
        location: "Agra, India",
        price: "19, 999",
    },
] as const satisfies readonly Destination[];

export const FEATURED_TRIPS = [
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
        title: "Santorini",
        subtitle: "Sunsets & white-washed villas.",
        location: "Greece",
        duration: "6 Days / 5 Nights",
        price: "85, 999",
        stampCode: "JTR",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
        title: "Zermatt",
        subtitle: "Alpine peaks & pristine lakes.",
        location: "Switzerland",
        duration: "5 Days / 4 Nights",
        price: "92, 500",
        stampCode: "ZRM",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        title: "Kyoto",
        subtitle: "Ancient temples & bamboo groves.",
        location: "Japan",
        duration: "8 Days / 7 Nights",
        price: "1, 10, 000",
        stampCode: "KIX",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
        title: "Malé",
        subtitle: "Crystal waters & coral reefs.",
        location: "Maldives",
        duration: "4 Days / 3 Nights",
        price: "65, 499",
        stampCode: "MLE",
    },
] as const satisfies readonly Trip[];

export const FEATURES = [
    { icon: ShieldCheck, title: "Price lock", body: "Lock today's fare for up to 48 hours." },
    { icon: HeartHandshake, title: "24x7 human help", body: "Real people, every time zone." },
    { icon: CalendarX, title: "Free cancellation", body: "On most stays and flexible fares." },
    { icon: FileCheck2, title: "Instant visa", body: "e-Visas processed in under 72 hours." },
] as const satisfies readonly Feature[];
