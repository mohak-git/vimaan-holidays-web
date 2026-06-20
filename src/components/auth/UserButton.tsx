"use client";

import { authClient } from "@/lib/auth/authClient";
import { User } from "lucide-react";
import Link from "next/link";
import { UserMenuDropdown } from "./UserMenuDropdown";

export interface UserButtonProps {
    variant: "desktop" | "mobile";
    onClose?: () => void;
}

function LoadingState({ variant }: UserButtonProps) {
    if (variant === "mobile")
        return (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/10" />
                    <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-32 rounded bg-white/10" />
                        <div className="h-3 w-48 rounded bg-white/10" />
                    </div>
                </div>
                <div className="mt-3 h-10 w-full rounded-lg bg-white/10" />
            </div>
        );

    return <div className="h-8 w-8 animate-pulse rounded-full bg-white/10 ring-1 ring-white/10" />;
}

const variantStyles: Record<UserButtonProps["variant"], string> = {
    desktop:
        "inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
    mobile: "flex w-full items-center justify-center gap-2 rounded-lg bg-coral px-4 py-3 text-sm text-white transition-colors hover:bg-coral-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
};

function SignInButton({ variant, onClose }: UserButtonProps) {
    return (
        <Link href="/sign-in" className={variantStyles[variant]} onClick={onClose}>
            <User className="h-4 w-4" />
            <span>Sign In</span>
        </Link>
    );
}

export default function UserButton({ variant, onClose }: UserButtonProps) {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <LoadingState variant={variant} />;
    if (!session) return <SignInButton variant={variant} onClose={onClose} />;

    return (
        <UserMenuDropdown
            name={session.user.name}
            email={session.user.email}
            image={session.user.image}
            variant={variant}
            onClose={onClose}
        />
    );
}
