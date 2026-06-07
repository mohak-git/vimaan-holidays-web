import { POPULAR_DESTINATIONS as Destinations } from "./constants";
import DestinationCard from "./elements/DestinationCard";
import SectionHeader from "./elements/SectionHeader";

const HEADING_ID = "popular-destinations-heading";

export default function PopularDestinations() {
    return (
        <section className="w-full bg-white/90 py-20" aria-labelledby={HEADING_ID}>
            <div className="mx-auto max-w-7xl flex flex-col gap-12 px-6">
                <SectionHeader
                    title="Explore Popular Destinations"
                    description="Find your next adventure with Vimaan Holidays. From relaxing retreats to exciting explorations, we've got the perfect destination for you!"
                    cta={{ label: "Browse All Destination", href: "#" }}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Destinations.map((dest, idx) => {
                        const spanClassName = [0, Destinations.length - 1].includes(idx)
                            ? "sm:col-span-2"
                            : "";

                        return (
                            <DestinationCard
                                key={`${dest.title}-${dest.location}-${idx}`}
                                destination={dest}
                                className={spanClassName}
                                priority={idx === 0}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
