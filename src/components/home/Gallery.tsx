import { GALLERY } from "./constants";
import GalleryImages from "./elements/GalleryImages";
import SectionHeader from "./elements/SectionHeader";

const HEADING_ID = "gallery-heading";

export default function Gallery() {
    const topRow = GALLERY.slice(0, 6);
    const bottomRow = GALLERY.slice(6);

    return (
        <section
            className="w-full bg-white flex flex-col items-center justify-center gap-16 py-20"
            aria-labelledby={HEADING_ID}
        >
            <div className="w-full mx-auto max-w-7xl px-6">
                <SectionHeader
                    title="Moments That Take Your Breath Away"
                    description="Explore our gallery for stunning travel photos and the best vibes from Vimaan Holidays!"
                />
            </div>

            <div className="flex w-full flex-col items-center justify-start gap-6">
                <GalleryImages images={topRow} direction="left" align="end" />
                <GalleryImages images={bottomRow} direction="right" align="start" />
            </div>
        </section>
    );
}
