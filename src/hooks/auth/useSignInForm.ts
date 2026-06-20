"use client";

import { useGoogleSignIn } from "@/hooks/auth/useGoogleSignIn";
import { authClient } from "@/lib/auth/authClient";
import { signInSchema, type SignInData } from "@/lib/schemas/auth";
import { getSafeRedirect } from "@/lib/utils/redirect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useSignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = getSafeRedirect(searchParams.get("redirect"));

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInData>({ resolver: zodResolver(signInSchema) });

    const { isGoogleLoading, signIn: onGoogleSignIn } = useGoogleSignIn(redirectTo);

    const isLoading = isSubmitting || isGoogleLoading;

    async function onSubmit(data: SignInData) {
        const { error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: redirectTo,
        });

        if (error) {
            toast.error(error.message || "Failed to sign in");
            return;
        }

        router.replace(redirectTo);
        router.refresh();
    }

    return { register, handleSubmit, errors, isLoading, isSubmitting, onSubmit, onGoogleSignIn };
}
