import type { FareType, TravelClass, Travellers } from "@/types/flights/search";
import { format, parseISO } from "date-fns";
import { ArrowRightLeft, Search } from "lucide-react";
import Link from "next/link";

interface Props {
    from: string;
    to: string;
    date: string;
    travellers: Travellers;
    travelClass: TravelClass;
    fareType: FareType;
}

function travellerSummary(t: Travellers): string {
    const parts: string[] = [];
    if (t.adults) parts.push(`${t.adults} ${t.adults === 1 ? "Adult" : "Adults"}`);
    if (t.children) parts.push(`${t.children} ${t.children === 1 ? "Child" : "Children"}`);
    if (t.infants) parts.push(`${t.infants} ${t.infants === 1 ? "Infant" : "Infants"}`);
    return parts.join(", ");
}

export default function SearchSummaryBar({
    from,
    to,
    date,
    travellers,
    travelClass,
    fareType,
}: Props) {
    let formattedDate: string;
    try {
        formattedDate = format(parseISO(date), "d MMM yyyy");
    } catch {
        formattedDate = date;
    }

    return (
        <div className="bg-white rounded-xl shadow-soft border border-sand-dark py-3 sm:py-4 px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                <div className="flex items-center justify-between sm:justify-start gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold font-serif text-lg">{from}</span>
                        <ArrowRightLeft className="w-4 h-4 shrink-0 text-ink/40" />
                        <span className="font-bold font-serif text-lg">{to}</span>
                    </div>
                    <Link
                        href="/?category=flight"
                        className="flex sm:hidden items-center gap-1.5 text-sm font-medium text-coral hover:text-coral-hover transition-colors shrink-0"
                        aria-label="Modify search"
                    >
                        <Search className="w-4 h-4" />
                    </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-1.5 sm:flex-1">
                    <span className="text-xs sm:text-sm text-ink/70">{formattedDate}</span>
                    <span className="text-ink/30">|</span>
                    <span className="text-xs sm:text-sm text-ink/70">
                        {travellerSummary(travellers)}
                    </span>
                    <span className="text-ink/30">|</span>
                    <span className="text-xs sm:text-sm text-ink/70 capitalize">{travelClass}</span>
                    <span className="text-ink/30">|</span>
                    <span className="text-xs sm:text-sm text-ink/70 capitalize">{fareType}</span>

                    <Link
                        href="/?category=flight"
                        className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-coral hover:text-coral-hover transition-colors shrink-0 ml-auto"
                    >
                        <Search className="w-4 h-4" />
                        <span>Modify</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
