"use client";

import { formatPrice } from "@/lib/utils/formatPrice";
import { Percent, Tag, X } from "lucide-react";
import { useState } from "react";

interface PromoCodeInputProps {
    onApply: (code: string) => boolean;
    onRemove: () => void;
    appliedCode: string;
    discount: number;
}

export function PromoCodeInput({ onApply, onRemove, appliedCode, discount }: PromoCodeInputProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleApply = () => {
        if (!code.trim()) return;
        const valid = onApply(code.trim());
        if (valid) {
            setCode("");
            setError("");
        } else {
            setError("Invalid or expired promo code");
        }
    };

    if (appliedCode) {
        return (
            <div>
                <h3 className="font-semibold font-serif text-lg mb-3 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-coral" />
                    Promo Code
                </h3>
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">{appliedCode}</span>
                        <span className="text-xs text-green-600">
                            &minus;{formatPrice(discount)}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="p-1 hover:bg-green-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                    >
                        <X className="w-4 h-4 text-green-600" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h3 className="font-semibold font-serif text-lg mb-3 flex items-center gap-2">
                <Percent className="w-5 h-5 text-coral" />
                Promo Code
            </h3>
            <div className="flex gap-2">
                <div className="flex-1">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            setError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleApply()}
                        placeholder="Enter promo code"
                        className="w-full rounded-lg border border-sand-dark px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                    />
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>
                <button
                    type="button"
                    onClick={handleApply}
                    className="px-4 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}
