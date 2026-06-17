"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export type ResetStep = "email" | "reset" | "email-sent" | "success";

export function useResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [sent, setSent] = useState(false);

    function onSent() {
        setSent(true);
    }

    const step: ResetStep = token ? (sent ? "success" : "reset") : sent ? "email-sent" : "email";

    return { token, step, onSent };
}
