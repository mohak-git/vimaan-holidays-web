import AppDownloadBanner from "@/components/home/AppDownloadBanner";
import BrandLogos from "@/components/home/BrandLogos";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import FeatureList from "@/components/home/FeatureList";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import PopularDestinations from "@/components/home/PopularDestinations";
import PopularRoutes from "@/components/home/PopularRoutes";
import Testimonials from "@/components/home/Testimonials";
import { CATEGORIES, Category } from "@/components/home/types";
import Loader from "@/components/layout/Loader";
import { redirect } from "next/navigation";

type Props = { searchParams: Promise<{ category?: string }> };

export default async function HomePage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;

    const keys = Object.keys(resolvedSearchParams);
    const hasInvalidKeys = keys.length > 1 || (keys.length === 1 && keys[0] !== "category");
    if (hasInvalidKeys) redirect("/");

    const rawCategory = resolvedSearchParams.category;
    const isInvalidCategory =
        typeof rawCategory !== "string" || !CATEGORIES.some((c) => c.id === rawCategory);
    if (rawCategory !== undefined && isInvalidCategory) redirect("/");

    const category: Category = isInvalidCategory ? "flight" : (rawCategory as Category);

    return (
        <>
            <Loader />
            <main className="min-h-screen bg-sand font-sans">
                <Hero category={category} />
                <PopularRoutes />
                <BrandLogos />
                <FeatureList />
                <PopularDestinations />
                <FeaturedTrips />
                <Testimonials />
                <Gallery />
                <Newsletter />
                <AppDownloadBanner />
            </main>
        </>
    );
}
