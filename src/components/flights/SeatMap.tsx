"use client";

import type { SeatMap as SeatMapType } from "@/types/flights/seat";
import { memo, useMemo } from "react";
import SeatCell from "./SeatCell";
import SeatLegend from "./SeatLegend";

interface Props {
    seatMap: SeatMapType;
    selectedSeatId: string | null;
    takenSeatIds: string[];
    onSeatSelect: (seatId: string, price: number) => void;
}

function SeatMap({ seatMap, selectedSeatId, takenSeatIds, onSeatSelect }: Props) {
    const seatIndex = useMemo(() => {
        const index = new Map<string, (typeof seatMap.seats)[0]>();
        for (const seat of seatMap.seats) index.set(seat.id, seat);

        return index;
    }, [seatMap]);

    const rows = Array.from({ length: seatMap.totalRows }, (_, i) => i + 1);
    const breakAfter = seatMap.columns.length === 6 ? 3 : 0;

    return (
        <div className="overflow-x-auto">
            <div className="inline-flex flex-col gap-1 min-w-[280px]">
                <CockpitIndicator />

                {rows.map((row) => (
                    <div key={row} className="flex items-center gap-1">
                        <span className="w-6 text-xs text-ink/40 text-right mr-1">{row}</span>
                        {seatMap.columns.map((col, colIdx) => {
                            const seatId = `${row}${col}`;
                            const seat = seatIndex.get(seatId);
                            if (!seat) return <div key={col} className="w-8 md:w-9" />;

                            const isSelected = selectedSeatId === seatId;
                            const isTaken = takenSeatIds.includes(seatId);
                            const state = isSelected
                                ? "selected"
                                : isTaken
                                  ? "taken"
                                  : seat.status === "occupied"
                                    ? "occupied"
                                    : "available";

                            return (
                                <div key={col} className="flex items-center">
                                    <SeatCell
                                        seatId={seatId}
                                        col={col}
                                        type={seat.type}
                                        price={seat.price}
                                        extraLegroom={seat.extraLegroom}
                                        exitRow={seat.exitRow}
                                        state={state}
                                        onSelect={onSeatSelect}
                                    />
                                    {colIdx === breakAfter - 1 && <div className="w-3 shrink-0" />}
                                </div>
                            );
                        })}
                    </div>
                ))}

                <SeatLegend />
            </div>
        </div>
    );
}

function CockpitIndicator() {
    return (
        <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium">
                F
            </div>
            <div className="text-xs text-gray-400">Cockpit</div>
        </div>
    );
}

export default memo(SeatMap);
