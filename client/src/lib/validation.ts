// src/utils/validators.ts

// ------------------ Types ------------------
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

// Utility to trim and normalize input safely
const normalize = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.trim();
};

// ------------------ Validators ------------------
export const validateName = (name: string): ValidationResult => {
  const value = normalize(name);

  if (!value) return { valid: false, message: "Name is required" };
  if (value.length < 2) return { valid: false, message: "Name is too short" };
  if (!/^[A-Za-z\s]+$/.test(value))
    return { valid: false, message: "Name can only contain letters" };

  return { valid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  const value = normalize(email);

  if (!value) return { valid: false, message: "Email is required" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value))
    return { valid: false, message: "Invalid email format" };

  return { valid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  const value = normalize(phone);

  if (!value) return { valid: false, message: "Phone number is required" };
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile pattern
  if (!phoneRegex.test(value))
    return { valid: false, message: "Invalid phone number" };

  return { valid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  const value = normalize(password);

  if (!value) return { valid: false, message: "Password is required" };
  if (value.length < 8)
    return { valid: false, message: "Password must be at least 8 characters" };
  if (!/[A-Z]/.test(value))
    return { valid: false, message: "Must contain at least one uppercase letter" };
  if (!/[a-z]/.test(value))
    return { valid: false, message: "Must contain at least one lowercase letter" };
  if (!/[0-9]/.test(value))
    return { valid: false, message: "Must contain at least one number" };
  if (!/[@$!%*?&]/.test(value))
    return { valid: false, message: "Must contain at least one special character" };

  return { valid: true };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  const pass = normalize(password);
  const confirm = normalize(confirmPassword);

  if (!confirm) return { valid: false, message: "Confirm your password" };
  if (pass !== confirm)
    return { valid: false, message: "Passwords do not match" };

  return { valid: true };
};

// Username — for login or display
export const validateUsername = (username: string): ValidationResult => {
  const value = normalize(username);

  if (!value) return { valid: false, message: "Username is required" };
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(value))
    return {
      valid: false,
      message:
        "Username must be 3–16 characters (letters, numbers, underscores only)",
    };

  return { valid: true };
};

// For titles (like course title, post title, etc.)
export const validateTitle = (title: string): ValidationResult => {
  const value = normalize(title);

  if (!value) return { valid: false, message: "Title is required" };
  if (value.length < 3) return { valid: false, message: "Title too short" };
  if (value.length > 100)
    return { valid: false, message: "Title too long (max 100 chars)" };

  return { valid: true };
};

// General text input (like description, feedback)
export const validateText = (text: string, min = 10, max = 500): ValidationResult => {
  const value = normalize(text);

  if (!value) return { valid: false, message: "Text cannot be empty" };
  if (value.length < min)
    return { valid: false, message: `Text must be at least ${min} characters` };
  if (value.length > max)
    return { valid: false, message: `Text exceeds ${max} characters` };

  return { valid: true };
};

// Simple number range validator (like ratings, price, etc.)
export const validateNumberRange = (
  num: number,
  min = 0,
  max = 100
): ValidationResult => {
  if (isNaN(num)) return { valid: false, message: "Value must be a number" };
  if (num < min || num > max)
    return {
      valid: false,
      message: `Value must be between ${min} and ${max}`,
    };

  return { valid: true };
};
