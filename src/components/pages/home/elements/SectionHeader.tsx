import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Cta {
    label: string;
    href: string;
}

interface Props {
    title: string;
    description: string;
    cta?: Cta;
}

export default function SectionHeader({ title, description, cta }: Props) {
    if (!cta)
        return (
            <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-10">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-ink md:max-w-1/2">
                    {title}
                </h2>
                <p className="text-ink/60 md:max-w-1/3">{description}</p>
            </div>
        );

    return (
        <div className="flex w-full flex-col items-center justify-between gap-10 md:flex-row">
            <div className="flex max-w-xl flex-col gap-5">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-ink">
                    {title}
                </h2>
                <p className="leading-[1.2] text-ink/60">{description}</p>
            </div>

            <Link
                href={cta.href}
                aria-label={cta.label}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-coral hover:bg-coral hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
                <span className="text-[14px] font-semibold tracking-[-0.02em]">{cta.label}</span>

                <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45"
                    strokeWidth={2}
                    aria-hidden="true"
                />
            </Link>
        </div>
    );
}
