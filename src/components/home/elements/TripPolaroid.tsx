import { ArrowRight, MapPin, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Trip } from "../types";

interface Layout {
    readonly tilt: string;
    readonly tape: string;
}
type Stamp = Pick<Trip, "stampCode">;
type Photo = Pick<Trip, "image" | "stampCode"> & { alt: string };
type Body = Pick<Trip, "title" | "location" | "subtitle" | "duration">;
type Price = Pick<Trip, "price">;
type Props = { trip: Trip; index: number };

const LAYOUTS: readonly Layout[] = [
    { tilt: "-rotate-3", tape: "left-1/2 -top-3 -translate-x-1/2 -rotate-2 bg-coral/50" },
    { tilt: "rotate-3", tape: "right-8 -top-2.5 rotate-6 bg-ink/20" },
    { tilt: "-rotate-2", tape: "left-12 -top-4 -rotate-3 bg-coral/50" },
    { tilt: "rotate-6", tape: "left-1/2 -top-2 -translate-x-1/2 rotate-1 bg-ink/20" },
];

function Tape({ className }: { className: string }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute z-2 h-6 w-20 border border-white shadow-sm backdrop-blur-sm ${className}`}
        />
    );
}

function Stamp({ stampCode }: Stamp) {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 z-1 flex h-12 w-10 rotate-4 flex-col items-center justify-center gap-1 border-2 border-dashed border-white/80 bg-coral p-1 opacity-90"
        >
            <Plane className="h-4 w-4 text-white" />
            <span className="text-[8px] font-bold tracking-widest text-white">{stampCode}</span>
        </div>
    );
}

function Postmark() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-4 z-2 flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border-2 border-ink/40 opacity-80 mix-blend-multiply"
        >
            <div className="relative flex flex-col gap-0.5 h-14 w-14 items-center justify-center rounded-full border border-ink/40 font-bold">
                <span className="text-[6px] uppercase tracking-widest">Approved</span>
                <span className="text-[8px]">2026</span>
                <span className="text-[6px] uppercase tracking-widest">Travel</span>
            </div>
        </div>
    );
}

function Photo({ image, alt, stampCode }: Photo) {
    return (
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-sand-dark">
            <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <Stamp stampCode={stampCode} />
            <Postmark />
        </div>
    );
}

function Body({ title, location, subtitle, duration }: Body) {
    return (
        <>
            <h3 className="mb-1 font-serif text-xl leading-tight text-ink">
                {title}, {location}
            </h3>
            <p className="mb-2 text-sm text-ink/50">{subtitle}</p>
            <div className="mb-6 flex items-center gap-1 text-xs font-medium text-ink/40">
                <MapPin className="h-3 w-3" />
                {duration}
            </div>
        </>
    );
}

function Cta() {
    return (
        <span className="flex items-center gap-1 text-sm font-semibold text-coral transition-colors group-hover:text-coral-hover">
            Explore
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
    );
}

function Price({ price }: Price) {
    return (
        <div className="absolute -bottom-2 right-0 -rotate-4 whitespace-nowrap font-serif text-xl font-bold italic text-coral md:text-2xl">
            &#8377; {price}
        </div>
    );
}

export default function TripPolaroid({ trip, index }: Props) {
    const layout = LAYOUTS[index % LAYOUTS.length];

    return (
        <Link
            href={trip.href}
            aria-label={`Explore trip to ${trip.title}, ${trip.location}`}
            className={`group relative w-full max-w-sm transform transition-all duration-300 ease-out hover:z-3 hover:-translate-y-2 hover:rotate-0 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus:z-3 focus:-translate-y-2 focus:rotate-0 focus:scale-105 ${layout.tilt} z-1`}
        >
            <Tape className={layout.tape} />

            <div className="flex h-120 flex-col rounded-sm border border-ink/20 bg-white p-4 pb-6 shadow-soft transition-shadow duration-300 group-hover:shadow-lg gap-4">
                <Photo image={trip.image} alt={trip.title} stampCode={trip.stampCode} />

                <div className="relative flex grow flex-col px-2">
                    <Body
                        title={trip.title}
                        location={trip.location}
                        subtitle={trip.subtitle}
                        duration={trip.duration}
                    />
                    <div className="relative flex items-end justify-between border-t border-ink/10 pt-4">
                        <Cta />
                        <Price price={trip.price} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
