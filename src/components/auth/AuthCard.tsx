import { Suspense, type ReactNode } from "react";
import AuthCardSkeleton from "./shared/AuthCardSkeleton";

type AuthCardProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <div className="h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8">
                <h1 className="font-serif text-2xl font-bold text-ink text-center">{title}</h1>
                <p className="mb-8 mt-1 text-sm text-ink/60 text-center">{subtitle}</p>

                <Suspense fallback={<AuthCardSkeleton />}>{children}</Suspense>
            </div>
        </div>
    );
}
