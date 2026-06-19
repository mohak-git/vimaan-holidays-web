import { FEATURES } from "./constants";
import SectionHeader from "./elements/SectionHeader";
import type { Feature } from "./types";

const HEADING_ID = "feature-list-heading";

function Feature({ icon: Icon, title, body }: Feature) {
    return (
        <div className="flex flex-col items-center gap-4 p-8 rounded-lg shadow-xl">
            <div className="size-16 rounded-xl bg-coral/10 text-coral flex items-center justify-center shrink-0">
                <Icon className="size-12" strokeWidth={2} aria-hidden="true" />
            </div>

            <div className="flex flex-col text-center gap-1">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="text-sm text-ink/70">{body}</p>
            </div>
        </div>
    );
}

export default function FeatureList() {
    return (
        <section className="w-full bg-dark-sandal py-20" aria-labelledby={HEADING_ID}>
            <div className="mx-auto max-w-7xl flex flex-col gap-12 px-6">
                <SectionHeader title="Why Choose Us" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feat) => (
                        <Feature key={feat.title} {...feat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
