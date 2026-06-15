import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "../types";

type Thumb = { src: string; alt: string; priority: boolean };
type Price = Pick<Destination, "price">;
type Info = Pick<Destination, "title" | "subtitle" | "location">;
type Props = { destination: Destination; className: string; priority: boolean };

function Thumb({ src, alt, priority }: Thumb) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
    );
}

function Price({ price }: Price) {
    return (
        <div className="flex items-baseline justify-end gap-1">
            <span className="font-serif text-lg sm:group-hover:text-xl leading-none transition-all duration-500 group-hover:text-coral">
                &#8377; {price}
            </span>
            <span className="text-[8px] tracking-[0.2em] uppercase text-white/50">/pp</span>
        </div>
    );
}

function Arrow() {
    return (
        <div className="-translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/25 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </div>
        </div>
    );
}

function Info({ location, title, subtitle }: Info) {
    return (
        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end p-4 sm:p-6 text-white z-1 gap-1">
            <p className="text-coral bg-white px-2 py-px w-fit font-bold text-[10px] tracking-[0.2em] uppercase transform transition-transform duration-500 ease-out group-hover:-translate-y-1">
                {location}
            </p>

            <h3 className="text-xl sm:text-2xl font-serif font-medium tracking-wide transform transition-transform duration-500 ease-out group-hover:-translate-y-1">
                {title}
            </h3>

            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out overflow-hidden">
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed line-clamp-2 transform translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 delay-75">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default function DestinationCard({ destination, className, priority = false }: Props) {
    return (
        <Link
            href={destination.href}
            className={`group relative flex w-full h-80 overflow-hidden rounded-none sm:rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-coral ${className}`}
        >
            <Thumb src={destination.image} alt={destination.title} priority={priority} />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10 transition-opacity duration-700 group-hover:opacity-80" />

            <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 sm:p-6 z-1 text-white">
                <Arrow />
                <Price price={destination.price} />
            </div>

            <Info
                location={destination.location}
                title={destination.title}
                subtitle={destination.subtitle}
            />
        </Link>
    );
}
