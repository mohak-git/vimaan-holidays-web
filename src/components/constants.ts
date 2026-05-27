import { Facebook, Heart, HelpCircle, Instagram, Twitter, Youtube } from "lucide-react";
import { IconLink, Link, NavColumn } from "./types";

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
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/help", icon: HelpCircle, label: "Help" },
];
