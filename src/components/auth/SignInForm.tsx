"use client";

import { Field, inputClass } from "@/components/ui/Field";
import { useSignInForm } from "@/hooks/auth/useSignInForm";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AuthFormLayout from "./shared/AuthFormLayout";
import SubmitButton from "./shared/SubmitButton";

export default function SignInForm() {
    const { register, handleSubmit, errors, isLoading, isSubmitting, onSubmit, onGoogleSignIn } =
        useSignInForm();

    return (
        <AuthFormLayout
            googleDisabled={isLoading}
            onGoogleSignIn={onGoogleSignIn}
            navText="Don't have an account?"
            navLinkText="Sign up"
            navHref="/sign-up"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Field label="Email" error={errors.email?.message} required>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        className={cn(inputClass, "disabled:opacity-50")}
                        {...register("email")}
                    />
                </Field>

                <Field label="Password" error={errors.password?.message} required>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        className={cn(inputClass, "disabled:opacity-50")}
                        {...register("password")}
                    />
                </Field>

                <div className="flex justify-end">
                    <Link
                        href="/reset-password"
                        className="text-sm font-medium text-coral transition-colors hover:text-coral-hover"
                    >
                        Forgot password?
                    </Link>
                </div>

                <SubmitButton loading={isSubmitting} loadingText="Signing in...">
                    Sign in
                </SubmitButton>
            </form>
        </AuthFormLayout>
    );
}
