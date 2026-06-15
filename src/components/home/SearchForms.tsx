"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { type ComponentType } from "react";
import { type Category } from "./types";

const FORMS: Record<Category, ComponentType> = {
    flight: dynamic(() => import("./forms/FlightsForm"), { ssr: false }),
    hotel: dynamic(() => import("./forms/HotelsForm"), { ssr: false }),
    bus: dynamic(() => import("./forms/BusesForm"), { ssr: false }),
    cab: dynamic(() => import("./forms/CabsForm"), { ssr: false }),
    tour: dynamic(() => import("./forms/ToursForm"), { ssr: false }),
    activity: dynamic(() => import("./forms/ActivitiesForm"), { ssr: false }),
    visa: dynamic(() => import("./forms/VisaForm"), { ssr: false }),
    cruise: dynamic(() => import("./forms/CruiseForm"), { ssr: false }),
};

interface Props {
    category: Category;
}

export default function SearchForms({ category }: Props) {
    const ActiveForm = FORMS[category] ?? FORMS.flight;

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
                    <ActiveForm />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
