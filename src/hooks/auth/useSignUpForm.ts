"use client";

import { useGoogleSignIn } from "@/hooks/auth/useGoogleSignIn";
import { authClient } from "@/lib/auth/authClient";
import { signUpSchema, type SignUpData } from "@/lib/schemas/auth";
import { getSafeRedirect } from "@/lib/utils/redirect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useSignUpForm() {
    const searchParams = useSearchParams();
    const redirectTo = getSafeRedirect(searchParams.get("redirect"));

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpData>({ resolver: zodResolver(signUpSchema) });

    const { isGoogleLoading, signIn: onGoogleSignIn } = useGoogleSignIn(redirectTo);

    const isLoading = isSubmitting || isGoogleLoading;

    async function onSubmit(data: SignUpData) {
        const { error } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: redirectTo,
        });

        if (error) {
            toast.error(error.message || "Failed to create account");
            return;
        }

        toast.success("Account created! Check your email to verify your account.");
        reset();
    }

    return { register, handleSubmit, errors, isLoading, isSubmitting, onSubmit, onGoogleSignIn };
}
