"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { AccountMobileTopBar, AccountSidebar } from "./AccountSidebar";

export default function Layout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const openMenu = useCallback(() => setMobileOpen(true), []);
    const closeMenu = useCallback(() => setMobileOpen(false), []);

    return (
        <div className="min-h-screen bg-sand">
            <AccountMobileTopBar onMenuOpen={openMenu} />

            <div className="flex">
                <AccountSidebar mobileOpen={mobileOpen} onMobileClose={closeMenu} />

                <main className="flex-1 min-h-screen">
                    <div className="max-w-7xl h-full mx-auto py-6 px-4 md:px-8 lg:py-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}
