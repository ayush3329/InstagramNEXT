import { z } from "zod";

export const SigninSchema = z.object({
    username: z.string().min(8, "Username must be at least 8 characters"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const SignupSchema = z.object({
    username: z.string().min(5, "Username must be at least 5 characters").max(20, "Username must be at most 20 characters"),
    fullname: z.string().min(5, "Fullname must be at least 5 characters").max(20, "Fullname must be at most 20 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})