import { authClient } from "@/lib/auth/authClient";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useGoogleSignIn(redirectTo: string) {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const signIn = useCallback(async () => {
        setIsGoogleLoading(true);
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: redirectTo,
        });

        if (error) {
            toast.error(error.message || "Failed to sign in with Google");
            setIsGoogleLoading(false);
        }
    }, [redirectTo]);

    return { isGoogleLoading, signIn };
}
