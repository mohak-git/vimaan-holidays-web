"use client";

import { authClient } from "@/lib/auth/authClient";
import { parseDevice } from "@/lib/utils/parse-device";
import { useUserStore } from "@/store/useUserStore";
import type { ActiveDevice } from "@/types/account";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useDevices() {
    const { data: session } = authClient.useSession();
    const [activeDevices, setActiveDevices] = useState<ActiveDevice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setDevices, removeDevice } = useUserStore();

    const refresh = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data: sessions, error } = await authClient.listSessions();

            if (error) {
                toast.error(error.message || "Failed to load sessions");
                return;
            }

            if (!sessions) {
                setActiveDevices([]);
                setDevices([]);
                return;
            }

            const currentToken = session?.session?.token;

            const mapped: ActiveDevice[] = sessions.map((s) => {
                const info = parseDevice(s.userAgent);
                return {
                    id: s.id,
                    sessionToken: s.token,
                    name: info.name,
                    browser: info.browser,
                    os: info.os,
                    ip: s.ipAddress ?? "Unknown",
                    lastActive: (s.updatedAt ?? s.createdAt ?? new Date()).toISOString(),
                    isCurrent: s.token === currentToken,
                };
            });

            setActiveDevices(mapped);
            setDevices(mapped);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, [session?.session?.token, setDevices]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const revokeDevice = useCallback(
        async (sessionToken: string) => {
            const { error: revokeError } = await authClient.revokeSession({
                token: sessionToken,
            });

            if (revokeError) {
                toast.error(revokeError.message || "Failed to revoke session");
                return;
            }

            setActiveDevices((prev) => prev.filter((d) => d.sessionToken !== sessionToken));
            removeDevice(sessionToken);
        },
        [removeDevice],
    );

    return { activeDevices, isLoading, refresh, revokeDevice };
}
