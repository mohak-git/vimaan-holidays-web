import type { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
}

const defaultUser: User = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: defaultUser,
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
            updateProfile: (data) =>
                set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
        }),
        { name: "auth-storage" },
    ),
);
