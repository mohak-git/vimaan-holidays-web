"use client";

import { useDevices } from "@/hooks/auth/useDevices";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Laptop, Monitor, Smartphone, X } from "lucide-react";

function deviceIcon(name: string, os: string) {
    const isMobile = /android|ios|iphone|ipad|mobile/i.test(os + name);
    return isMobile ? Smartphone : Laptop;
}

export function DevicesSection() {
    const { activeDevices, isLoading, revokeDevice } = useDevices();

    return (
        <section className="rounded-2xl border border-sand-dark bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3 pb-6">
                <Monitor className="h-5 w-5 text-coral" />
                <h2 className="font-serif text-xl font-medium text-ink">Active sessions</h2>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-16 animate-pulse rounded-xl bg-sand-dark" />
                    ))}
                </div>
            ) : activeDevices.length === 0 ? (
                <p className="text-sm text-ink/50">No active sessions found.</p>
            ) : (
                <div className="space-y-3">
                    {activeDevices.map((device) => {
                        const Icon = deviceIcon(device.name, device.os);
                        return (
                            <div
                                key={device.id}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl border p-3 transition-colors sm:gap-4 sm:p-4",
                                    device.isCurrent
                                        ? "border-coral/10 bg-coral/5"
                                        : "border-sand-dark hover:bg-sand",
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-7 w-7 items-center justify-center rounded-full sm:h-10 sm:w-10",
                                        device.isCurrent
                                            ? "bg-coral/10 text-coral"
                                            : "bg-sand text-ink/50",
                                    )}
                                >
                                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="truncate text-sm font-medium text-ink">
                                            {device.name}{" "}
                                            <span className="text-ink/40">&middot;</span>{" "}
                                            {device.browser}
                                        </p>

                                        {!device.isCurrent && (
                                            <button
                                                onClick={() => revokeDevice(device.sessionToken)}
                                                className="ml-auto shrink-0 rounded-lg p-1 text-ink/30 transition-colors hover:bg-red-50 hover:text-red-500"
                                                title="Revoke session"
                                            >
                                                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            </button>
                                        )}
                                    </div>

                                    <p className="mt-0.5 truncate text-xs">
                                        {device.isCurrent ? (
                                            <span className="font-medium text-green-600">
                                                Current session
                                            </span>
                                        ) : (
                                            <span className="text-ink/50">
                                                <span className="hidden sm:inline">
                                                    {device.ip} &middot;{" "}
                                                </span>
                                                {formatDistanceToNow(new Date(device.lastActive), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
