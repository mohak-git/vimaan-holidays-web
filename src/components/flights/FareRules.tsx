"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FareRule {
    title: string;
    rules: string[];
}

const fareRules: FareRule[] = [
    { title: "Saver", rules: ["No cancellation", "No date change", "No show: Full loss"] },
    {
        title: "Value",
        rules: ["Cancellation fee: ₹3,500", "Date change fee: ₹2,500", "No show: Full loss"],
    },
    { title: "Flex", rules: ["Free cancellation", "Free date change", "No show: 50% refund"] },
];

interface Props {
    className?: string;
}

export default function FareRules({ className }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={cn("bg-white rounded-xl shadow-soft border border-sand-dark", className)}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    "w-full flex items-center justify-between p-6",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                )}
            >
                <h3 className="font-semibold font-serif text-lg">Fare Rules</h3>
                {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {open && (
                <div className="px-6 pb-6 space-y-4 border-t border-sand-dark pt-4">
                    {fareRules.map((rule) => (
                        <div key={rule.title}>
                            <h4 className="text-sm font-semibold text-ink mb-1">{rule.title}</h4>
                            <ul className="text-xs text-ink/60 space-y-1 list-disc list-inside">
                                {rule.rules.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
