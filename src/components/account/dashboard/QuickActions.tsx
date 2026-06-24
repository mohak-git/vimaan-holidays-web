"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { QUICK_ACTIONS } from "../constants";

const QuickActions = memo(function QuickActions() {
    return (
        <div className="relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-ink p-6 text-white shadow-soft">
            <h3 className="mb-4 font-serif text-xl">Quick Actions</h3>
            <div className="relative z-1 space-y-3">
                {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 text-sm transition-colors hover:bg-white/20"
                    >
                        <span className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-coral/80" />
                            <span>{label}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-50" />
                    </Link>
                ))}
            </div>
        </div>
    );
});

export default QuickActions;
