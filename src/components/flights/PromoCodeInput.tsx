"use client";

import { inputClass } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import { CheckCircle, Tag, XCircle } from "lucide-react";
import { memo, useState } from "react";

interface Props {
    onApply: (code: string) => boolean;
    onRemove: () => void;
    appliedCode: string;
    discount: number;
}

const ERRORS = {
    EMPTY: "Please enter a promo code",
    INVALID: "Invalid or expired promo code",
} as const;

function AppliedState({
    code,
    discount,
    onRemove,
}: {
    code: string;
    discount: number;
    onRemove: () => void;
}) {
    return (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                        <p className="text-sm font-semibold text-green-800">Code applied!</p>
                        <p className="text-xs text-green-600">
                            {code} &mdash; {formatPrice(discount)} off
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

function PromoForm({
    code,
    error,
    onCodeChange,
    onApply,
}: {
    code: string;
    error: string;
    onCodeChange: (value: string) => void;
    onApply: () => void;
}) {
    return (
        <div>
            <h4 className="text-sm font-semibold text-ink mb-2 flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                Have a promo code?
            </h4>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => onCodeChange(e.target.value)}
                    placeholder="Enter code"
                    aria-label="Promo code"
                    className={cn(inputClass, "flex-1", error && "border-red-300")}
                />
                <button
                    type="button"
                    onClick={onApply}
                    className="px-4 py-2 bg-ink text-white rounded-lg text-sm font-medium hover:bg-ink-light transition-colors"
                >
                    Apply
                </button>
            </div>
            {error && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
}

function PromoCodeInput({ onApply, onRemove, appliedCode, discount }: Props) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleApply = () => {
        const trimmed = code.trim();
        if (!trimmed) {
            setError(ERRORS.EMPTY);
            return;
        }
        setError("");
        if (!onApply(trimmed)) {
            setError(ERRORS.INVALID);
        }
    };

    const handleRemove = () => {
        setCode("");
        setError("");
        onRemove();
    };

    if (appliedCode)
        return <AppliedState code={appliedCode} discount={discount} onRemove={handleRemove} />;

    return (
        <PromoForm
            code={code}
            error={error}
            onCodeChange={(value) => {
                setCode(value);
                setError("");
            }}
            onApply={handleApply}
        />
    );
}

export default memo(PromoCodeInput);
