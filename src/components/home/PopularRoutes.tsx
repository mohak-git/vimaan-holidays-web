import { POPULAR_ROUTES } from "./constants";
import RouteTicket from "./elements/RouteTicket";
import SectionHeader from "./elements/SectionHeader";

const HEADING_ID = "popular-routes-heading";

export default function PopularRoutes() {
    return (
        <section className="w-full bg-dark-sandal py-20" aria-labelledby={HEADING_ID}>
            <div className="mx-auto max-w-7xl flex flex-col gap-12 px-6">
                <SectionHeader
                    title="Popular Routes"
                    description="Discover top flight routes at unbeatable prices."
                    cta={{ label: "View All", href: "#" }}
                />

                <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto hide-scrollbar p-1">
                    {POPULAR_ROUTES.map((route, i) => (
                        <RouteTicket
                            key={`${route.origin.code}-${route.destination.code}-${i}`}
                            route={route}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
