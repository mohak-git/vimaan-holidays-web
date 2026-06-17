import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

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

export interface DownloadLink {
    label: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface QuickLink extends Link {
    icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
    shortLabel: string;
}
