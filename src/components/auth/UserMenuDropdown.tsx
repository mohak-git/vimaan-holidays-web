"use client";

import { useSignOut } from "@/hooks/auth/useSignOut";
import { useClickOutside } from "@/hooks/useClickOutside";
import { LayoutDashboard, Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { UserAvatar } from "./UserAvatar";
import type { UserButtonProps } from "./UserButton";

interface UserMenuDropdownProps {
    name: string;
    email: string;
    image?: string | null | undefined;
    variant: UserButtonProps["variant"];
    onClose?: () => void;
}

export function UserMenuDropdown({ name, email, image, variant, onClose }: UserMenuDropdownProps) {
    const [open, setOpen] = useState(false);
    const { signOut, signingOut } = useSignOut(onClose);
    const ref = useClickOutside<HTMLDivElement>(useCallback(() => setOpen(false), []));

    function toggle() {
        setOpen((prev) => !prev);
    }

    if (variant === "mobile") {
        return (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                    <UserAvatar name={name} image={image} />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{name}</p>
                        <p className="truncate text-xs text-white/50">{email}</p>
                    </div>
                </div>

                <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-coral/40 hover:bg-coral/10 hover:text-white"
                >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                </Link>

                <button
                    onClick={signOut}
                    disabled={signingOut}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-coral/40 hover:bg-coral/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {signingOut ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <LogOut className="h-4 w-4" />
                    )}
                    {signingOut ? "Signing out..." : "Sign Out"}
                </button>
            </div>
        );
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={toggle}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-xs font-semibold text-white transition-all hover:bg-coral-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={open}
            >
                <UserAvatar name={name} image={image} />
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-full z-1 mt-2 min-w-[220px] rounded-xl border border-sand-dark bg-white shadow-soft"
                >
                    <div className="border-b border-sand-dark px-4 py-3">
                        <p className="truncate text-sm font-medium text-ink">{name}</p>
                        <p className="truncate text-xs text-ink/50">{email}</p>
                    </div>
                    <div className="p-1">
                        <Link
                            href="/dashboard"
                            role="menuitem"
                            onClick={onClose}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink/70 transition-colors hover:bg-sand hover:text-ink"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>

                        <button
                            onClick={signOut}
                            disabled={signingOut}
                            role="menuitem"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink/70 transition-colors hover:bg-sand hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {signingOut ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <LogOut className="h-4 w-4" />
                            )}
                            {signingOut ? "Signing out..." : "Sign out"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
