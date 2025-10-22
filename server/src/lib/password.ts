import bcrypt from "bcryptjs";
import { ValidationError } from "./errors";

export class PasswordService {
  private static readonly SALT_ROUNDS = 12;

  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static validate(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      throw new ValidationError("Password must be at least 8 characters long");
    }
    if (!hasUpperCase || !hasLowerCase) {
      throw new ValidationError("Password must contain uppercase and lowercase letters");
    }
    if (!hasNumbers) {
      throw new ValidationError("Password must contain at least one number");
    }
    if (!hasSpecialChar) {
      throw new ValidationError("Password must contain at least one special character");
    }

    return true;
  }
}
