import { GoogleIcon } from "@/components/layout/Icons";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthFormLayoutProps {
    children: ReactNode;
    googleDisabled: boolean;
    onGoogleSignIn: () => void;
    navText: string;
    navLinkText: string;
    navHref: string;
}

export default function AuthFormLayout({
    children,
    googleDisabled,
    onGoogleSignIn,
    navText,
    navLinkText,
    navHref,
}: AuthFormLayoutProps) {
    return (
        <div className="space-y-6">
            {children}

            <div className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-sand-dark" />
                    </div>

                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-ink/50">or continue with</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onGoogleSignIn}
                    disabled={googleDisabled}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-sand-dark bg-white px-4 py-3 text-sm font-medium text-ink transition-all hover:bg-sand focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:opacity-50"
                >
                    <GoogleIcon />
                    Google
                </button>

                <p className="text-center text-sm text-ink/60">
                    {navText}{" "}
                    <Link
                        href={navHref}
                        className="font-medium text-coral transition-colors hover:text-coral-hover"
                    >
                        {navLinkText}
                    </Link>
                </p>
            </div>
        </div>
    );
}
