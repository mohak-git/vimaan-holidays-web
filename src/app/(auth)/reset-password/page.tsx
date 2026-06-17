import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
    return (
        <AuthCard
            title="Reset password"
            subtitle="Enter your email to receive a reset link, or set a new password using the link you received."
        >
            <ResetPasswordForm />
        </AuthCard>
    );
}
