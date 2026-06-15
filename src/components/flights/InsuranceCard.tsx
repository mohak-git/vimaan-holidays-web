"use client";

import { CONVENIENCE_FEE } from "@/config/constants";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Ambulance, Ban, Clock, Luggage } from "lucide-react";
import { ComponentType, memo } from "react";

interface InsuranceCoverage {
    icon: ComponentType<{ className?: string }>;
    label: string;
}

const COVERAGE_ITEMS: InsuranceCoverage[] = [
    { icon: Luggage, label: "Baggage loss/delay up to \u20B950,000" },
    { icon: Clock, label: "Flight delay coverage up to \u20B920,000" },
    { icon: Ambulance, label: "Medical emergency up to \u20B91,00,000" },
    { icon: Ban, label: "Trip cancellation up to \u20B930,000" },
];

interface Props {
    added: boolean;
    onToggle: () => void;
}

function CoverageRow({ icon: Icon, label }: InsuranceCoverage) {
    return (
        <div className="flex items-center gap-2 text-xs text-ink/70">
            <Icon className="w-3.5 h-3.5 text-coral shrink-0" />
            <span>{label}</span>
        </div>
    );
}

function InsuranceCard({ added, onToggle }: Props) {
    return (
        <div
            className={cn(
                "border rounded-xl p-5 transition-all",
                added ? "border-coral bg-coral/5" : "border-sand-dark",
            )}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div>
                        <h4 className="font-semibold">Travel Insurance</h4>
                        <p className="text-sm text-ink/60">
                            {formatPrice(CONVENIENCE_FEE)} per person
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onToggle}
                    className={cn(
                        "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-1",
                        added ? "bg-coral text-white" : "bg-ink text-white hover:bg-ink-light",
                    )}
                >
                    {added ? "Added" : "Add"}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COVERAGE_ITEMS.map((item) => (
                    <CoverageRow key={item.label} icon={item.icon} label={item.label} />
                ))}
            </div>
        </div>
    );
}

export default memo(InsuranceCard);
