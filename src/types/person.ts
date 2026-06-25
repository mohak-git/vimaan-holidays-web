export const TITLE_OPTIONS = ["Mr", "Ms", "Mrs", "Mx", "Dr"] as const;
export const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;

export interface Person {
    id: string;
    title: (typeof TITLE_OPTIONS)[number];
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: (typeof GENDER_OPTIONS)[number];
    nationality: string;
}
