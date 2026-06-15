"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import { memo, useState } from "react";

export type SeatState = "selected" | "taken" | "occupied" | "available";

interface SeatCellProps {
    seatId: string;
    col: string;
    type: string;
    price: number;
    extraLegroom: boolean;
    exitRow: boolean;
    state: SeatState;
    onSelect: (seatId: string, price: number) => void;
}

function SeatCell({
    seatId,
    col,
    type,
    price,
    extraLegroom,
    exitRow,
    state,
    onSelect,
}: SeatCellProps) {
    const [hovered, setHovered] = useState(false);
    const isDisabled = state === "occupied" || state === "taken";

    return (
        <div className="relative">
            <button
                type="button"
                disabled={isDisabled}
                onClick={() => {
                    if (!isDisabled) onSelect(seatId, price);
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-label={`Seat ${seatId}, ${type}${price > 0 ? `, ${formatPrice(price)}` : ", free"}`}
                aria-pressed={state === "selected"}
                className={cn(
                    "w-8 h-8 md:w-9 md:h-9 rounded-t-lg text-[10px] font-medium transition-all border",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-1",
                    state === "selected" && "bg-coral text-white border-coral",
                    state === "taken" &&
                        "bg-gray-100 text-gray-400 border-gray-300 border-dashed cursor-not-allowed",
                    state === "occupied" &&
                        "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200",
                    state === "available" &&
                        (extraLegroom || exitRow
                            ? "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200 cursor-pointer"
                            : "bg-white text-ink border-sand-dark hover:border-coral cursor-pointer"),
                )}
            >
                {col}
            </button>

            {hovered && !isDisabled && (
                <SeatTooltip
                    seatId={seatId}
                    type={type}
                    price={price}
                    extraLegroom={extraLegroom}
                    exitRow={exitRow}
                />
            )}
        </div>
    );
}

function SeatTooltip({
    seatId,
    type,
    price,
    extraLegroom,
    exitRow,
}: {
    seatId: string;
    type: string;
    price: number;
    extraLegroom: boolean;
    exitRow: boolean;
}) {
    return (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-ink text-white text-xs whitespace-nowrap shadow-lg z-10 pointer-events-none">
            {seatId} - {type}
            {extraLegroom && " (Extra legroom)"}
            {exitRow && " (Exit row)"}
            {price > 0 && ` +${formatPrice(price)}`}
        </div>
    );
}

export default memo(SeatCell);
