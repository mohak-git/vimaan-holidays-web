"use client";

import { UserAvatar } from "@/components/auth/UserAvatar";
import { Field, inputClass } from "@/components/ui/Field";
import { useProfileForm } from "@/hooks/auth/useProfileForm";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

function ProfileSkeleton() {
    return (
        <div className="space-y-8" aria-hidden>
            <div className="space-y-3">
                <div className="h-9 w-48 animate-pulse rounded-lg bg-sand-dark" />
                <div className="h-5 w-64 animate-pulse rounded bg-sand-dark" />
            </div>
            <div className="h-100 w-2/3 animate-pulse rounded-2xl bg-sand-dark" />
        </div>
    );
}

function ProfileContent() {
    const { register, handleSubmit, errors, isSubmitting, session, onSubmit } = useProfileForm();

    if (!session) return null;
    const { user } = session;

    return (
        <div className="w-full space-y-8 md:w-3/4 lg:w-2/3">
            <header>
                <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">My Profile</h1>
                <p className="mt-1 text-ink/50">
                    Manage your personal information and preferences.
                </p>
            </header>

            <div className="rounded-2xl border border-sand-dark bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-center gap-6 pb-8">
                    <UserAvatar
                        name={user.name}
                        image={user.image}
                        className="h-20 w-20 text-2xl"
                    />
                    <div>
                        <h2 className="text-xl font-medium text-ink">{user.name}</h2>
                        <p className="text-sm text-ink/50">
                            Member since{" "}
                            {new Date(user.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                            })}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Field label="Full Name" error={errors.name?.message} required>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            disabled={isSubmitting}
                            className={cn(inputClass, "disabled:opacity-50")}
                            {...register("name")}
                        />
                    </Field>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Email">
                            <div className={cn(inputClass, "flex items-center gap-2 text-ink/50")}>
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>{user.email}</span>
                            </div>
                        </Field>

                        <Field label="Phone" error={errors.phone?.message}>
                            <input
                                id="phone"
                                type="tel"
                                autoComplete="tel"
                                disabled={isSubmitting}
                                className={cn(inputClass, "disabled:opacity-50")}
                                {...register("phone")}
                            />
                        </Field>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center rounded-lg bg-coral px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-hover disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const { isPending, session } = useProfileForm();

    if (isPending) return <ProfileSkeleton />;
    if (!session) return null;

    return <ProfileContent />;
}
