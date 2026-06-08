import { TESTIMONIALS } from "./constants";
import SectionHeader from "./elements/SectionHeader";
import TestimonialCard from "./elements/TestimonialCard";
import TestimonialNav from "./elements/TestimonialNav";

const HEADING_ID = "testimonials-heading";

export default function Testimonials() {
    return (
        <section className="w-full bg-blue-50 py-20" aria-labelledby={HEADING_ID}>
            <div className="mx-auto max-w-7xl flex flex-col items-center gap-12 px-6">
                <SectionHeader
                    title="What Our Travelers Are Saying"
                    description="See what our travelers have to say about their unforgettable experiences with us. Let their stories inspire your next adventure!"
                />

                <div
                    className="flex w-full gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
                    tabIndex={-1}
                >
                    {TESTIMONIALS.map((test, i) => (
                        <TestimonialCard key={`${test.name}-${i}`} testimonial={test} index={i} />
                    ))}
                </div>

                <TestimonialNav total={TESTIMONIALS.length} />
            </div>
        </section>
    );
}
