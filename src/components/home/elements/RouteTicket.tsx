import { PlaneTakeoffIcon } from "lucide-react";
import type { Airport, Route } from "../types";

type Flight = Pick<Route, "origin" | "destination">;
type Details = Pick<Route, "duration" | "stops">;
type Divider = Pick<Route, "airline">;
type PriceTag = Pick<Route, "price">;

function Airport({ code, city }: Airport) {
    return (
        <div className="flex flex-col gap-1 text-center">
            <div className="font-serif text-xl font-semibold leading-none text-ink">{code}</div>
            <div className="text-[10px] uppercase tracking-wide text-ink/50">{city}</div>
        </div>
    );
}

function Flight({ origin, destination }: Flight) {
    return (
        <div className="flex items-center gap-4">
            <Airport {...origin} />
            <div className="flex flex-col items-center gap-px text-coral">
                <PlaneTakeoffIcon className="size-4" />
                <span className="h-0.5 w-12 bg-ink/15" />
            </div>
            <Airport {...destination} />
        </div>
    );
}

function Details({ duration, stops }: Details) {
    return (
        <div className="flex items-center gap-2 text-[11px] text-ink/50">
            <span className="font-medium text-ink/70">{duration}</span>
            <span className="h-1 w-1 rounded-full bg-ink/50" />
            <span>{stops}</span>
        </div>
    );
}

function MainCard({ route }: { route: Route }) {
    return (
        <div className="flex flex-col items-center p-4 gap-3">
            <Flight origin={route.origin} destination={route.destination} />
            <Details duration={route.duration} stops={route.stops} />
        </div>
    );
}

function Divider({ airline }: Divider) {
    return (
        <div className="relative flex items-center justify-center transition-colors duration-300 bg-linear-to-r from-50% to-50% to-coral group-hover:to-coral-hover">
            <span className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-sand" />
            <span className="absolute left-1/2 top-1/2 h-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 border-l border-dashed border-ink/50" />
            <span className="ml-px rotate-180 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50 group-hover:text-ink/75 transition-colors duration-300 [writing-mode:vertical-rl]">
                {airline}
            </span>
            <span className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-sand" />
        </div>
    );
}

function PriceTag({ price }: PriceTag) {
    return (
        <div className="flex flex-col items-center justify-center bg-coral pl-2 pr-4 text-white transition-colors duration-300 group-hover:bg-coral-hover">
            <span className="text-[9px] font-medium uppercase tracking-wider text-white/75">
                from
            </span>
            <span className="font-serif text-lg font-semibold leading-tight">&#8377; {price}</span>
        </div>
    );
}

export default function Ticket({ route }: { route: Route }) {
    return (
        <button
            type="button"
            className="group flex shrink-0 snap-start h-25 overflow-hidden rounded-lg bg-white/75 text-left transition-all duration-300 hover:bg-white hover:scale-101 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral cursor-pointer"
        >
            <MainCard route={route} />
            <Divider airline={route.airline} />
            <PriceTag price={route.price} />
        </button>
    );
}
