import { GENDER_OPTIONS, TITLE_OPTIONS } from "@/types/person";
import { z } from "zod";

export const travellerSchema = z.object({
    title: z.enum(TITLE_OPTIONS, "Select a title"),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(GENDER_OPTIONS, "Select a gender"),
    nationality: z.string().trim().min(1, "Nationality is required"),
});

export type TravellerFormData = z.infer<typeof travellerSchema>;
