"use client";

import { Field, inputClass } from "@/components/ui/Field";
import { useChangePasswordForm } from "@/hooks/auth/useChangePasswordForm";
import { cn } from "@/lib/utils";
import { Key, Shield } from "lucide-react";

export function SecuritySection() {
    const { register, handleSubmit, errors, isSubmitting, onSubmit } = useChangePasswordForm();

    return (
        <section className="rounded-2xl border border-sand-dark bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3 pb-6">
                <Shield className="h-5 w-5 text-coral" />
                <h2 className="font-serif text-xl font-medium text-ink">Security</h2>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <Key className="h-4 w-4 text-ink/40" />
                <h3 className="text-sm font-medium text-ink">Change password</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Field label="Current password" error={errors.currentPassword?.message} required>
                    <input
                        id="current-password"
                        type="password"
                        autoComplete="current-password"
                        disabled={isSubmitting}
                        className={cn(inputClass, "disabled:opacity-50")}
                        {...register("currentPassword")}
                    />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="New password" error={errors.newPassword?.message} required>
                        <input
                            id="new-password"
                            type="password"
                            autoComplete="new-password"
                            disabled={isSubmitting}
                            className={cn(inputClass, "disabled:opacity-50")}
                            {...register("newPassword")}
                        />
                    </Field>

                    <Field
                        label="Confirm password"
                        error={errors.confirmPassword?.message}
                        required
                    >
                        <input
                            id="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            disabled={isSubmitting}
                            className={cn(inputClass, "disabled:opacity-50")}
                            {...register("confirmPassword")}
                        />
                    </Field>
                </div>

                <div className="flex items-center justify-end pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-lg bg-coral px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-hover disabled:opacity-50"
                    >
                        {isSubmitting ? "Updating..." : "Update password"}
                    </button>
                </div>
            </form>
        </section>
    );
}
