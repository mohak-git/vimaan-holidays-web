"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { authClient } from "@/lib/auth/authClient";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useUserMenu() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const ref = useClickOutside<HTMLDivElement>(useCallback(() => setOpen(false), []));

    useEffect(() => {
        if (!open) return;

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    function toggle() {
        setOpen((prev) => !prev);
    }

    async function signOut() {
        await authClient.signOut();
        router.push("/");
        router.refresh();
    }

    return { open, ref, toggle, signOut };
}
