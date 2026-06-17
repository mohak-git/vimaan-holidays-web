"use client";

import UserButton from "@/components/auth/UserButton";
import { DOWNLOAD_LINKS, NAV_LINKS } from "@/config/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

export default function MobileMenu({ isOpen, handleClose }: Props) {
    const closeRef = useRef<HTMLButtonElement>(null);

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
                <div className="fixed inset-0 z-5 lg:hidden">
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
                        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                            <Link
                                href="/"
                                className="flex items-center gap-2 rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                                aria-label="Vimaan Holidays Home"
                                onClick={handleClose}
                            >
                                <Image
                                    src="/logo.svg"
                                    alt="Vimaan Holidays"
                                    width={200}
                                    height={50}
                                    className="h-10 w-auto"
                                />
                            </Link>

                            <button
                                ref={closeRef}
                                type="button"
                                onClick={handleClose}
                                className="cursor-pointer p-2 text-white transition-colors hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                                aria-label="Close menu"
                            >
                                <X className="size-6" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1 px-4 pt-4">
                            {NAV_LINKS.map(({ label, icon: Icon, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-coral bg-white/5 transition-colors hover:bg-transparent hover:text-white/90 "
                                    onClick={handleClose}
                                >
                                    <Icon className="size-4 shrink-0" />
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto p-4">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                                    <Download className="size-3" />
                                    Get the App
                                </p>
                                <div className="flex gap-4">
                                    {DOWNLOAD_LINKS.map(({ label, href, icon: Icon }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-coral px-4 py-2 text-sm transition-all duration-300 hover:border-coral/40 hover:bg-coral/10 hover:text-white"
                                            onClick={handleClose}
                                        >
                                            <Icon className="h-4 w-4 text-coral" />
                                            <span className="font-medium">{label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 px-5 py-4">
                            <UserButton variant="mobile" />
                        </div>
                    </motion.nav>
                </div>
            )}
        </AnimatePresence>
    );
}
