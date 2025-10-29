import { z, ZodError } from "zod";
import { UserRole } from "../types/user.types";
import { ValidationError } from "./errors";

export const loginSchema = z.object({
  email: z.email("Invalid email address")
    .min(1, "Email is required")
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*\d)/,
      "Password must contain at least one lowercase letter and one number"
    ),
  role: z.enum(Object.values(UserRole) as [string, ...string[]]).optional()
});

export const studentSignUpSchema = z.object({
  email: z.email("Invalid college email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),
  firstName: z.string().min(2, "First-Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last-Name must be at least 2 characters")
});

export const InstructorSignUpSchema = z.object({
  email: z.email("Invalid college email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "Fist-Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last-Name must be at least 2 characters"),
  specialization: z.string().min(2, "Specialization is required")
});

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues.map(e => e.message).join(", ");
      throw new ValidationError(message);
    }
    throw error;
  }
}
