import { verifySession } from "@/lib/auth/verify-session";
import type { ReactNode } from "react";

export default async function FlightsLayout({ children }: { children: ReactNode }) {
    await verifySession();

    return <>{children}</>;
}
