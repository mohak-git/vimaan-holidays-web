import { cn } from "@/lib/utils";

export interface SortOption<T extends string> {
    value: T;
    label: string;
}

interface SortBarProps<T extends string> {
    options: SortOption<T>[];
    sortBy: T;
    onSortChange: (sort: T) => void;
    resultCount: number;
    label?: string;
}

export function SortBar<T extends string>({
    options,
    sortBy,
    onSortChange,
    resultCount,
    label = "flights found",
}: SortBarProps<T>) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-xl p-4 shadow-soft border border-sand-dark">
            <span className="text-sm text-ink/60">
                <span className="font-semibold text-ink">{resultCount}</span> {label}
            </span>
            <div className="flex items-center gap-1 bg-sand rounded-lg p-1">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onSortChange(opt.value)}
                        className={cn(
                            "px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                            sortBy === opt.value
                                ? "bg-coral text-white shadow-sm"
                                : "text-ink/60 hover:text-ink",
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
