import AuthCard from "@/components/auth/AuthCard";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
    return (
        <AuthCard
            title="Create an account"
            subtitle="Sign up to start booking your next adventure."
        >
            <SignUpForm />
        </AuthCard>
    );
}
