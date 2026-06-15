"use client";

import { cn } from "@/lib/utils";
import { getDateStripItems, getMockPrice } from "@/lib/utils/calendar";
import type { FareType, TravelClass, Travellers } from "@/types/flights/search";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface Props {
    selectedDate: string;
    from: string;
    to: string;
    travellers: Travellers;
    travelClass: TravelClass;
    fareType: FareType;
    prices?: Record<string, number>;
}

interface DayProps {
    dateStr: string;
    dayName: string;
    dayNum: string;
    month: string;
    price: number;
    isSelected: boolean;
    onSelect: (dateStr: string) => void;
}

function DayButton({ dateStr, dayName, dayNum, month, price, isSelected, onSelect }: DayProps) {
    return (
        <button
            onClick={() => onSelect(dateStr)}
            className={cn(
                "flex flex-col items-center px-4 py-2 rounded-xl border transition-all min-w-[60px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                isSelected
                    ? "bg-coral text-white border-coral shadow-glow"
                    : "bg-white border-sand-dark hover:border-coral/50 text-ink",
            )}
        >
            <span className="text-xs font-medium">{dayName}</span>
            <span className="text-lg font-bold font-serif">{dayNum}</span>
            <span className="text-xs">{month}</span>
            <span
                className={cn(
                    "text-xs font-semibold mt-1",
                    isSelected ? "text-white/80" : "text-coral",
                )}
            >
                ₹{price}
            </span>
        </button>
    );
}

export default function FareCalendarStrip({
    selectedDate,
    from,
    to,
    travellers,
    travelClass,
    fareType,
    prices,
}: Props) {
    const router = useRouter();

    const dates = useMemo(() => getDateStripItems(selectedDate), [selectedDate]);

    const handleDateClick = useCallback(
        (dateStr: string) => {
            const params = new URLSearchParams({
                from,
                to,
                date: dateStr,
                adults: String(travellers.adults),
                children: String(travellers.children),
                infants: String(travellers.infants),
                class: travelClass,
                fareType,
            });
            router.push(`/flights/results?${params.toString()}`);
        },
        [from, to, travellers, travelClass, fareType, router],
    );

    return (
        <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 py-2 px-0.5 min-w-max">
                {dates.map((d) => (
                    <DayButton
                        key={d.dateStr}
                        dateStr={d.dateStr}
                        dayName={d.dayName}
                        dayNum={d.dayNum}
                        month={d.month}
                        price={prices?.[d.dateStr] ?? getMockPrice(d.dateStr)}
                        isSelected={d.dateStr === selectedDate}
                        onSelect={handleDateClick}
                    />
                ))}
            </div>
        </div>
    );
}
