import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    isAfter,
    parseISO,
    startOfDay,
    startOfMonth,
    startOfWeek,
    subDays,
} from "date-fns";

export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export interface DateStripItem {
    date: Date;
    dateStr: string;
    dayName: string;
    dayNum: string;
    month: string;
}

const MAX_DAYS_AHEAD = 60;

export function getDateStripItems(selectedDate: string, totalDays = 15): DateStripItem[] {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, MAX_DAYS_AHEAD);
    const target = startOfDay(parseISO(selectedDate));
    const midpoint = Math.floor((totalDays - 1) / 2);
    const startCandidate = subDays(target, midpoint);
    const start = startCandidate < today ? today : startCandidate;

    return Array.from({ length: totalDays }, (_, i) => {
        const d = addDays(start, i);
        return {
            date: d,
            dateStr: format(d, "yyyy-MM-dd"),
            dayName: format(d, "EEE"),
            dayNum: format(d, "d"),
            month: format(d, "MMM"),
        };
    }).filter((item) => item.date <= maxDate);
}

export function getMockPrice(dateStr: string): number {
    const hash = dateStr.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return 2000 + (hash % 3000);
}

export function getCalendarGrid(month: Date): Date[][] {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const gridStart = startOfWeek(monthStart);
    const gridEnd = endOfWeek(monthEnd);

    const weeks: Date[][] = [];
    let cursor = gridStart;
    while (cursor <= gridEnd) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
            week.push(cursor);
            cursor = addDays(cursor, 1);
        }
        weeks.push(week);
    }

    return weeks;
}

export function canGoToPrevMonth(currentMonth: Date, today: Date): boolean {
    return isAfter(startOfMonth(currentMonth), startOfMonth(today));
}

export function canGoToNextMonth(currentMonth: Date, today: Date): boolean {
    const maxMonth = addMonths(startOfMonth(today), 2);
    return isAfter(maxMonth, startOfMonth(currentMonth));
}
