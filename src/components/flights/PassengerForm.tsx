"use client";

import { Field, inputClass } from "@/components/ui/Field";
import { passengerSchema, type PassengerFormData } from "@/lib/schemas/passenger";
import type { PassengerType } from "@/types/flights/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface Props {
    type: PassengerType;
    index: number;
    formId: string;
    fareType: string;
    onSave: (data: PassengerFormData) => void;
    onDelete?: () => void;
    canDelete?: boolean;
    onFillFromSaved?: () => void;
    defaultValues?: Partial<PassengerFormData>;
}

const TITLES = ["Mr", "Ms", "Mrs", "Dr"] as const;
const GENDERS = ["Male", "Female", "Other"] as const;

const TYPE_LABEL: Record<PassengerType, string> = {
    adult: "Adult",
    child: "Child",
    infant: "Infant",
};

export default function PassengerForm({
    type,
    index,
    formId,
    fareType,
    onSave,
    onDelete,
    canDelete,
    onFillFromSaved,
    defaultValues,
}: Props) {
    const prevRef = useRef(defaultValues);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PassengerFormData>({
        resolver: zodResolver(passengerSchema),
        defaultValues: {
            title: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            nationality: "Indian",
            phone: "",
            email: "",
            studentId: "",
            serviceId: "",
            ...defaultValues,
        },
    });

    useEffect(() => {
        if (!defaultValues) return;

        const changed =
            prevRef.current?.title !== defaultValues.title ||
            prevRef.current?.firstName !== defaultValues.firstName ||
            prevRef.current?.lastName !== defaultValues.lastName ||
            prevRef.current?.dateOfBirth !== defaultValues.dateOfBirth ||
            prevRef.current?.gender !== defaultValues.gender ||
            prevRef.current?.nationality !== defaultValues.nationality;

        if (changed) {
            reset(defaultValues);
            prevRef.current = defaultValues;
        }
    }, [defaultValues, reset]);

    return (
        <form id={formId} onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold font-serif text-lg">
                    {TYPE_LABEL[type]} {index + 1}
                </h3>
                <div className="flex items-center gap-2">
                    {onFillFromSaved && (
                        <button
                            type="button"
                            onClick={onFillFromSaved}
                            className="text-xs text-coral hover:text-coral-hover font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg px-2 py-1 transition-colors"
                        >
                            Fill from saved
                        </button>
                    )}
                    {onDelete && canDelete && (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="p-1.5 text-ink/40 hover:text-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg"
                            aria-label={`Remove ${TYPE_LABEL[type]} ${index + 1}`}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Field label="Title" error={errors.title?.message} required>
                    <select {...register("title")} className={inputClass}>
                        <option value="">Select</option>
                        {TITLES.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="First Name" error={errors.firstName?.message} required>
                    <input {...register("firstName")} className={inputClass} />
                </Field>

                <Field label="Last Name" error={errors.lastName?.message} required>
                    <input {...register("lastName")} className={inputClass} />
                </Field>

                <Field label="Gender" error={errors.gender?.message} required>
                    <select {...register("gender")} className={inputClass}>
                        <option value="">Select</option>
                        {GENDERS.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Date of Birth" error={errors.dateOfBirth?.message} required>
                    <input type="date" {...register("dateOfBirth")} className={inputClass} />
                </Field>

                <Field label="Nationality" error={errors.nationality?.message} required>
                    <input {...register("nationality")} className={inputClass} />
                </Field>

                <Field label="Phone" error={errors.phone?.message}>
                    <input {...register("phone")} className={inputClass} />
                </Field>
            </div>

            {fareType === "student" && (
                <Field label="Student ID" error={errors.studentId?.message} required>
                    <input
                        {...register("studentId")}
                        placeholder="Enter your student ID number"
                        className={inputClass}
                    />
                </Field>
            )}

            {fareType === "army" && (
                <Field label="Service ID" error={errors.serviceId?.message} required>
                    <input
                        {...register("serviceId")}
                        placeholder="Enter your service ID number"
                        className={inputClass}
                    />
                </Field>
            )}
        </form>
    );
}
