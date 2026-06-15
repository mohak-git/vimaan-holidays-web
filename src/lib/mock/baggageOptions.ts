import type { BaggageOption } from "@/types/flights/baggage";

export const baggageOptions: BaggageOption[] = [
    { id: "BG5", label: "Add 5 kg", kg: 5, price: 500 },
    { id: "BG10", label: "Add 10 kg", kg: 10, price: 900 },
    { id: "BG15", label: "Add 15 kg", kg: 15, price: 1300 },
    { id: "BG20", label: "Add 20 kg", kg: 20, price: 1600 },
];
