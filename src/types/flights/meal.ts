import { MEAL_TYPES } from "@/config/constants";

export type MealType = (typeof MEAL_TYPES)[number];

export interface Meal {
    id: string;
    name: string;
    description: string;
    price: number;
    tag: MealType;
}
