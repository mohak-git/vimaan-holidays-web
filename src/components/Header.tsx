"use client";

import { Menu, Plane, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { NAV_LINKS } from "./constants";
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
                className={`fixed top-0 left-0 right-0 z-5 transition-all duration-300 ${
                    scrolled ? "backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo and Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg p-1"
                        aria-label="Vimaan Holidays Home"
                    >
                        <Plane className="size-8 text-coral" />
                        <span className="font-serif text-2xl text-white tracking-wide">
                            Vimaan Holidays
                        </span>
                    </Link>

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
