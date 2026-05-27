import { LucideIcon } from "lucide-react";

export interface Link {
    label: string;
    href: string;
}
export interface IconLink extends Link {
    icon: LucideIcon;
}
export interface NavColumn {
    title: string;
    links: Link[];
}
