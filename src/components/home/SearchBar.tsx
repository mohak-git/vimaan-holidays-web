"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { POPULAR_SEARCH_TAGS, SEARCH_EXAMPLES } from "./constants";

function SparkleIcon() {
    return (
        <div className="ml-4 mr-2 text-coral">
            <Sparkles className="h-5 w-5" />
        </div>
    );
}

function SubmitButton() {
    return (
        <button className="group mr-4 flex items-center justify-center rounded-full bg-coral p-2 text-white transition-colors hover:bg-coral-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 duration-200" />
        </button>
    );
}

function PopularTags() {
    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-sm text-white/60">Popular:</span>
            {POPULAR_SEARCH_TAGS.map((tag) => (
                <button
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

function AnimatedPlaceholder({ isActive }: { isActive: boolean }) {
    const [exampleIndex, setExampleIndex] = useState(0);

    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(
            () => setExampleIndex((prev) => (prev + 1) % SEARCH_EXAMPLES.length),
            3000,
        );

        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
            <span className="whitespace-nowrap text-white/50">Try &quot;</span>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={exampleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="whitespace-nowrap text-white/80"
                >
                    {SEARCH_EXAMPLES[exampleIndex]}
                </motion.span>
            </AnimatePresence>
            <span className="text-white/50">&quot;</span>
        </div>
    );
}

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="z-2 mx-auto w-full max-w-3xl">
            <div
                className={`flex items-center overflow-hidden rounded-full border-2 bg-white/2 backdrop-blur-sm transition-all duration-300 ${
                    isFocused
                        ? "border-coral bg-white/10 shadow-glow"
                        : "border-white/20 hover:border-white/40 hover:bg-white/15"
                }`}
            >
                <SparkleIcon />

                <div className="relative flex h-12 flex-1 items-center">
                    <input
                        type="text"
                        className="z-1 h-full w-full bg-transparent text-lg text-white placeholder-transparent focus:outline-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    {!query && <AnimatedPlaceholder isActive={!isFocused} />}
                </div>

                <SubmitButton />
            </div>

            <PopularTags />
        </div>
    );
}
