"use client";

import { Field, inputClass } from "@/components/ui/Field";
import { authClient } from "@/lib/auth/authClient";
import { emailResetSchema, type EmailResetData } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SubmitButton from "./shared/SubmitButton";

interface EmailFormProps {
    onSent: () => void;
}

export default function EmailForm({ onSent }: EmailFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmailResetData>({ resolver: zodResolver(emailResetSchema) });

    async function onSubmit(data: EmailResetData) {
        const { error } = await authClient.requestPasswordReset({
            email: data.email,
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            toast.error(error.message || "Failed to send reset email");
            return;
        }

        onSent();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field label="Email" error={errors.email?.message} required>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    disabled={isSubmitting}
                    className={cn(inputClass, "disabled:opacity-50")}
                    {...register("email")}
                />
            </Field>

            <SubmitButton loading={isSubmitting} loadingText="Sending...">
                Send reset link
            </SubmitButton>

            <p className="text-center text-sm text-ink/60">
                <Link
                    href="/sign-in"
                    className="font-medium text-coral transition-colors hover:text-coral-hover"
                >
                    Back to sign in
                </Link>
            </p>
        </form>
    );
}
