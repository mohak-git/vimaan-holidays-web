"use client";

import { Field, inputClass } from "@/components/ui/Field";
import { useSignUpForm } from "@/hooks/auth/useSignUpForm";
import { cn } from "@/lib/utils";
import AuthFormLayout from "./shared/AuthFormLayout";
import SubmitButton from "./shared/SubmitButton";

export default function SignUpForm() {
    const { register, handleSubmit, errors, isLoading, isSubmitting, onSubmit, onGoogleSignIn } =
        useSignUpForm();

    return (
        <AuthFormLayout
            googleDisabled={isLoading}
            onGoogleSignIn={onGoogleSignIn}
            navText="Already have an account?"
            navLinkText="Sign in"
            navHref="/sign-in"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Field label="Full name" error={errors.name?.message} required>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        disabled={isLoading}
                        className={cn(inputClass, "disabled:opacity-50")}
                        {...register("name")}
                    />
                </Field>

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
                        autoComplete="new-password"
                        disabled={isLoading}
                        className={cn(inputClass, "disabled:opacity-50")}
                        {...register("password")}
                    />
                </Field>

                <SubmitButton loading={isSubmitting} loadingText="Creating account...">
                    Create account
                </SubmitButton>
            </form>
        </AuthFormLayout>
    );
}
