"use client";

import { authClient } from "@/lib/auth/authClient";
import { changePasswordSchema, type ChangePasswordData } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useChangePasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ChangePasswordData>({ resolver: zodResolver(changePasswordSchema) });

    async function onSubmit(data: ChangePasswordData) {
        const { error } = await authClient.changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            revokeOtherSessions: true,
        });

        if (error) {
            toast.error(error.message || "Failed to change password");
            return;
        }

        toast.success("Password changed successfully");
        reset();
    }

    return { register, handleSubmit, errors, isSubmitting, onSubmit };
}
