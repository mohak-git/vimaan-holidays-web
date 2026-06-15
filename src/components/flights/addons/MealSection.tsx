import MealSelector from "@/components/flights/MealSelector";
import type { MealSectionProps } from "./types";

export default function MealSection({
    passengers,
    meals,
    selectedMeals,
    onMealSelect,
    getPassengerLabel,
}: MealSectionProps) {
    return (
        <MealSelector
            meals={meals}
            passengers={passengers}
            selectedMeals={selectedMeals}
            onSelect={onMealSelect}
            getPassengerLabel={getPassengerLabel}
        />
    );
}
