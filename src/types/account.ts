import type { LucideIcon } from "lucide-react";

export interface Activity {
    title: string;
    date: string;
    icon: LucideIcon;
    amount: string | null;
}

export interface ActiveDevice {
    id: string;
    sessionToken: string;
    name: string;
    browser: string;
    os: string;
    ip: string;
    lastActive: string;
    isCurrent: boolean;
}

export interface HelpArticle {
    id: string;
    title: string;
    excerpt: string;
    category: string;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}
