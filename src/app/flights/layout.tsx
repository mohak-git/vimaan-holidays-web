import AuthGuard from "@/components/auth/AuthGuard";
import type { ReactNode } from "react";

export default function FlightsLayout({ children }: { children: ReactNode }) {
    return <AuthGuard>{children}</AuthGuard>;
}
