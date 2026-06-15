import CategoryTabs from "./CategoryTabs";
import SearchForms from "./SearchForms";
import { Category } from "./types";

interface Props {
    category: Category;
}

export default async function BookingCard({ category }: Props) {
    return (
        <div className="w-full bg-sand rounded-3xl p-4 md:p-6 shadow-soft flex flex-col gap-6 relative">
            <CategoryTabs selected={category} />

            <SearchForms category={category} />

            {category !== "flight" && (
                <div className="flex justify-center md:justify-end ">
                    <button className="w-full md:w-auto bg-coral hover:bg-coral-hover text-white text-lg font-semibold px-10 py-3 rounded-xl shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-hover hover:-translate-y-0.5">
                        Search {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                </div>
            )}
        </div>
    );
}
