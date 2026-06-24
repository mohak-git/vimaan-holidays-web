"use client";

import { AlertTriangle } from "lucide-react";

import { useScrollLock } from "@/hooks/useScrollLock";
import type { SavedTraveller } from "@/types/user";

interface DeleteConfirmModalProps {
    traveller: SavedTraveller | null;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmModal({
    traveller,
    onClose,
    onConfirm,
}: DeleteConfirmModalProps) {
    useScrollLock(!!traveller);

    if (!traveller) return null;

    return (
        <div
            className="fixed inset-0 z-5 flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex w-full max-w-md flex-col bg-white p-6 shadow-2xl">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="mb-1 font-serif text-lg font-semibold text-ink">
                            Remove traveller?
                        </h3>
                        <p className="text-sm text-ink/50">
                            Are you sure you want to remove{" "}
                            <span className="font-medium text-ink">
                                {traveller.firstName} {traveller.lastName}
                            </span>{" "}
                            from your saved travellers? This cannot be undone.
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-ink/50 transition-colors hover:bg-sand hover:text-ink"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
