"use client";

import { DevicesSection } from "@/components/account/settings/DevicesSection";
import { SecuritySection } from "@/components/account/settings/SecuritySection";
import { authClient } from "@/lib/auth/authClient";

function SettingsSkeleton() {
    return (
        <div className="space-y-8" aria-hidden>
            <div className="space-y-3">
                <div className="h-9 w-48 animate-pulse rounded-lg bg-sand-dark" />
                <div className="h-5 w-56 animate-pulse rounded bg-sand-dark" />
            </div>
            <div className="h-80 animate-pulse rounded-2xl bg-sand-dark" />
            <div className="h-64 animate-pulse rounded-2xl bg-sand-dark" />
        </div>
    );
}

function SettingsContent() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">Settings</h1>
                <p className="mt-1 text-ink/50">Manage your security and preferences.</p>
            </header>

            <SecuritySection />
            <DevicesSection />
        </div>
    );
}

export default function SettingsPage() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <SettingsSkeleton />;
    if (!session) return null;

    return <SettingsContent />;
}
