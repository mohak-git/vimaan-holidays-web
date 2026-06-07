import Loader from "@/components/Loader";
import Hero from "@/components/pages/home/Hero";
import PopularDestinations from "@/components/pages/home/PopularDestinations";
import PopularRoutes from "@/components/pages/home/PopularRoutes";
import { CATEGORIES, Category } from "@/components/pages/home/types";
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
                <PopularDestinations />
            </main>
        </>
    );
}
