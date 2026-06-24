"use client";

import type { SavedTraveller } from "@/types/user";
import { Edit2, Trash2 } from "lucide-react";

interface TravellerCardProps {
    traveller: SavedTraveller;
    onEdit: (traveller: SavedTraveller) => void;
    onDelete: (traveller: SavedTraveller) => void;
}

export default function TravellerCard({ traveller, onEdit, onDelete }: TravellerCardProps) {
    return (
        <div className="flex flex-col rounded-2xl border border-sand-dark bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral/10 font-serif text-lg font-medium text-coral">
                        {traveller.firstName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-ink">
                            {traveller.title} {traveller.firstName} {traveller.lastName}
                        </h3>
                        <p className="text-sm text-ink/50">
                            {traveller.gender} &middot; {traveller.nationality}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        aria-label={`Edit ${traveller.firstName}`}
                        title={`Edit ${traveller.firstName}`}
                        onClick={() => onEdit(traveller)}
                        className="rounded-lg p-2 text-ink/40 transition-colors hover:bg-coral/5 hover:text-coral"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        aria-label={`Remove ${traveller.firstName}`}
                        title={`Remove ${traveller.firstName}`}
                        onClick={() => onDelete(traveller)}
                        className="rounded-lg p-2 text-ink/40 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-auto border-t border-sand-dark pt-4 text-sm text-ink/40">
                DOB:{" "}
                {new Date(traveller.dateOfBirth).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </div>
        </div>
    );
}
