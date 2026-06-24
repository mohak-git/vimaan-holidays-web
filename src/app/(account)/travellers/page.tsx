"use client";

import DeleteConfirmModal from "@/components/account/travellers/DeleteConfirmModal";
import TravellerCard from "@/components/account/travellers/TravellerCard";
import TravellerFormModal from "@/components/account/travellers/TravellerFormModal";
import TravellersSkeleton from "@/components/account/travellers/TravellersSkeleton";
import { useTravellers } from "@/hooks/useTravellers";
import { authClient } from "@/lib/auth/authClient";
import type { SavedTraveller } from "@/types/user";
import { AnimatePresence } from "framer-motion";
import { Plus, Users } from "lucide-react";

interface TravellersContentProps {
    travellers: SavedTraveller[];
    onOpenAdd: () => void;
    onOpenEdit: (t: SavedTraveller) => void;
    onOpenDelete: (t: SavedTraveller) => void;
}

function EmptyState() {
    return (
        <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coral/10">
                <Users className="h-8 w-8 text-coral" />
            </div>
            <h3 className="mb-1 font-serif text-xl font-medium text-ink">No saved travellers</h3>
            <p className="mx-auto mb-6 max-w-sm text-sm text-ink/50">
                Add travellers you frequently travel with to make booking faster.
            </p>
        </div>
    );
}

function TravellersContent({
    travellers,
    onOpenAdd,
    onOpenEdit,
    onOpenDelete,
}: TravellersContentProps) {
    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                        Saved Travellers
                    </h1>
                    <p className="mt-1 text-ink/50">
                        Manage details of people you frequently travel with.
                    </p>
                </div>

                <button
                    onClick={onOpenAdd}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-hover"
                >
                    <Plus className="h-4 w-4" />
                    Add Traveller
                </button>
            </header>

            {travellers.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {travellers.map((traveller) => (
                            <TravellerCard
                                key={traveller.id}
                                traveller={traveller}
                                onEdit={onOpenEdit}
                                onDelete={onOpenDelete}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default function TravellersPage() {
    const { data: session, isPending } = authClient.useSession();
    const {
        savedTravellers,
        formOpen,
        editing,
        deleteTarget,
        openAdd,
        openEdit,
        openDelete,
        closeForm,
        closeDelete,
        handleSave,
        handleDeleteConfirm,
    } = useTravellers();

    if (isPending) return <TravellersSkeleton />;
    if (!session) return null;

    return (
        <>
            <TravellersContent
                travellers={savedTravellers}
                onOpenAdd={openAdd}
                onOpenEdit={openEdit}
                onOpenDelete={openDelete}
            />

            <TravellerFormModal
                open={formOpen}
                editing={editing}
                onClose={closeForm}
                onSave={handleSave}
            />

            <DeleteConfirmModal
                traveller={deleteTarget}
                onClose={closeDelete}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
}
