import { GENDER_OPTIONS, TITLE_OPTIONS } from "@/types/person";
export interface User {
    name: string;
    email: string;
    phone: string;
}

export interface SavedTraveller {
    id: string;
    title: (typeof TITLE_OPTIONS)[number];
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: (typeof GENDER_OPTIONS)[number];
    nationality: string;
}
