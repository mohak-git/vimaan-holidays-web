import { z } from "zod";

export const passengerSchema = z
    .object({
        title: z.string().min(1, "Title is required"),
        firstName: z.string().min(1, "First name is required").max(50),
        lastName: z.string().min(1, "Last name is required").max(50),
        dateOfBirth: z.string().min(1, "Date of birth is required"),
        gender: z.string().min(1, "Gender is required"),
        nationality: z.string().min(1, "Nationality is required"),
        phone: z.string().optional(),
        email: z.string().email().optional().or(z.literal("")),
        studentId: z.string().optional(),
        serviceId: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.studentId && data.studentId.trim().length < 3) return false;
            return true;
        },
        { message: "Student ID required", path: ["studentId"] },
    );

export type PassengerFormData = z.infer<typeof passengerSchema>;
