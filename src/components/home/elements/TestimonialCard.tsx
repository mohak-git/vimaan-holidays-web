import { StarIcon } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "../types";

type Thumb = { src: string; alt: string };
type StarRating = { rating: number };
type Author = Pick<Testimonial, "name" | "role" | "avatar">;
type Props = { testimonial: Testimonial; index: number };

const STARS = 5;

function Thumb({ src, alt }: Thumb) {
    return (
        <div className="relative h-50 w-full shrink-0 overflow-hidden sm:h-full sm:w-2/5">
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 40vw, 100vw"
                className="rounded-2xl object-cover sm:rounded-2xl"
            />
        </div>
    );
}

function StarRating({ rating }: StarRating) {
    return (
        <div className="flex items-baseline">
            {Array.from({ length: STARS }, (_, i) => (
                <StarIcon key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 tracking-tight text-ink/60">
                {rating}/{STARS}
            </span>
        </div>
    );
}

function Author({ name, role, avatar }: Author) {
    return (
        <div className="flex items-center gap-4">
            <Image
                src={avatar}
                alt={name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
            />

            <div className="flex flex-col">
                <span className="font-semibold text-ink tracking-tight">{name}</span>
                <span className="text-sm text-ink/60 tracking-tight">{role}</span>
            </div>
        </div>
    );
}

export default function TestimonialCard({ testimonial, index }: Props) {
    return (
        <div
            id={`testimonial-card-${index}`}
            className="flex flex-col snap-center sm:flex-row items-center min-w-full lg:min-w-3/5 h-full sm:h-90 sm:gap-8 sm:pr-8 bg-white rounded-2xl overflow-hidden"
        >
            <Thumb src={testimonial.cardImage} alt={testimonial.title} />

            <div className="flex flex-col h-full w-full grow justify-between p-6 sm:p-0 sm:py-8 gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-serif font-semibold text-xl tracking-tight text-ink sm:text-2xl">
                            {testimonial.title}
                        </h3>

                        <StarRating rating={4.8} />
                    </div>

                    <p className="text-sm sm:text-base tracking-tight text-ink/60">
                        {testimonial.quote}
                    </p>
                </div>

                <Author
                    name={testimonial.name}
                    role={testimonial.role}
                    avatar={testimonial.avatar}
                />
            </div>
        </div>
    );
}
