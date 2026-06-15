import {
    BedDouble,
    Bus,
    Car,
    FileBadge,
    MapPinned,
    Plane,
    Ship,
    Ticket,
    type LucideIcon,
} from "lucide-react";
import { CAB_TRIP_TYPES, FLIGHT_TRIP_TYPES, SPECIAL_FARES } from "./constants";

export interface CategoryItem {
    readonly id: string;
    readonly label: string;
    readonly icon: LucideIcon;
}

export const CATEGORIES = [
    { id: "flight", label: "Flights", icon: Plane },
    { id: "hotel", label: "Hotels", icon: BedDouble },
    { id: "bus", label: "Buses", icon: Bus },
    { id: "cab", label: "Cabs", icon: Car },
    { id: "tour", label: "Tours", icon: MapPinned },
    { id: "activity", label: "Activities", icon: Ticket },
    { id: "visa", label: "Visa", icon: FileBadge },
    { id: "cruise", label: "Cruise", icon: Ship },
] as const satisfies readonly CategoryItem[];

export type Category = (typeof CATEGORIES)[number]["id"];

export type FlightTripType = (typeof FLIGHT_TRIP_TYPES)[number];
export type CabTripType = (typeof CAB_TRIP_TYPES)[number];
export type SpecialFare = (typeof SPECIAL_FARES)[number];

export interface Airport {
    readonly code: string;
    readonly city: string;
}

export interface Route {
    readonly origin: Airport;
    readonly destination: Airport;
    readonly airline: string;
    readonly price: string;
    readonly duration: string;
    readonly stops: string;
}

export interface Listing {
    readonly href: string;
    readonly image: string;
    readonly title: string;
    readonly subtitle: string;
    readonly location: string;
    readonly price: string;
}

export type Destination = Listing;

export interface Trip extends Listing {
    readonly duration: string;
    readonly stampCode: string;
}

export interface Feature {
    readonly icon: LucideIcon;
    readonly title: string;
    readonly body: string;
}

export interface Testimonial {
    readonly title: string;
    readonly quote: string;
    readonly name: string;
    readonly role: string;
    readonly cardImage: string;
    readonly avatar: string;
}

export interface GalleryImage {
    readonly src: string;
    readonly width: number;
    readonly height: number;
}

export interface BrandLogo {
    readonly brand: string;
    readonly src: string;
}
