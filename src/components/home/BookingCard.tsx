import CategoryTabs from "./CategoryTabs";
import SearchForms from "./SearchForms";
import type { Category } from "./types";

interface Props {
    category: Category;
}

export default function BookingCard({ category }: Props) {
    return (
        <div className="w-full bg-sand rounded-3xl p-4 md:p-6 shadow-soft flex flex-col gap-6 relative">
            <CategoryTabs selected={category} />

            <SearchForms category={category} />
        </div>
    );
}
