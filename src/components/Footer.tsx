import { Plane } from "lucide-react";
import Link from "next/link";
import { LEGAL_LINKS, NAV_COLUMNS, SOCIAL_LINKS } from "./constants";

export default function Footer() {
    return (
        <footer className="bg-ink text-sand pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                    {/* Brand and socials */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg p-1"
                            aria-label="Vimaan Holidays Home"
                        >
                            <Plane className="size-8 text-coral" />
                            <span className="font-serif text-2xl font-medium text-white tracking-wide">
                                Vimaan Holidays
                            </span>
                        </Link>

                        <p className="text-sand/60 text-sm leading-relaxed max-w-sm mb-8">
                            Reimagining how the world travels. Discover, plan, and book your entire
                            journey in one seamless experience.
                        </p>

                        <div className="flex items-center gap-4">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                                >
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Nav columns */}
                    {NAV_COLUMNS.map(({ title, links }) => (
                        <nav key={title} aria-label={title}>
                            <h4 className="font-serif text-lg mb-6 px-2">{title}</h4>
                            <ul className="space-y-3 text-sm text-sand/60">
                                {links.map(({ label, href }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coral px-2 py-1"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sand/40">
                    <p>&copy; 2026 Vimaan Holidays. All rights reserved.</p>
                    <nav className="flex items-center gap-6" aria-label="Legal">
                        {LEGAL_LINKS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="hover:text-sand transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coral px-2 py-1"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
