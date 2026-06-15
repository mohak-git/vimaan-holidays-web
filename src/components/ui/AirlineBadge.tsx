import { getAllAirlines } from "@/lib/services/airlines";

export function AirlineBadge({ code }: { code: string }) {
    const airlines = getAllAirlines();
    const airline = airlines.find((a) => a.code === code);
    if (!airline) return <span className="text-xs font-bold">{code}</span>;
    return (
        <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: airline.color }}
        >
            {airline.logo}
        </div>
    );
}
