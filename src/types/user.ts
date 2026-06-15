import type { Person } from "./person";

export interface User {
    name: string;
    email: string;
    phone: string;
}

export interface SavedTraveller extends Person {
    passportNumber: string;
    passportExpiry: string;
    frequentFlyerNumber: string;
}
