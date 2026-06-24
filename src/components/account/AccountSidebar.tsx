"use client";

import { UserAvatar } from "@/components/auth/UserAvatar";
import type { IconLink } from "@/config/types";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { authClient } from "@/lib/auth/authClient";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Loader2,
    LogOut,
    Menu,
    ScrollText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useState } from "react";
import { BOOKING_NAV, SIDEBAR_NAV } from "./constants";

interface SidebarLinkProps extends IconLink {
    isActive: boolean;
    collapsed: boolean;
    onClick?: () => void;
}

interface ToggleButtonProps {
    collapsed: boolean;
    onClick: () => void;
}

interface NavProps {
    collapsed: boolean;
    currentPath: string;
    onNavClick?: () => void;
}

interface AccountSidebarProps {
    mobileOpen: boolean;
    onMobileClose: () => void;
}

function LogoLink() {
    return (
        <Link href="/" aria-label="Vimaan Holidays Home" className="rounded-lg">
            <Image
                src="/logo.svg"
                alt="Vimaan Holidays"
                width={200}
                height={200}
                className="h-12 w-auto"
            />
        </Link>
    );
}

const SidebarLink = memo(function SidebarLink({
    label,
    href,
    icon: Icon,
    isActive,
    collapsed,
    onClick,
}: SidebarLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive ? "bg-coral/5 text-coral" : "text-ink/60 hover:bg-sand hover:text-ink",
            )}
        >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
        </Link>
    );
});

