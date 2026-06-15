import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const inputClass =
    "w-full rounded-lg border border-sand-dark px-3 py-2 text-sm bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral";

interface FieldProps {
    label: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}

export function Field({ label, error, required, className, children }: FieldProps) {
    return (
        <div className={cn(className)}>
            <label className="block text-xs font-medium text-ink/60 mb-1">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
