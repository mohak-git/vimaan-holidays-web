"use client";

import { motion } from "framer-motion";

export default function AnimatedPill() {
    return (
        <motion.div
            layoutId="category-pill"
            className="absolute inset-0 bg-coral rounded-full shadow-sm"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
    );
}
