import type { Meal } from "@/types/flights/meal";

export const meals: Meal[] = [
    {
        id: "M1",
        name: "Vegetarian Meal",
        description: "Fresh seasonal vegetables, rice, and roti with dal",
        price: 350,
        tag: "veg",
    },
    {
        id: "M2",
        name: "Non-Veg Meal",
        description: "Chicken biryani with raita and dessert",
        price: 450,
        tag: "non-veg",
    },
    {
        id: "M3",
        name: "Vegan Meal",
        description: "Quinoa salad with roasted vegetables and hummus",
        price: 400,
        tag: "vegan",
    },
    {
        id: "M4",
        name: "Jain Meal",
        description: "Sattvic thali with no onion, garlic, or root vegetables",
        price: 350,
        tag: "jain",
    },
    {
        id: "M5",
        name: "Continental Breakfast",
        description: "Croissant, butter, jam, fresh fruit, and orange juice",
        price: 300,
        tag: "veg",
    },
    {
        id: "M6",
        name: "South Indian Meal",
        description: "Masala dosa with sambhar, chutney, and filter coffee",
        price: 350,
        tag: "veg",
    },
    {
        id: "M7",
        name: "Fish Curry Rice",
        description: "Traditional Bengali fish curry with steamed rice",
        price: 500,
        tag: "non-veg",
    },
    {
        id: "M8",
        name: "Kids Meal",
        description: "Mini pizza, french fries, fruit cup, and chocolate milk",
        price: 250,
        tag: "veg",
    },
];
