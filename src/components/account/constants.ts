import { CATEGORIES } from "@/components/home/types";
import type { IconLink } from "@/config/types";
import { HelpCircle, ScrollText, Settings, UserCircle, Users } from "lucide-react";

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
