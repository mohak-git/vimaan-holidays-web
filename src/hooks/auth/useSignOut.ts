"use client";

import { authClient } from "@/lib/auth/authClient";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useSignOut(onSuccess?: () => void) {
    const router = useRouter();
    const [signingOut, setSigningOut] = useState(false);

    const signOut = useCallback(async () => {
        setSigningOut(true);
        const { error } = await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    onSuccess?.();
                    router.push("/");
                },
            },
        });
        if (error) {
            toast.error(error.message || "Failed to sign out. Please try again.");
            setSigningOut(false);
        }
    }, [router, onSuccess]);

    return { signOut, signingOut };
}
