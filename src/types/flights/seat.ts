import { SEAT_STATUSES, SEAT_TYPES } from "./constants";

export type SeatType = (typeof SEAT_TYPES)[number];
export type SeatStatus = (typeof SEAT_STATUSES)[number];

export interface Seat {
    id: string;
    row: number;
    column: string;
    type: SeatType;
    status: SeatStatus;
    extraLegroom: boolean;
    exitRow: boolean;
    price: number;
}

export interface SeatMap {
    totalRows: number;
    columns: string[];
    seats: Seat[];
}
