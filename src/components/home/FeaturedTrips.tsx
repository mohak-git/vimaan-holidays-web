import Image from "next/image";
import { FEATURED_TRIPS } from "./constants";
import SectionHeader from "./elements/SectionHeader";
import TripPolaroid from "./elements/TripPolaroid";

const HEADING_ID = "featured-trips-heading";
const BG_IMG_URL =
    "https://img.magnific.com/free-photo/wooden-bridge-koh-nangyuan-island-surat-thani-thailand_335224-1082.jpg?t=st=1781714240~exp=1781717840~hmac=ffdcb965d50b0c17ff55149a4414cea7a63320cf0bce70277063d260d937e682&w=5000";

export default function FeaturedTrips() {
    return (
        <section className="relative w-full overflow-hidden py-20" aria-labelledby={HEADING_ID}>
            <Image
                src={BG_IMG_URL}
                alt="Beautiful mountain landscape"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 z-0 object-cover object-center"
            />

            <div className="relative z-1 mx-auto flex max-w-7xl flex-col gap-16 px-6">
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
