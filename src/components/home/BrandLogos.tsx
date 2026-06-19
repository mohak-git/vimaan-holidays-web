import Image from "next/image";
import { BRAND_LOGOS as Logos } from "./constants";
import SectionHeader from "./elements/SectionHeader";
import type { BrandLogo } from "./types";

const HEADING_ID = "brand-logos-heading";

function LogoItem({ brand, src }: BrandLogo) {
    return (
        <li className="flex shrink-0 items-center">
            <Image
                width={100}
                height={100}
                src={src}
                alt={brand}
                className="h-20 w-auto object-cover"
            />
        </li>
    );
}

export default function BrandLogos() {
    return (
        <section className="w-full bg-dark-sandal py-15" aria-labelledby={HEADING_ID}>
            <div className="mx-auto max-w-7xl flex flex-col gap-12 px-6">
                <SectionHeader
                    title="Trusted by Top Brands Worldwide"
                    description="We seamlessly integrate with global travel inventory to provide you with options from the world's best providers."
                />

                <div className="relative w-full overflow-hidden">
                    <ul
                        className="flex animate-marquee-left items-center gap-12"
                        style={{ animationDuration: "15s" }}
                    >
                        {[...Logos, ...Logos, ...Logos].map((logo, idx) => (
                            <LogoItem key={`${logo.brand}-${idx}`} {...logo} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
