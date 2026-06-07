import Image from "next/image";
import { Suspense } from "react";
import BookingCard from "./BookingCard";
import BookingCardSkeleton from "./BookingCardSkeleton";
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
        <section className="relative px-4 py-16 md:px-8">
            <Background />

            <div className="relative z-1 mx-auto flex w-full max-w-6xl flex-col items-center">
                <div className="flex min-h-[70vh] flex-col items-center justify-center">
                    <Headline />
                    <SearchBar />
                </div>
                <Suspense fallback={<BookingCardSkeleton />}>
                    <BookingCard category={category} />
                </Suspense>
            </div>
        </section>
    );
}
