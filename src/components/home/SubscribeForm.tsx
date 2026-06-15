"use client";

import { Check } from "lucide-react";
import { type FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setStatus("submitting");

        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1000);
    }

    if (status === "success") {
        return (
            <div className="flex items-center gap-3 text-ink">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-coral">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden="true" />
                </div>
                <p className="text-sm font-medium">Thank you for subscribing!</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 flex-1 items-center border border-ink/15 px-6 py-4 ">
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "submitting"}
                        className="min-w-0 flex-1 border-0 text-ink outline-none placeholder:text-ink/60 disabled:opacity-50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex h-12 items-center justify-center bg-ink text-sm font-semibold text-white transition-colors hover:bg-ink-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral disabled:opacity-50 sm:w-30"
                >
                    {status === "submitting" ? "Sending..." : "Subscribe"}
                </button>
            </div>

            {error && (
                <p className="mt-2 text-sm text-coral" role="alert">
                    {error}
                </p>
            )}
        </form>
    );
}
