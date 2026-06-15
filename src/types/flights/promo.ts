import type { FareType } from "./search";

export interface PromoCode {
    code: string;
    discount: number;
    minAmount: number;
    description: string;
    validFor: (FareType | "all")[];
}
