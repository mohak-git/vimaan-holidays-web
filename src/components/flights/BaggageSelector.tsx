"use client";

import { Chip } from "@/components/ui/Chip";
import type { BaggageOption } from "@/types/flights/baggage";
import { memo } from "react";

interface Props {
    options: BaggageOption[];
    selectedBaggageId: string | null;
    passengerName: string;
    onSelect: (baggageId: string | null, price: number) => void;
}

function BaggageSelector({ options, selectedBaggageId, passengerName, onSelect }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
            <span className="text-sm font-medium text-ink sm:min-w-[120px]">{passengerName}</span>
            <div className="flex flex-wrap gap-1.5">
                <Chip selected={selectedBaggageId === null} onClick={() => onSelect(null, 0)}>
                    None
                </Chip>
                {options.map((opt) => (
                    <Chip
                        key={opt.id}
                        selected={selectedBaggageId === opt.id}
                        onClick={() => onSelect(opt.id, opt.price)}
                    >
                        {opt.label}
                    </Chip>
                ))}
            </div>
        </div>
    );
}

export default memo(BaggageSelector);
