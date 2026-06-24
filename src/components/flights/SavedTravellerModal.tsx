"use client";

import { useScrollLock } from "@/hooks/useScrollLock";
import type { SavedTraveller } from "@/types/user";
import { UserCheck, X } from "lucide-react";
import { useRef } from "react";

interface Props {
    travellers: SavedTraveller[];
    open: boolean;
    onClose: () => void;
    onSelect: (traveller: SavedTraveller) => void;
}

export default function SavedTravellerModal({ travellers, open, onClose, onSelect }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useScrollLock(open);

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-5 flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => e.target === overlayRef.current && onClose()}
        >
            <div className="bg-white w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-sand-dark">
                    <h3 className="font-semibold font-serif text-lg">Saved Travellers</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-sand rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    {travellers.length === 0 ? (
                        <p className="text-sm text-ink/50 text-center py-8">
                            No saved travellers found
                        </p>
                    ) : (
                        travellers.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => onSelect(t)}
                                className="w-full text-left border border-sand-dark rounded-xl p-4 hover:border-coral/50 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                                        <UserCheck className="w-5 h-5 text-coral" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">
                                            {t.title} {t.firstName} {t.lastName}
                                        </p>
                                        <p className="text-xs text-ink/50">
                                            {t.nationality} &middot; DOB: {t.dateOfBirth}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
