import Layout from "@/components/account/Layout";
import { verifySession } from "@/lib/auth/verify-session";
import type { ReactNode } from "react";

export default async function AccountLayout({ children }: { children: ReactNode }) {
    await verifySession();

    return <Layout>{children}</Layout>;
}
