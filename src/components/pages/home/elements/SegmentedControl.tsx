"use client";

import { useCallback } from "react";

interface OptionProps<T extends string> {
    label: T;
    isActive: boolean;
    onSelect: (option: T) => void;
}
function SegmentedOption<T extends string>({ label, isActive, onSelect }: OptionProps<T>) {
    const handleClick = useCallback(() => onSelect(label), [onSelect, label]);

    return (
        <button
            role="radio"
            aria-checked={isActive}
            onClick={handleClick}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coral ${
                isActive ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"
            }`}
        >
            {label}
        </button>
    );
}

interface Props<T extends string> {
    options: readonly T[];
    active: string;
    onSelect: (option: T) => void;
}

export default function SegmentedControl<T extends string>({
    options,
    active,
    onSelect,
}: Props<T>) {
    return (
        <div
            role="radiogroup"
            className="flex items-center gap-1 bg-black/5 p-1 rounded-full w-fit"
        >
            {options.map((option) => (
                <SegmentedOption
                    key={option}
                    label={option}
                    isActive={option === active}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
