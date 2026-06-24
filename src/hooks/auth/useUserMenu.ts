"use client";

import { useSignOut } from "@/hooks/auth/useSignOut";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useCallback, useEffect, useState } from "react";

export function useUserMenu(onClose?: () => void) {
    const [open, setOpen] = useState(false);
    const { signOut, signingOut } = useSignOut(onClose);
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

    return { open, ref, toggle, signOut, signingOut };
}
