export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

export enum Department {
  CSE = 'Computer Science',
  ECE = 'Electronics',
  MECH = 'Mechanical',
  CIVIL = 'Civil',
  EEE = 'Electrical',
  IT = 'Information Technology'
}

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student extends BaseUser {
  role: UserRole.STUDENT;
  rollNumber: string;
  department: Department;
  semester: number;
  batch: string; // e.g., "2021-2025"
  enrolledCourses: string[]; // Course IDs
}

export interface Teacher extends BaseUser {
  role: UserRole.TEACHER;
  employeeId: string;
  department: Department;
  designation: string; // Professor, Associate Professor, etc.
  specialization: string;
  coursesTeaching: string[]; // Course IDs
}

export interface Admin extends BaseUser {
  role: UserRole.ADMIN;
  employeeId: string;
  permissions: AdminPermission[];
}

export type User = Student | Teacher | Admin;

export enum AdminPermission {
  MANAGE_USERS = 'manage_users',
  MANAGE_COURSES = 'manage_courses',
  MANAGE_DEPARTMENTS = 'manage_departments',
  VIEW_ANALYTICS = 'view_analytics',
  SYSTEM_SETTINGS = 'system_settings'
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
