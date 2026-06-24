"use client";

import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types/account";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
    faqs: FAQItem[];
}

export default function FAQs({ faqs }: Props) {
    const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

    return (
        <section>
            <h2 className="font-serif text-2xl font-medium text-ink">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-3">
                {faqs.map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                        <div
                            key={faq.id}
                            className="overflow-hidden rounded-xl border border-sand-dark bg-white shadow-sm"
                        >
                            <button
                                type="button"
                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                                className="flex w-full items-center justify-between px-5 py-4 text-left focus-visible:outline-none"
                            >
                                <span className="font-medium text-ink">{faq.question}</span>
                                <ChevronDown
                                    className={cn(
                                        "size-5 shrink-0 text-ink/40 transition-transform duration-200",
                                        isOpen && "rotate-180",
                                    )}
                                />
                            </button>
                            <div
                                className={cn(
                                    "grid transition-all duration-200",
                                    isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0",
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="border-t border-sand-dark px-5 pb-4 pt-3 text-sm leading-relaxed text-ink/60">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
