import type { Route } from "./types";

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
