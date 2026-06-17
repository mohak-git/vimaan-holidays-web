import { z } from "zod";

export const signInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password is required"),
});

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const emailResetSchema = z.object({
    email: z.email("Please enter a valid email"),
});

export const resetSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type EmailResetData = z.infer<typeof emailResetSchema>;
export type ResetData = z.infer<typeof resetSchema>;
