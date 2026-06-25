import { CATEGORIES } from "@/components/home/types";
import type { IconLink } from "@/config/types";
import {
    HelpCircle,
    Mail,
    MessageCircle,
    Phone,
    ScrollText,
    Settings,
    UserCircle,
    Users,
} from "lucide-react";

export const SIDEBAR_NAV: IconLink[] = [
    { label: "Saved Travellers", href: "/travellers", icon: Users },
    { label: "Profile", href: "/profile", icon: UserCircle },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help & Support", href: "/help", icon: HelpCircle },
];

export const BOOKING_NAV: IconLink[] = CATEGORIES.map((c) => ({
    label: c.label,
    href: `/bookings/${c.id}`,
    icon: c.icon,
}));

export const QUICK_ACTIONS: IconLink[] = [
    { label: "Manage Bookings", href: "/bookings", icon: ScrollText },
    { label: "Saved Travellers", href: "/travellers", icon: Users },
    { label: "Get Support", href: "/help", icon: HelpCircle },
];

export const BOOKING_FILTERS = [
    { value: "confirmed", label: "Upcoming" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
] as const satisfies readonly { value: string; label: string }[];

interface SupportChannel extends IconLink {
    desc: string;
}
export const SUPPORT_CHANNELS: SupportChannel[] = [
    {
        icon: MessageCircle,
        label: "Chat Support",
        desc: "Chat with us on WhatsApp for quick help.",
        href: "https://wa.me/+918521867596",
    },
    {
        icon: Phone,
        label: "Call Us",
        desc: "Talk to our travel experts directly.",
        href: "tel:+91 85218 67596",
    },
    {
        icon: Mail,
        label: "Email Support",
        desc: "For detailed queries and attachments.",
        href: "hello@digicraft.one",
    },
];
