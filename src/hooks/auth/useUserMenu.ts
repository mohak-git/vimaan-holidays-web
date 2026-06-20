"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { authClient } from "@/lib/auth/authClient";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useUserMenu(onClose?: () => void) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
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
        setSigningOut(true);
        const { error } = await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    onClose?.();
                    router.push("/");
                },
            },
        });
        if (error) {
            toast.error(error.message || "Failed to sign out. Please try again.");
            setSigningOut(false);
        }
    }

    return { open, ref, toggle, signOut, signingOut };
}
