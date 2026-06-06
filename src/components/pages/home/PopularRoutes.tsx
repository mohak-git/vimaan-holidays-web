import { POPULAR_ROUTES } from "./constants";
import RouteTicket from "./elements/RouteTicket";
import SectionHeader from "./elements/SectionHeader";

const HEADING_ID = "popular-routes-heading";

export function PopularRoutes() {
    return (
        <section
            className="w-full mx-auto max-w-7xl bg-sand py-16 px-6"
            aria-labelledby={HEADING_ID}
        >
            <SectionHeader
                eyebrow="Most booked"
                title="Popular flight routes"
                titleId={HEADING_ID}
                viewAllLabel="View all routes"
            />

            <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto hide-scrollbar p-1">
                {POPULAR_ROUTES.map((route, i) => (
                    <RouteTicket
                        key={`${route.origin.code}-${route.destination.code}-${i}`}
                        route={route}
                    />
                ))}
            </div>
        </section>
    );
}