function BookingDropdown({ collapsed, currentPath, onNavClick }: NavProps) {
    const [open, setOpen] = useState(currentPath.startsWith("/bookings"));
    const { toggleSidebar } = useUserStore();
    const isActive = currentPath.startsWith("/bookings");

    function handleToggle() {
        if (collapsed) {
            toggleSidebar();
            setOpen(true);
        } else setOpen((prev) => !prev);
    }

    return (
        <div>
            <button
                onClick={handleToggle}
                className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive ? "bg-coral/5 text-coral" : "text-ink/60 hover:bg-sand hover:text-ink",
                )}
            >
                <ScrollText className="h-5 w-5 shrink-0" />
                {!collapsed && (
                    <>
                        <span className="flex-1 text-left">Bookings</span>
                        <div
                            className={cn("transition-transform duration-200", open && "rotate-90")}
                        >
                            <ChevronRight className="h-4 w-4 text-ink/30" />
                        </div>
                    </>
                )}
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-200 ease-in-out",
                    open && !collapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
            >
                <div className="ml-2 mt-0.5 border-l-2 border-sand-dark pl-2">
                    {BOOKING_NAV.map((sub) => (
                        <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={onNavClick}
                            className={cn(
                                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
                                currentPath === sub.href
                                    ? "bg-coral/5 text-coral"
                                    : "text-ink/50 hover:bg-sand hover:text-ink",
                            )}
                        >
                            <sub.icon className="h-3.5 w-3.5 shrink-0" />
                            <span>{sub.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

const ToggleButton = memo(function ToggleButton({ collapsed, onClick }: ToggleButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-3",
                "flex h-8 w-8 items-center justify-center rounded-full",
                "bg-white border-2 border-coral/40 shadow-lg",
                "text-coral hover:bg-coral hover:text-white hover:border-coral",
                "transition-all duration-200",
            )}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
    );
});

function SidebarNav({ collapsed, currentPath, onNavClick }: NavProps) {
    return (
        <nav className="flex-1 overflow-y-auto space-y-2 px-3 py-4 hide-scrollbar">
            <SidebarLink
                label="Dashboard"
                href="/dashboard"
                icon={LayoutDashboard}
                isActive={currentPath === "/dashboard"}
                collapsed={collapsed}
                onClick={onNavClick}
            />

            <BookingDropdown
                collapsed={collapsed}
                currentPath={currentPath}
                onNavClick={onNavClick}
            />

            {SIDEBAR_NAV.map((item) => (
                <SidebarLink
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    isActive={currentPath.startsWith(item.href)}
                    collapsed={collapsed}
                    onClick={onNavClick}
                />
            ))}
        </nav>
    );
}

function BottomActions({ collapsed }: { collapsed: boolean }) {
    const { data: session, isPending } = authClient.useSession();
    const { signOut, signingOut } = useSignOut();

    if (isPending) {
        return (
            <div
                className={cn("border-t border-sand-dark animate-pulse", collapsed ? "p-2" : "p-3")}
            >
                <div
                    className={cn(
                        "rounded-lg bg-sand-dark",
                        collapsed ? "mx-auto h-10 w-10" : "h-10",
                    )}
                />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className={cn("border-t border-sand-dark", collapsed ? "p-2" : "p-3")}>
            <div
                className={cn(
                    "flex",
                    collapsed ? "flex-col items-center" : "items-center gap-3 px-2",
                )}
            >
                {!collapsed && (
                    <>
                        <UserAvatar name={session.user.name} image={session.user.image} />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-ink">
                                {session.user.name}
                            </p>
                            <p className="truncate text-xs text-ink/50">{session.user.email}</p>
                        </div>
                    </>
                )}
                <button
                    onClick={signOut}
                    disabled={signingOut}
                    title={signingOut ? "Signing out..." : "Sign Out"}
                    className={cn(
                        "rounded-lg border border-sand-dark text-sm font-medium text-ink/50",
                        "hover:bg-rose-50 hover:text-rose-500 transition-colors",
                        collapsed
                            ? "flex w-full items-center justify-center py-2"
                            : "shrink-0 px-3 py-2",
                    )}
                >
                    {signingOut ? (
                        <Loader2
                            className={cn("animate-spin", collapsed ? "h-5 w-5" : "h-4 w-4")}
                        />
                    ) : (
                        <LogOut className={cn(collapsed ? "h-5 w-5" : "h-4 w-4")} />
                    )}
                </button>
            </div>
        </div>
    );
}

function SidebarContent({ collapsed, currentPath, onNavClick }: NavProps) {
    return (
        <div className="flex h-full flex-col bg-white">
            <div
                className={cn(
                    "flex shrink-0 items-center border-b border-sand-dark py-3",
                    collapsed ? "justify-center" : "px-4",
                )}
            >
                <LogoLink />
            </div>

            <SidebarNav collapsed={collapsed} currentPath={currentPath} onNavClick={onNavClick} />

            <BottomActions collapsed={collapsed} />
        </div>
    );
}

export function AccountSidebar({ mobileOpen, onMobileClose }: AccountSidebarProps) {
    const pathname = usePathname();
    const { sidebarCollapsed, toggleSidebar } = useUserStore();

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                style={{ width: sidebarCollapsed ? 72 : 260 }}
                className="hidden lg:flex flex-col shrink-0 relative transition-all duration-300 ease-in-out"
            >
                <div
                    style={{ width: sidebarCollapsed ? 72 : 260 }}
                    className="fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out"
                >
                    <ToggleButton collapsed={sidebarCollapsed} onClick={toggleSidebar} />
                    <SidebarContent
                        collapsed={sidebarCollapsed}
                        currentPath={pathname}
                        onNavClick={onMobileClose}
                    />
                </div>
            </aside>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-5 lg:hidden" role="dialog" aria-modal="true">
                    <div className="absolute inset-0 bg-black/30" onClick={onMobileClose} />
                    <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-xl">
                        <div className="relative h-full">
                            <ToggleButton collapsed={false} onClick={onMobileClose} />
                            <SidebarContent
                                collapsed={false}
                                currentPath={pathname}
                                onNavClick={onMobileClose}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export function AccountMobileTopBar({ onMenuOpen }: { onMenuOpen: () => void }) {
    return (
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-sand-dark px-4 py-3">
            <LogoLink />

            <button
                onClick={onMenuOpen}
                aria-label="Open navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ink/50 hover:bg-sand transition-colors"
            >
                <Menu className="h-5 w-5" />
            </button>
        </div>
    );
}
