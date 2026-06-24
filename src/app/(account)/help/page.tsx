"use client";

import FAQs from "@/components/account/help/FAQs";
import HelpArticles from "@/components/account/help/HelpArticles";
import SupportChannels from "@/components/account/help/SupportChannels";
import { inputClass } from "@/components/ui/Field";
import { authClient } from "@/lib/auth/authClient";
import { getFAQs, getHelpArticles, searchFAQs, searchHelpArticles } from "@/lib/services/account";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

function HelpSkeleton() {
    return (
        <div className="space-y-8" aria-hidden>
            <div className="mx-auto max-w-2xl space-y-3 text-center">
                <div className="mx-auto h-9 w-72 animate-pulse rounded-lg bg-sand-dark" />
                <div className="mx-auto h-14 w-full animate-pulse rounded-xl bg-sand-dark" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-52 animate-pulse rounded-2xl bg-sand-dark" />
                ))}
            </div>
            <div className="h-6 w-48 animate-pulse rounded bg-sand-dark" />
            <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 animate-pulse rounded-xl bg-sand-dark" />
                ))}
            </div>
            <div className="h-6 w-48 animate-pulse rounded bg-sand-dark" />
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded-xl bg-sand-dark" />
                ))}
            </div>
        </div>
    );
}

function HelpContent() {
    const [query, setQuery] = useState("");

    const lowerQuery = query.toLowerCase().trim();
    const hasQuery = lowerQuery.length > 0;

    const filteredArticles = useMemo(
        () => (hasQuery ? searchHelpArticles(lowerQuery) : getHelpArticles()),
        [lowerQuery, hasQuery],
    );

    const filteredFaqs = useMemo(
        () => (hasQuery ? searchFAQs(lowerQuery) : getFAQs()),
        [lowerQuery, hasQuery],
    );

    const showEmpty = hasQuery && filteredArticles.length === 0 && filteredFaqs.length === 0;

    return (
        <div className="mx-auto max-w-7xl space-y-12">
            <header className="mx-auto max-w-2xl text-center">
                <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                    How can we help you?
                </h1>
                <div className="relative mt-4">
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink/40" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for articles, topics, or questions..."
                        className={cn(inputClass, "h-14 rounded-xl pl-12 pr-4 text-base shadow-sm")}
                    />
                </div>
            </header>

            <SupportChannels />

            {filteredArticles.length > 0 && <HelpArticles articles={filteredArticles} />}
            {filteredFaqs.length > 0 && <FAQs faqs={filteredFaqs} />}

            {showEmpty && (
                <p className="py-12 text-center text-ink/40">
                    No results found for &ldquo;{query}&rdquo;. Try a different search term.
                </p>
            )}
        </div>
    );
}

export default function HelpPage() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <HelpSkeleton />;
    if (!session) return null;

    return <HelpContent />;
}
