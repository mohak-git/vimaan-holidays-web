"use client";

import { Field, inputClass } from "@/components/ui/Field";
import { useScrollLock } from "@/hooks/useScrollLock";
import { travellerSchema, type TravellerFormData } from "@/lib/schemas/traveller";
import { cn } from "@/lib/utils";
import { GENDER_OPTIONS, TITLE_OPTIONS } from "@/types/person";
import type { SavedTraveller } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const DEFAULT_VALUES: TravellerFormData = {
    title: "Mr",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "Male",
    nationality: "Indian",
};

interface TravellerFormModalProps {
    open: boolean;
    editing: SavedTraveller | null;
    onClose: () => void;
    onSave: (data: TravellerFormData) => void;
}

export default function TravellerFormModal({
    open,
    editing,
    onClose,
    onSave,
}: TravellerFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TravellerFormData>({
        resolver: zodResolver(travellerSchema),
        defaultValues: DEFAULT_VALUES,
    });

    useScrollLock(open);

    useEffect(() => {
        if (open) reset((editing ?? DEFAULT_VALUES) as TravellerFormData);
    }, [open, editing, reset]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-5 flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex w-full max-w-lg flex-col bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-sand-dark px-5 py-4">
                    <h3 className="font-serif text-lg font-semibold text-ink">
                        {editing ? "Edit Traveller" : "Add Traveller"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-ink/40 transition-colors hover:bg-sand hover:text-ink"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSave)}
                    className="space-y-4 overflow-y-auto px-5 py-4"
                >
                    <Field label="Title" error={errors.title?.message} required>
                        <select className={inputClass} {...register("title")}>
                            {TITLE_OPTIONS.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="First Name" error={errors.firstName?.message} required>
                            <input className={inputClass} {...register("firstName")} />
                        </Field>
                        <Field label="Last Name" error={errors.lastName?.message} required>
                            <input className={inputClass} {...register("lastName")} />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Gender" error={errors.gender?.message} required>
                            <select className={inputClass} {...register("gender")}>
                                {GENDER_OPTIONS.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Nationality" error={errors.nationality?.message} required>
                            <input className={inputClass} {...register("nationality")} />
                        </Field>
                    </div>

                    <Field label="Date of Birth" error={errors.dateOfBirth?.message} required>
                        <input type="date" className={inputClass} {...register("dateOfBirth")} />
                    </Field>

                    <div className="flex items-center justify-end gap-3 border-t pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-ink/50 transition-colors hover:bg-sand hover:text-ink"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={cn(
                                "rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors",
                                "bg-coral hover:bg-coral-hover",
                            )}
                        >
                            {editing ? "Save Changes" : "Add Traveller"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
