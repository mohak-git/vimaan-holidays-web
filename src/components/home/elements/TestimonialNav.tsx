"use client";

import { ArrowLeftIcon, ArrowRightIcon, LucideIcon } from "lucide-react";
import { ComponentProps, useRef } from "react";

type Props = { total: number };
type ButtonProps = ComponentProps<"button"> & { icon: LucideIcon };

function Button({ icon: Icon, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="flex h-10 w-20 items-center justify-center rounded-full bg-coral/80 transition-colors hover:bg-coral/60 hover:cursor-pointer 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:bg-coral/60 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Icon className="h-6 w-6 text-white" />
        </button>
    );
}

export default function TestimonialNav({ total }: Props) {
    const currentIndexRef = useRef(0);
    const handleScroll = (direction: "prev" | "next") => {
        if (direction === "next") currentIndexRef.current = (currentIndexRef.current + 1) % total;
        else currentIndexRef.current = (currentIndexRef.current - 1 + total) % total;

        const target = document.getElementById(`testimonial-card-${currentIndexRef.current}`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    return (
        <div className="z-2 flex items-center justify-center gap-4">
            <Button
                onClick={() => handleScroll("prev")}
                aria-label="Previous"
                icon={ArrowLeftIcon}
            />
            <Button onClick={() => handleScroll("next")} aria-label="Next" icon={ArrowRightIcon} />
        </div>
    );
}
