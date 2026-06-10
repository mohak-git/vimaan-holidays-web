import { CalendarX, FileCheck2, HeartHandshake, ShieldCheck } from "lucide-react";
import type {
    BrandLogo,
    Destination,
    Feature,
    GalleryImage,
    Route,
    Testimonial,
    Trip,
} from "./types";

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
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315",
        title: "Spiritual Cliffs & Swings",
        subtitle:
            "Dusk-lit temples hanging over roaring oceans, lush jungle swings, and morning views that feed the soul.",
        location: "Bali, Indonesia",
        price: "49, 999",
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
        image: "https://images.unsplash.com/photo-1601225612316-b4733315a717",
        title: "Emerald Islands",
        subtitle:
            "Cruise past towering limestone cliffs, explore neon-lit night markets, and find your own slice of tropical paradise.",
        location: "Phuket, Thailand",
        price: "42, 999",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
        title: "Skyline & Dunes",
        subtitle:
            "Where gravity-defying architecture meets golden desert sands. Get ready for peak luxury and sci-fi vibes.",
        location: "Dubai, UAE",
        price: "64, 999",
    },
    {
        href: "#",
        image: "https://images.unsplash.com/photo-1697850084120-4896a446a04d",
        title: "Dragon's Bay",
        subtitle:
            "Sail through thousands of towering limestone islets shrouded in mist, where ancient myth meets emerald waters.",
        location: "Ha Long Bay, Vietnam",
        price: "38, 999",
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

export const TESTIMONIALS = [
    {
        title: "Seamless and Stress-Free!",
        quote: "The guided hiking tour was breathtaking, and the accommodations were top-notch. Vimaan Holidays made my dream vacation a reality!",
        name: "Andrew Scott",
        role: "Solo Traveler",
        cardImage: "https://framerusercontent.com/images/X4AiJgYs03AysIMhMEeZGQ6Xd4.png",
        avatar: "https://framerusercontent.com/images/pVkeEQv2UKwNZJVM7CksmKA0Pt8.png",
    },
    {
        title: "Best Travel Experience Ever!",
        quote: "I've been on many trips, but Vimaan Holidays stands out for their attention to detail and friendly guides. The mountain biking tour was thrilling!",
        name: "Matthew Logan",
        role: "Adventure Seeker",
        cardImage: "https://framerusercontent.com/images/QmA5zGyjeYJowBp8OMjiAV9CWHI.png",
        avatar: "https://framerusercontent.com/images/VWNq4C9hmkcyWtDTLUolLEPpiY.png",
    },
    {
        title: "Seamless and Stress-Free!",
        quote: "The guided hiking tour was breathtaking, and the accommodations were top-notch. Vimaan Holidays made my dream vacation a reality!",
        name: "Benjamin Thomas",
        role: "Travel Enthusiast",
        cardImage: "https://framerusercontent.com/images/cYMP6edvef3Ts0BOSvxn33YgzMs.png",
        avatar: "https://framerusercontent.com/images/3K9ScQ9VBfXP80NENZfe54vnak.png",
    },
    {
        title: "Amazing Service and Support!",
        quote: "I booked a solo safari with Vimaan Holidays, and it was the best decision. The itinerary was well-planned, and I felt completely safe throughout.",
        name: "Benjamin Thomas",
        role: "Travel Enthusiast",
        cardImage: "https://framerusercontent.com/images/JegQab06pHYTzDCbVzjMAkwOmRE.png",
        avatar: "https://framerusercontent.com/images/KtSssGYKG8t0cfktloePYmktnww.png",
    },
] as const satisfies readonly Testimonial[];

export const GALLERY = [
    {
        src: "https://framerusercontent.com/images/MCPK7p5lTLN6GtYpPFkZlnYj0.png",
        width: 282,
        height: 186,
    },
    {
        src: "https://framerusercontent.com/images/irxbxcWqTT1XF46oYdrlKLmKfOE.png",
        width: 179,
        height: 154,
    },
    {
        src: "https://framerusercontent.com/images/0cyrgdyFgH4HXcbQey3Id3OdM.png",
        width: 181,
        height: 275,
    },
    {
        src: "https://framerusercontent.com/images/qzaQswFpybM7ehhvBpCnIyQR1D0.png",
        width: 282,
        height: 215,
    },
    {
        src: "https://framerusercontent.com/images/0YhgQURqbt0V1jk5DnLxnr8lQGM.png",
        width: 179,
        height: 247,
    },
    {
        src: "https://framerusercontent.com/images/NIOzuaQtTENMPhLTK3Aq3wMU3q0.png",
        width: 179,
        height: 186,
    },
    {
        src: "https://framerusercontent.com/images/aXMmKMkmbaftgXqgLW6l6Ne4Yw.jpg",
        width: 179,
        height: 209,
    },
    {
        src: "https://framerusercontent.com/images/dW9aMqWFmgP5lFVORYj19sfPXlc.jpg",
        width: 179,
        height: 247,
    },
    {
        src: "https://framerusercontent.com/images/I8tMu3NoQxnNKS3uTWK08UyrtU.jpg",
        width: 282,
        height: 209,
    },
    {
        src: "https://framerusercontent.com/images/LLXplKFJHbnVubPwKelRdMqHmkI.jpg",
        width: 181,
        height: 275,
    },
    {
        src: "https://framerusercontent.com/images/bWR2wFJxD0uj0cXXJhXUQOFMJU.jpg",
        width: 282,
        height: 186,
    },
    {
        src: "https://framerusercontent.com/images/VyUdS5a2DU5hdC28yUIwCzIq43E.jpg",
        width: 179,
        height: 119,
    },
] as const satisfies readonly GalleryImage[];

export const BRAND_LOGOS = [
    {
        brand: "Booking.com",
        src: "https://www.logo.wine/a/logo/Booking.com/Booking.com-Logo.wine.svg",
    },
    { brand: "Expedia", src: "https://www.logo.wine/a/logo/Expedia/Expedia-Logo.wine.svg" },
    { brand: "Airbnb", src: "https://www.logo.wine/a/logo/Airbnb/Airbnb-Logo.wine.svg" },
    {
        brand: "TripAdvisor",
        src: "https://www.logo.wine/a/logo/TripAdvisor/TripAdvisor-Logo.wine.svg",
    },
    {
        brand: "Skyscanner",
        src: "https://www.logo.wine/a/logo/Skyscanner/Skyscanner-Logo.wine.svg",
    },
    { brand: "Kayak", src: "https://www.logo.wine/a/logo/Kayak.com/Kayak.com-Logo.wine.svg" },
] as const satisfies readonly BrandLogo[];
