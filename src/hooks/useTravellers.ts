"use client";

import type { TravellerFormData } from "@/lib/schemas/traveller";
import { useUserStore } from "@/store/useUserStore";
import type { SavedTraveller } from "@/types/user";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useTravellers() {
    const { savedTravellers, addTraveller, updateTraveller, removeTraveller } = useUserStore();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<SavedTraveller | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<SavedTraveller | null>(null);

    const openAdd = useCallback(() => {
        setEditing(null);
        setFormOpen(true);
    }, []);

    const openEdit = useCallback((traveller: SavedTraveller) => {
        setEditing(traveller);
        setFormOpen(true);
    }, []);

    const openDelete = useCallback((traveller: SavedTraveller) => {
        setDeleteTarget(traveller);
    }, []);

    const closeForm = useCallback(() => {
        setFormOpen(false);
        setEditing(null);
    }, []);

    const closeDelete = useCallback(() => {
        setDeleteTarget(null);
    }, []);

    const handleSave = useCallback(
        (data: TravellerFormData) => {
            if (editing) {
                updateTraveller(editing.id, data);
                toast.success(`${data.firstName} ${data.lastName} updated.`);
            } else {
                addTraveller({ id: crypto.randomUUID(), ...data });
                toast.success(`${data.firstName} ${data.lastName} added.`);
            }
            closeForm();
        },
        [editing, addTraveller, updateTraveller, closeForm],
    );

    const handleDeleteConfirm = useCallback(() => {
        if (!deleteTarget) return;
        removeTraveller(deleteTarget.id);
        toast.success(`${deleteTarget.firstName} ${deleteTarget.lastName} removed.`);
        closeDelete();
    }, [deleteTarget, removeTraveller, closeDelete]);

    return {
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
    };
}
