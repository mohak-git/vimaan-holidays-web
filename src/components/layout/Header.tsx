"use client";

import { DOWNLOAD_LINKS, NAV_LINKS } from "@/config/constants";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-5 transition-all duration-300 print:hidden ${
                    scrolled ? "backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex gap-4 xl:gap-16 items-center">
                        <Link
                            href="/"
                            className="flex items-center shrink-0 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg p-1"
                            aria-label="Vimaan Holidays Home"
                        >
                            <Image
                                src="/vimaan-holidays.png"
                                alt="Vimaan Holidays"
                                width={200}
                                height={50}
                                className="h-10 sm:h-12 w-auto"
                            />
                        </Link>

                        {/* App Download */}
                        <div className="hidden lg:flex justify-between items-center gap-3 text-xs text-white/50">
                            <span className="whitespace-nowrap">Get the app</span>

                            <div className="flex items-center gap-2">
                                {DOWNLOAD_LINKS.map(({ label, href, icon: Icon }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 hover:text-coral transition-colors"
                                        aria-label={`Download on ${label}`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav
                        className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/90"
                        aria-label="Main Navigation"
                    >
                        {NAV_LINKS.map(({ href, icon: Icon, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="flex items-center gap-2 rounded px-2 py-1 hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                            >
                                <Icon className="size-4" />
                                <span>{label}</span>
                            </Link>
                        ))}

                        <div className="w-px h-5 bg-white/20 mx-2" aria-hidden="true" />

                        <button
                            type="button"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral cursor-pointer"
                        >
                            <User className="w-4 h-4" />
                            <span>Sign In</span>
                        </button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="lg:hidden text-white p-2 hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg cursor-pointer"
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <MobileMenu isOpen={menuOpen} handleClose={closeMenu} />
        </>
    );
}
