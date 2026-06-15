"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface CollapsibleSectionProps {
    title: string;
    icon: ReactNode;
    optional?: boolean;
    defaultOpen?: boolean;
    children: ReactNode;
}

export function CollapsibleSection({
    title,
    icon,
    optional,
    defaultOpen = false,
    children,
}: CollapsibleSectionProps) {
    const [open, setOpen] = useState(defaultOpen);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [open]);

    return (
        <div className="bg-white rounded-xl shadow-soft border border-sand-dark">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center gap-2 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-inset rounded-xl"
            >
                <span className="text-coral shrink-0">{icon}</span>
                <h2 className="font-semibold font-serif text-xl">{title}</h2>
                {optional && <span className="text-xs text-ink/40 ml-auto">Optional</span>}
                <ChevronDown
                    className={cn(
                        "w-5 h-5 text-ink/40 transition-transform duration-300 shrink-0",
                        open && "rotate-180",
                    )}
                />
            </button>
            <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: open ? contentHeight : 0 }}
            >
                <div ref={contentRef} className="px-6 pb-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
