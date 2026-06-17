import { CONTACT_LINKS, PROMO_LINKS, SITE_TAGLINE } from "@/config/constants";
import type { QuickLink } from "@/config/types";
import Link from "next/link";
import { IndianFlagIcon } from "./Icons";

interface LinkProps {
    links: readonly QuickLink[];
    label: string;
}

function Tagline() {
    return (
        <p className="hidden sm:flex items-center gap-1.5 text-xs text-sand/50">
            <IndianFlagIcon className="h-5 w-auto" />
            <span>{SITE_TAGLINE}</span>
        </p>
    );
}

function Links({ links, label }: LinkProps) {
    return (
        <nav aria-label={label} className="flex items-center gap-4">
            {links.map(({ icon: Icon, href, label, shortLabel }) => (
                <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-1.5 text-[10px] sm:text-xs text-sand/70 hover:text-coral transition-colors px-1 py-0.5 rounded-sm focus-visible:ring-1"
                    {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                >
                    <Icon className="size-3.5 sm:size-4" />
                    <span className="sm:hidden">{shortLabel}</span>
                    <span className="hidden sm:inline">{label}</span>
                </Link>
            ))}
        </nav>
    );
}

export default function TopBar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-4 bg-ink h-8">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
                <Tagline />

                <div className="flex items-center gap-4">
                    <Links links={CONTACT_LINKS} label="Support contacts" />
                    <span className="h-4 w-px bg-white/20" aria-hidden="true" />
                    <Links links={PROMO_LINKS} label="Offers" />
                </div>
            </div>
        </div>
    );
}
