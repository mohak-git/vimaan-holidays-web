import type { ActiveDevice } from "@/types/account";
import type { Booking } from "@/types/flights/booking";
import type { SavedTraveller } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    bookingHistory: Booking[];
    savedTravellers: SavedTraveller[];
    devices: ActiveDevice[];
    sidebarCollapsed: boolean;
    addToBookingHistory: (booking: Booking) => void;
    updateBookingStatus: (bookingRef: string, status: Booking["status"]) => void;
    setSavedTravellers: (travellers: SavedTraveller[]) => void;
    addTraveller: (traveller: SavedTraveller) => void;
    updateTraveller: (id: string, data: Partial<SavedTraveller>) => void;
    removeTraveller: (id: string) => void;
    setDevices: (devices: ActiveDevice[]) => void;
    removeDevice: (sessionToken: string) => void;
    clearDevices: () => void;
    toggleSidebar: () => void;
    resetBooking: () => void;
}

const initialState = {
    bookingHistory: [],
    savedTravellers: [],
    devices: [],
    sidebarCollapsed: false,
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            ...initialState,
            addToBookingHistory: (booking) =>
                set((state) => ({ bookingHistory: [booking, ...state.bookingHistory] })),
            updateBookingStatus: (bookingRef, status) =>
                set((state) => ({
                    bookingHistory: state.bookingHistory.map((b) =>
                        b.bookingRef === bookingRef ? { ...b, status } : b,
                    ),
                })),
            setSavedTravellers: (travellers) => set({ savedTravellers: travellers }),
            addTraveller: (traveller) =>
                set((state) => ({ savedTravellers: [...state.savedTravellers, traveller] })),
            updateTraveller: (id, data) =>
                set((state) => ({
                    savedTravellers: state.savedTravellers.map((t) =>
                        t.id === id ? { ...t, ...data } : t,
                    ),
                })),
            removeTraveller: (id) =>
                set((state) => ({
                    savedTravellers: state.savedTravellers.filter((t) => t.id !== id),
                })),
            setDevices: (devices) => set({ devices }),
            removeDevice: (sessionToken) =>
                set((state) => ({
                    devices: state.devices.filter((d) => d.sessionToken !== sessionToken),
                })),
            clearDevices: () => set({ devices: [] }),
            toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
            resetBooking: () => set({ ...initialState }),
        }),
        { name: "user-storage" },
    ),
);
