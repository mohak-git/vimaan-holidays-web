import { FEATURED_TRIPS } from "./constants";
import SectionHeader from "./elements/SectionHeader";
import TripPolaroid from "./elements/TripPolaroid";

const HEADING_ID = "featured-trips-heading";

export default function FeaturedTrips() {
    return (
        <section className="w-full py-20 bg-blue-50" aria-labelledby={HEADING_ID}>
            <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6">
                <SectionHeader
                    title="Journeys handpicked for you"
                    description="Browse our most loved itineraries. From alpine adventures to serene beach escapes, your next great story starts here."
                    cta={{ label: "View All Trips", href: "#" }}
                />

                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6 place-items-center">
                    {FEATURED_TRIPS.map((trip, idx) => (
                        <TripPolaroid
                            key={`${trip.title}-${trip.location}-${idx}`}
                            index={idx}
                            trip={trip}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
