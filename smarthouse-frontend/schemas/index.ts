import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(1, {
        message: "Invalid password.",
    }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name is required")
        .refine((name) => /^[A-Za-z]+$/.test(name), "First name cannot contain numbers or special characters"),
    lastName: z
        .string()
        .min(2, "Last name is required")
        .refine((name) => /^[A-Za-z]+$/.test(name), "Last name cannot contain numbers or special characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Invalid phone number"),
    country: z.string().min(2, "Country is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val, "You must agree to the terms of service"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
