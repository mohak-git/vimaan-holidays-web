"use client";

import LoaderAnimation from "@/components/ui/LoaderAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-10 flex items-center justify-center bg-white"
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                    <motion.div
                        className="size-80"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <LoaderAnimation />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
