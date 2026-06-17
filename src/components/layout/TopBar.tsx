import { CONTACT_LINKS, SITE_TAGLINE } from "@/config/constants";
import Link from "next/link";
import { IndianFlagIcon } from "./Icons";

function Tagline() {
    return (
        <p className="hidden sm:flex items-center gap-1.5 text-xs text-sand/50">
            <IndianFlagIcon className="h-5 w-auto" />
            <span>{SITE_TAGLINE}</span>
        </p>
    );
}

function ContactLinks() {
    return (
        <nav aria-label="Support contacts" className="flex items-center gap-4">
            {CONTACT_LINKS.map(({ icon: Icon, href, label }) => (
                <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-1.5 text-xs text-sand/70 hover:text-coral transition-colors px-1 py-0.5 rounded-sm focus-visible:ring-1"
                    {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                >
                    <Icon className="size-4" />
                    <span>{label}</span>
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
                <ContactLinks />
            </div>
        </div>
    );
}
