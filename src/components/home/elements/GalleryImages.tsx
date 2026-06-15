import Image from "next/image";
import type { GalleryImage } from "../types";

interface Props {
    images: GalleryImage[];
    direction: "left" | "right";
    align: "start" | "end";
}

function Item({ src, width, height }: GalleryImage) {
    return (
        <Image
            src={src}
            alt={`vimaan-holidays-${width}x${height}`}
            width={width}
            height={height}
            className="rounded-xl object-cover"
            sizes={`${width}px`}
        />
    );
}

export default function GalleryImages({ images, direction, align }: Props) {
    const marqueeClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
    const alignClass = align === "end" ? "items-end" : "items-start";

    return (
        <div className="w-full overflow-hidden">
            <ul className={`flex w-max flex-row gap-6 ${alignClass} ${marqueeClass}`}>
                {[...images, ...images].map((img, i) => (
                    <Item key={i} {...img} />
                ))}
            </ul>
        </div>
    );
}
