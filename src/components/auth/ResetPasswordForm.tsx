"use client";

import { useResetPasswordForm } from "@/hooks/auth/useResetPasswordForm";
import Link from "next/link";
import NewPasswordForm from "./NewPasswordForm";
import EmailForm from "./ResetEmailForm";

function EmailSentMessage() {
    return (
        <div className="space-y-6 text-center">
            <p className="text-sm text-ink/60">
                If an account with that email exists, we&apos;ve sent a password reset link.
            </p>

            <p className="text-center text-sm text-ink/60">
                <Link
                    href="/sign-in"
                    className="font-medium text-coral transition-colors hover:text-coral-hover"
                >
                    Back to sign in
                </Link>
            </p>
        </div>
    );
}

function SuccessMessage() {
    return (
        <div className="text-center space-y-6">
            <p className="text-sm text-ink/60">Your password has been reset successfully.</p>

            <p className="text-center text-sm text-ink/60">
                <Link
                    href="/sign-in"
                    className="font-medium text-coral transition-colors hover:text-coral-hover"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}

export default function ResetPasswordForm() {
    const { token, step, onSent } = useResetPasswordForm();

    switch (step) {
        case "email":
            return <EmailForm onSent={onSent} />;
        case "email-sent":
            return <EmailSentMessage />;
        case "reset":
            return <NewPasswordForm token={token!} onSent={onSent} />;
        case "success":
            return <SuccessMessage />;
    }
}
