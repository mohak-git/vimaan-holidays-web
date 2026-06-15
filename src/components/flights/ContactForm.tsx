"use client";

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { useBookingStore } from "@/store/useBookingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
    onSave: (data: ContactFormData) => void;
    defaultValues?: Partial<ContactFormData>;
}

const inputClass =
    "w-full rounded-lg border border-sand-dark px-3 py-2 text-sm bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral";

const COUNTRY_CODES = [
    { value: "+91", label: "+91 (IN)" },
    { value: "+1", label: "+1 (US)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+971", label: "+971 (UAE)" },
    { value: "+65", label: "+65 (SG)" },
];

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <div>
            <label className="block text-xs font-medium text-ink/60 mb-1">{label}</label>
            {children}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

export default function ContactForm({ onSave, defaultValues }: Props) {
    const setContactDetails = useBookingStore((s) => s.setContactDetails);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: "",
            confirmEmail: "",
            phone: "",
            countryCode: "+91",
            ...defaultValues,
        },
    });

    useEffect(() => {
        if (defaultValues) reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit = (data: ContactFormData) => {
        setContactDetails({ email: data.email, phone: data.phone, countryCode: data.countryCode });
        onSave(data);
    };

    return (
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="font-semibold font-serif text-lg">Contact Details</h3>
            <p className="text-sm text-ink/60">
                Your e-ticket and booking confirmation will be sent here
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Email *" error={errors.email?.message}>
                    <input
                        type="email"
                        {...register("email")}
                        className={inputClass}
                        placeholder="your@email.com"
                    />
                </Field>

                <Field label="Confirm Email *" error={errors.confirmEmail?.message}>
                    <input
                        type="email"
                        {...register("confirmEmail")}
                        className={inputClass}
                        placeholder="confirm@email.com"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-3">
                <Field label="Country Code">
                    <select {...register("countryCode")} className={inputClass}>
                        {COUNTRY_CODES.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Mobile Number *" error={errors.phone?.message}>
                    <input
                        type="tel"
                        {...register("phone")}
                        className={inputClass}
                        placeholder="9876543210"
                    />
                </Field>
            </div>
        </form>
    );
}
