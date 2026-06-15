"use client";

import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Meal, MealType } from "@/types/flights/meal";
import { memo } from "react";

interface Passenger {
    id: string;
    firstName?: string;
    lastName?: string;
    type?: string;
}

const mealTagColors: Record<MealType, string> = {
    veg: "bg-green-100 text-green-700 border-green-300",
    "non-veg": "bg-red-100 text-red-700 border-red-300",
    vegan: "bg-emerald-100 text-emerald-700 border-emerald-300",
    jain: "bg-purple-100 text-purple-700 border-purple-300",
};

interface Props {
    meals: Meal[];
    passengers: Passenger[];
    selectedMeals: { passengerId: string; mealId: string }[];
    onSelect: (passengerId: string) => (mealId: string | null, price: number) => void;
    getPassengerLabel: (idx: number) => string;
}

function MealSelector({ meals, passengers, selectedMeals, onSelect, getPassengerLabel }: Props) {
    return (
        <div className="space-y-6">
            <MealCards meals={meals} />
            <PassengerMealPickers
                passengers={passengers}
                selectedMeals={selectedMeals}
                onSelect={onSelect}
                getPassengerLabel={getPassengerLabel}
                meals={meals}
            />
        </div>
    );
}

function MealCards({ meals }: { meals: Meal[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {meals.map((meal) => (
                <div key={meal.id} className="border border-sand-dark rounded-xl p-3">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium">{meal.name}</span>
                        <span
                            className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded border font-medium",
                                mealTagColors[meal.tag],
                            )}
                        >
                            {meal.tag}
                        </span>
                    </div>
                    <p className="text-[10px] text-ink/50 mb-1 line-clamp-2">{meal.description}</p>
                    <span className="text-sm font-semibold text-coral">
                        {formatPrice(meal.price)}
                    </span>
                </div>
            ))}
        </div>
    );
}

function PassengerMealPickers({
    passengers,
    selectedMeals,
    onSelect,
    getPassengerLabel,
    meals,
}: {
    passengers: Passenger[];
    selectedMeals: { passengerId: string; mealId: string }[];
    onSelect: (passengerId: string) => (mealId: string | null, price: number) => void;
    getPassengerLabel: (idx: number) => string;
    meals: Meal[];
}) {
    return (
        <div className="space-y-3">
            {passengers.map((p, idx) => {
                const selectedMealId =
                    selectedMeals.find((m) => m.passengerId === p.id)?.mealId ?? null;
                return (
                    <div key={p.id}>
                        {idx > 0 && <hr className="border-sand-dark mb-3" />}
                        <PassengerRow
                            name={getPassengerLabel(idx)}
                            meals={meals}
                            selectedMealId={selectedMealId}
                            onSelect={onSelect(p.id)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

function PassengerRow({
    name,
    meals,
    selectedMealId,
    onSelect,
}: {
    name: string;
    meals: Meal[];
    selectedMealId: string | null;
    onSelect: (mealId: string | null, price: number) => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
            <span className="text-sm font-medium text-ink sm:min-w-[120px]">{name}</span>
            <div className="flex flex-wrap gap-1.5 max-w-[520px]">
                <Chip selected={selectedMealId === null} onClick={() => onSelect(null, 0)}>
                    None
                </Chip>
                {meals.map((meal) => (
                    <Chip
                        key={meal.id}
                        selected={selectedMealId === meal.id}
                        onClick={() => onSelect(meal.id, meal.price)}
                    >
                        {meal.name}
                    </Chip>
                ))}
            </div>
        </div>
    );
}

export default memo(MealSelector);
