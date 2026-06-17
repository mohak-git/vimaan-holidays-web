"use client";

import { Field, inputClass } from "@/components/ui/Field";
import { authClient } from "@/lib/auth/authClient";
import { resetSchema, type ResetData } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SubmitButton from "./shared/SubmitButton";

interface NewPasswordFormProps {
    token: string;
    onSent: () => void;
}

export default function NewPasswordForm({ token, onSent }: NewPasswordFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetData>({ resolver: zodResolver(resetSchema) });

    async function onSubmit(data: ResetData) {
        const { error } = await authClient.resetPassword({
            newPassword: data.password,
            token,
        });

        if (error) {
            toast.error(error.message || "Failed to reset password");
            return;
        }

        toast.success("Password reset successfully");
        onSent();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field label="New password" error={errors.password?.message} required>
                <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    className={cn(inputClass, "disabled:opacity-50")}
                    {...register("password")}
                />
            </Field>

            <Field label="Confirm password" error={errors.confirmPassword?.message} required>
                <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    className={cn(inputClass, "disabled:opacity-50")}
                    {...register("confirmPassword")}
                />
            </Field>

            <SubmitButton loading={isSubmitting} loadingText="Resetting...">
                Reset password
            </SubmitButton>
        </form>
    );
}
