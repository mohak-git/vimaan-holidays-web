import Image from "next/image";
import BookingCard from "./BookingCard";
import { BG_IMG_URL } from "./constants";
import SearchBar from "./SearchBar";
import { Category } from "./types";

function Background() {
    return (
        <Image
            src={BG_IMG_URL}
            alt="Beautiful mountain landscape"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 overflow-hidden object-cover object-center"
        />
    );
}

function Headline() {
    return (
        <div className="mb-10 text-center">
            <h1 className="mb-4 font-serif text-5xl text-white drop-shadow-md md:text-7xl">
                Where to next?
            </h1>
            <div
                className="mx-auto mb-4 h-1 w-60 sm:w-80 md:w-120 bg-linear-to-r from-coral to-transparent from-25% rounded-full"
                aria-hidden={true}
            />
            <p className="mx-auto max-w-2xl text-lg font-light text-white/80 md:text-xl">
                Discover extraordinary destinations, curated experiences, and seamless journeys.
            </p>
        </div>
    );
}

interface Props {
    category: Category;
}

export default function Hero({ category }: Props) {
    return (
        <section className="relative px-4 pt-24 pb-16 md:px-8">
            <Background />

            <div className="relative z-1 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 pt-20">
                <BookingCard category={category} />
                <div className="flex flex-col items-center justify-center">
                    <Headline />
                    <SearchBar />
                </div>
            </div>
        </section>
    );
}
