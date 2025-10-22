import { z, ZodError } from "zod";
import { Department, UserRole } from "../types/user.types";
import { ValidationError } from "./errors";

export const loginSchema = z.object({
  email: z.email("Invalid college email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(Object.values(UserRole) as [string, ...string[]]).optional()
});

export const studentRegistrationSchema = z.object({
  email: z.email("Invalid college email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  rollNumber: z.string().regex(/^[A-Z0-9]+$/, "Invalid roll number format"),
  department: z.enum(Object.values(Department) as [string, ...string[]]),
  semester: z.number().min(1).max(8),
  batch: z.string().regex(/^\d{4}-\d{4}$/, "Batch format: YYYY-YYYY")
});

export const teacherRegistrationSchema = z.object({
  email: z.email("Invalid college email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  employeeId: z.string().regex(/^[A-Z0-9]+$/, "Invalid employee ID format"),
  department: z.enum(Object.values(Department) as [string, ...string[]]),
  designation: z.string().min(2, "Designation is required"),
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
