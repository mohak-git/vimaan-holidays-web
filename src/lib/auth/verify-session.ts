import "server-only";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const verifySession = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/sign-in");
    return session;
};
