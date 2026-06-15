import type { Seat, SeatMap, SeatStatus, SeatType } from "@/types/flights/seat";

function getSeatType(column: string, columns: string[]): SeatType {
    const idx = columns.indexOf(column);
    if (idx === 0 || idx === columns.length - 1) return "window";
    if (columns.length === 6 && (idx === 2 || idx === 3)) return "aisle";
    return "middle";
}

const columns = ["A", "B", "C", "D", "E", "F"];
const totalRows = 30;

const seats: Seat[] = [];

for (let row = 1; row <= totalRows; row++) {
    for (const col of columns) {
        const id = `${row}${col}`;
        const isOccupied = Math.random() < 0.3;
        const isBusiness = row <= 3;
        const isExtraLegroom = row >= 4 && row <= 6;
        const isExitRow = row >= 7 && row <= 10;

        const seatType = getSeatType(col, columns);

        let price = 0;
        let extraLegroom = false;
        let exitRow = false;

        if (isBusiness) {
            extraLegroom = true;
            price = 0;
        } else if (isExtraLegroom) {
            extraLegroom = true;
            price = [500, 600, 700, 800][Math.floor(Math.random() * 4)];
        } else if (isExitRow) {
            exitRow = true;
            price = [300, 400, 500][Math.floor(Math.random() * 3)];
        }

        const status: SeatStatus = isOccupied ? "occupied" : "available";

        seats.push({ id, row, column: col, type: seatType, status, extraLegroom, exitRow, price });
    }
}

export const seatMap: SeatMap = { totalRows, columns, seats };
