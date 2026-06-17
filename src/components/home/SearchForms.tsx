"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ComponentType } from "react";
import BookingCardSkeleton from "./BookingCardSkeleton";
import type { Category } from "./types";

const FORM_IMPORTS: Record<Category, () => Promise<{ default: ComponentType }>> = {
    flight: () => import("./forms/FlightsForm"),
    hotel: () => import("./forms/HotelsForm"),
    bus: () => import("./forms/BusesForm"),
    cab: () => import("./forms/CabsForm"),
    tour: () => import("./forms/ToursForm"),
    activity: () => import("./forms/ActivitiesForm"),
    visa: () => import("./forms/VisaForm"),
    cruise: () => import("./forms/CruiseForm"),
};

export default function SearchForms({ category }: { category: Category }) {
    const [Form, setForm] = useState<ComponentType | null>(null);

    useEffect(() => {
        let active = true;
        setForm(null);

        FORM_IMPORTS[category]().then(({ default: Form }) => {
            if (active) setForm(() => Form);
        });

        return () => {
            active = false;
        };
    }, [category]);

    if (!Form) return <BookingCardSkeleton />;

    return (
        <div className="relative min-h-35 flex flex-col justify-center w-full">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="w-full"
                >
                    <Form />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
