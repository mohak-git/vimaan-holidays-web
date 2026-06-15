import Image from "next/image";
import SubscribeForm from "./SubscribeForm";

const SECTION_ID = "newsletter-heading";

function StatCard() {
    return (
        <div className="absolute bottom-0 right-0 z-3 flex h-24 w-40 shadow-sm flex-col items-center justify-start gap-3 overflow-hidden rounded-xl bg-white">
            <Image
                src="https://framerusercontent.com/images/cpKGnDpSGj8r5zGHh9XnA7sPcU.png"
                alt=""
                width={100}
                height={100}
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
            />

            <div className="relative z-1 flex flex-col items-start justify-center p-4 h-full w-full">
                <div className="font-serif text-2xl font-semibold text-ink">120+</div>
                <p className="text-sm tracking-tight text-ink">Countries to Explore</p>
            </div>
        </div>
    );
}

function NewsletterImages() {
    return (
        <div className="hidden relative sm:flex h-80 w-70 lg:h-110 lg:w-90 flex-row items-center justify-center">
            <div className="absolute left-0 top-0 flex h-70 w-60 lg:h-100 lg:w-80 items-center justify-center">
                <Image
                    src="https://framerusercontent.com/images/0UgZFjfR7ymyzvA0yu3EoM6ww.png"
                    alt="Travel adventure illustration"
                    width={300}
                    height={400}
                    className="absolute right-0 top-0 z-2 h-70 w-60 lg:h-100 lg:w-80 object-cover"
                />
                <Image
                    src="https://framerusercontent.com/images/2eJNJ2TaT92nGvXmD8WdgoniKUc.svg"
                    alt=""
                    width={300}
                    height={300}
                    className="pointer-events-none absolute bottom-0 left-0 z-1 h-80 w-90 select-none object-contain"
                    aria-hidden="true"
                />
            </div>

            <StatCard />
        </div>
    );
}

export default function Newsletter() {
    return (
        <section className="w-full bg-red-50 py-10 px-6" aria-labelledby={SECTION_ID}>
            <div className="mx-auto w-full max-w-7xl flex flex-col items-center justify-between rounded-3xl bg-white/90 md:flex-row gap-10 px-6 py-10 sm:px-10 lg:px-20 lg:py-15">
                <div className="flex w-full max-w-md md:max-w-lg lg:max-w-xl flex-col items-start gap-8 lg:gap-12">
                    <div className="flex flex-col items-start gap-3">
                        <h2
                            id={SECTION_ID}
                            className="font-serif text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
                        >
                            Stay Updated on the Latest Adventures, Tips, and Exclusive Offers.
                        </h2>
                        <p className="font-sans text-base text-ink/60">
                            Never miss out on travel tips, exclusive offers, and inspiring
                            destinations. Subscribe to our newsletter and let the adventure come
                            straight to your inbox!
                        </p>
                    </div>

                    <SubscribeForm />
                </div>

                <NewsletterImages />
            </div>
        </section>
    );
}
