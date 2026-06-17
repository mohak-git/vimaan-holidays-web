import { LucideIcon } from "lucide-react";
import Link from "next/link";
import AnimatedPill from "./elements/AnimatedPill";
import { CATEGORIES, Category } from "./types";

interface TabProps {
    id: Category;
    label: string;
    icon: LucideIcon;
    active: boolean;
}

function Tab({ id, label, icon: Icon, active }: TabProps) {
    return (
        <Link
            href={`?category=${id}`}
            scroll={false}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                active ? "text-ink" : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
        >
            {active && <AnimatedPill />}
            <span
                className={`relative z-1 flex items-center gap-2  ${active ? "text-white" : "opacity-80"}`}
            >
                <Icon className="w-4 h-4" />
                {label}
            </span>
        </Link>
    );
}

interface Props {
    selected: Category;
}

export default function CategoryTabs({ selected }: Props) {
    return (
        <div className="bg-ink rounded-2xl p-2 w-full overflow-x-auto hide-scrollbar">
            <div className="flex items-center justify-start sm:justify-center min-w-max gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
                {CATEGORIES.map(({ id, label, icon }) => (
                    <Tab key={id} id={id} label={label} icon={icon} active={selected === id} />
                ))}
            </div>
        </div>
    );
}
