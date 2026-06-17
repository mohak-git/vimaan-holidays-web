import { FOOTER_BRAND_LOGOS } from "@/components/home/constants";
import { LEGAL_LINKS, NAV_COLUMNS, SOCIAL_LINKS } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-ink text-sand pt-16 pb-10 print:hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                    {/* Brand and socials */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg p-1"
                            aria-label="Vimaan Holidays Home"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Vimaan Holidays"
                                width={200}
                                height={50}
                                className="h-10 sm:h-20 w-auto"
                            />
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

                <div className="relative flex items-center justify-center pt-8">
                    <div className="absolute inset-x-0 bottom-1/2 h-px bg-white/10" />

                    <Link
                        href="https://digicraft.one"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-1 flex items-center gap-1 bg-ink px-5"
                    >
                        <span className="text-[8px] uppercase tracking-widest text-sand/30 group-hover:text-coral transition-colors duration-500">
                            Designed &amp; developed by
                        </span>

                        <Image
                            src="/logo.svg"
                            alt="DigiCraft"
                            width={80}
                            height={20}
                            className="h-4 group-hover:h-6 w-auto transition-all duration-300"
                        />
                    </Link>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sand/40 md:*:w-1/3">
                    <p>&copy; 2026 Vimaan Holidays. All rights reserved.</p>

                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        {FOOTER_BRAND_LOGOS.map(({ brand, src }) => (
                            <Image
                                key={brand}
                                src={src}
                                alt={brand}
                                width={100}
                                height={30}
                                className="h-8 w-auto"
                            />
                        ))}
                    </div>

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
