import type { Booking } from "@/types/flights/booking";
import type { SavedTraveller } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    bookingHistory: Booking[];
    savedTravellers: SavedTraveller[];
    addToBookingHistory: (booking: Booking) => void;
    updateBookingStatus: (bookingRef: string, status: Booking["status"]) => void;
    setSavedTravellers: (travellers: SavedTraveller[]) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            bookingHistory: [],
            savedTravellers: [],
            addToBookingHistory: (booking) =>
                set((state) => ({ bookingHistory: [booking, ...state.bookingHistory] })),
            updateBookingStatus: (bookingRef, status) =>
                set((state) => ({
                    bookingHistory: state.bookingHistory.map((b) =>
                        b.bookingRef === bookingRef ? { ...b, status } : b,
                    ),
                })),
            setSavedTravellers: (travellers) => set({ savedTravellers: travellers }),
        }),
        { name: "user-storage" },
    ),
);
