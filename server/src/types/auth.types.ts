import { Department, PublicUser, UserRole } from "./user.types";

export interface UserPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  department?: Department;
  rollNumber?: string; // For students
  employeeId?: string; // For teachers & admins
}

export interface JWTPayload extends UserPayload {
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export interface StudentRegistration {
  email: string;
  password: string;
  name: string;
  rollNumber: string;
  department: Department;
  semester: number;
  batch: string;
}

export interface TeacherRegistration {
  email: string;
  password: string;
  name: string;
  employeeId: string;
  department: Department;
  designation: string;
  specialization: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: PublicUser & {
    role: UserRole;
    department?: Department;
    rollNumber?: string;
    employeeId?: string;
  };
}
