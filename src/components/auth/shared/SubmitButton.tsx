import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading: boolean;
    loadingText: string;
};

export default function SubmitButton({
    children,
    loading,
    loadingText,
    disabled,
    className,
    ...props
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className={cn(
                "w-full rounded-xl bg-coral px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-coral-hover focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:opacity-50",
                className,
            )}
            {...props}
        >
            {loading ? loadingText || "Loading..." : children}
        </button>
    );
}
