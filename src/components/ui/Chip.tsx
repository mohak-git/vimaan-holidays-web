"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ChipProps {
    selected: boolean;
    onClick: () => void;
    children: ReactNode;
}

export function Chip({ selected, onClick, children }: ChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-1",
                selected
                    ? "bg-coral text-white shadow-sm"
                    : "border border-sand-dark text-ink/70 hover:border-coral/50 hover:text-ink",
            )}
        >
            {children}
        </button>
    );
}
