"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { getAllAirports } from "@/lib/services/airports";
import type { Airport } from "@/types/flights/airport";
import type { LucideIcon } from "lucide-react";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface Props {
    label: string;
    value: Airport | null;
    onSelect: (airport: Airport) => void;
    icon: LucideIcon;
    excludeCode?: string;
}

const airports = getAllAirports();

export default function AirportInput({ label, value, onSelect, icon: Icon, excludeCode }: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

    const q = query.toLowerCase();
    const filtered = query
        ? airports.filter(
              (a) =>
                  a.code !== excludeCode &&
                  (a.code.toLowerCase().includes(q) ||
                      a.city.toLowerCase().includes(q) ||
                      a.name.toLowerCase().includes(q)),
          )
        : airports.filter((a) => a.code !== excludeCode).slice(0, 10);

    return (
        <div ref={ref} className="relative w-full min-w-0 flex-1">
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full min-w-0 p-3 text-left rounded-xl transition-colors cursor-pointer
                           hover:bg-black/5 border border-transparent hover:border-black/5
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
                <p className="text-xs font-medium text-ink/60 mb-1 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                </p>
                {value ? (
                    <div className="min-w-0">
                        <p className="font-serif text-lg font-semibold text-ink truncate leading-tight">
                            {value.city}
                        </p>
                        <p className="text-xs text-ink/50 truncate mt-0.5">
                            {value.code}, {value.name}&nbsp;&middot;&nbsp;{value.country}
                        </p>
                    </div>
                ) : (
                    <div className="min-w-0">
                        <p className="font-serif text-lg font-semibold text-ink/30 leading-tight">
                            Select city
                        </p>
                        <p className="text-xs text-ink/30 mt-0.5">Search airports</p>
                    </div>
                )}
            </button>

            {open && (
                <div className="absolute top-full left-0 right-0 mt-1 z-5 bg-white rounded-2xl shadow-xl border border-black/10 max-h-[320px] overflow-hidden">
                    <div className="p-2 border-b border-black/5">
                        <div className="flex items-center gap-2 bg-sand rounded-xl px-3 py-2">
                            <Search className="w-4 h-4 text-ink/40 shrink-0" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search city or airport..."
                                className="flex-1 min-w-0 bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none"
                                autoFocus
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="text-ink/30 hover:text-ink shrink-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-[260px]">
                        {filtered.length === 0 ? (
                            <div className="p-4 text-center text-sm text-ink/40">
                                No airports found
                            </div>
                        ) : (
                            filtered.map((airport) => (
                                <button
                                    key={airport.code}
                                    type="button"
                                    onClick={() => {
                                        onSelect(airport);
                                        setQuery("");
                                        setOpen(false);
                                    }}
                                    className="w-full min-w-0 text-left px-4 py-3 hover:bg-sand transition-colors flex items-center gap-3 border-b border-black/5 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-ink truncate">
                                            {airport.city}
                                        </p>
                                        <p className="text-xs text-ink/50 truncate">
                                            {airport.code}&nbsp;&middot;&nbsp;{airport.name}
                                            &nbsp;&middot;&nbsp;
                                            {airport.country}
                                        </p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
