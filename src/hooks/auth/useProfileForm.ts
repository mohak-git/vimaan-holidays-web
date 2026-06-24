"use client";

import { authClient } from "@/lib/auth/authClient";
import { profileSchema, type ProfileData } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useProfileForm() {
    const { data: session, isPending, refetch } = authClient.useSession();

    const form = useForm<ProfileData>({
        resolver: zodResolver(profileSchema),
        values: { name: session?.user?.name ?? "", phone: session?.user?.phone ?? "" },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    async function onSubmit(data: ProfileData) {
        const { error } = await authClient.updateUser({
            name: data.name,
            phone: data.phone || undefined,
        });

        if (error) {
            toast.error(error.message || "Failed to update profile");
            return;
        }

        await refetch();
        toast.success("Profile updated successfully");
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isPending,
        session,
        onSubmit,
    };
}
