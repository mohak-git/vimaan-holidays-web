"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import {
    WEEKDAYS,
    canGoToNextMonth,
    canGoToPrevMonth,
    getCalendarGrid,
} from "@/lib/utils/calendar";
import { addMonths, format, subMonths } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label?: string;
}

const today = new Date();
const todayStr = format(today, "yyyy-MM-dd");
const todayDate = new Date(todayStr);

function DayCell({
    day,
    currentMonth,
    selectedDate,
    onSelect,
}: {
    day: Date;
    currentMonth: Date;
    selectedDate: string;
    onSelect: (date: string) => void;
}) {
    const dateStr = format(day, "yyyy-MM-dd");
    const isSelected = dateStr === selectedDate;
    const isToday = dateStr === todayStr;
    const isPast = day < todayDate;
    const isCurrentMonth = format(day, "M") === format(currentMonth, "M");

    return (
        <button
            type="button"
            onClick={() => onSelect(dateStr)}
            className={cn(
                "w-full aspect-square rounded-full text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                isSelected
                    ? "bg-coral text-white"
                    : isToday
                      ? "bg-coral/10 text-coral font-semibold"
                      : isPast || !isCurrentMonth
                        ? "text-ink/20 pointer-events-none"
                        : "hover:bg-sand text-ink",
            )}
        >
            {format(day, "d")}
        </button>
    );
}

export default function DatePicker({ value, onChange, label = "Departure" }: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(today);
    const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

    const weeks = getCalendarGrid(currentMonth);
    const displayValue = value ? format(new Date(value), "d MMM ''yy") : "Select date";
    const displayDay = value ? format(new Date(value), "EEEE") : "Choose your date";

    return (
        <div ref={ref} className="flex-1 min-w-0 relative w-full">
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full p-3 hover:bg-black/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-black/5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
                <p className="text-xs font-medium text-ink/60 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {label}
                </p>
                <p
                    className={cn(
                        "font-serif text-lg font-semibold truncate",
                        value ? "text-ink" : "text-ink/30",
                    )}
                >
                    {displayValue}
                </p>
                <p className={cn("text-xs truncate mt-0.5", value ? "text-ink/50" : "text-ink/30")}>
                    {displayDay}
                </p>
            </button>

            {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-xl border border-black/10 z-5 p-4 w-[320px] max-w-[calc(100vw-2rem)]">
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                            disabled={!canGoToPrevMonth(currentMonth, today)}
                            className="p-1 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-20 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold">
                            {format(currentMonth, "MMMM yyyy")}
                        </span>
                        <button
                            type="button"
                            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                            disabled={!canGoToNextMonth(currentMonth, today)}
                            className="p-1 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-20 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-ink/50 mb-2">
                        {WEEKDAYS.map((d) => (
                            <span key={d}>{d}</span>
                        ))}
                    </div>

                    <div className="space-y-1">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="grid grid-cols-7 gap-1">
                                {week.map((day) => (
                                    <DayCell
                                        key={format(day, "yyyy-MM-dd")}
                                        day={day}
                                        currentMonth={currentMonth}
                                        selectedDate={value}
                                        onSelect={(dateStr) => {
                                            onChange(dateStr);
                                            setOpen(false);
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
