import { z } from "zod";
import { travellerSchema } from "./traveller";

export const passengerSchema = travellerSchema
    .extend({
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
