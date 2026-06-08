"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plane, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { NAV_LINKS } from "./constants";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

export default function MobileMenu({ isOpen, handleClose }: Props) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, handleClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            closeRef.current?.focus();
        } else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-5 lg:hidden" ref={drawerRef}>
                    <motion.div
                        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        aria-hidden="true"
                    />

                    <motion.nav
                        className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-ink/95 backdrop-blur-md flex flex-col"
                        variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                        aria-label="Mobile Navigation"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <Link
                                href="/"
                                className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg p-1"
                                aria-label="Vimaan Holidays Home"
                                onClick={handleClose}
                            >
                                <Plane className="size-6 text-coral" />
                                <span className="font-serif text-lg text-white tracking-wide">
                                    Vimaan Holidays
                                </span>
                            </Link>

                            <button
                                ref={closeRef}
                                type="button"
                                onClick={handleClose}
                                className="p-2 text-white hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral cursor-pointer"
                                aria-label="Close menu"
                            >
                                <X className="size-6" />
                            </button>
                        </div>

                        <div className="flex flex-col justify-around h-60 px-4">
                            {NAV_LINKS.map(({ label, icon: Icon, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="flex items-center gap-3 border-b px-3 py-3 text-white/90 hover:text-coral hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                                    onClick={handleClose}
                                >
                                    <Icon className="size-4 shrink-0" />
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>

                        <div className="absolute bottom-0 w-full px-5 py-4 border-t border-white/10">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white px-4 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <User className="size-4" />
                                <span>Sign In</span>
                            </button>
                        </div>
                    </motion.nav>
                </div>
            )}
        </AnimatePresence>
    );
}
