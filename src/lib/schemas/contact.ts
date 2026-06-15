import { z } from "zod";

export const contactSchema = z
    .object({
        email: z.email("Enter a valid email address"),
        confirmEmail: z.email("Enter a valid email address"),
        phone: z.string().min(10, "Phone must be at least 10 digits"),
        countryCode: z.string().min(1, "Select a country code"),
    })
    .refine((data) => data.email === data.confirmEmail, {
        message: "Emails do not match",
        path: ["confirmEmail"],
    });

export type ContactFormData = z.infer<typeof contactSchema>;
