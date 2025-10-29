import { Request, Response, NextFunction } from "express";
import { loginSchema, studentSignUpSchema, validateRequest } from "../../lib/validation";
import Student from "../../models/student.model";
import { compare, hash } from "../../lib/password";
import { generateTokens, verifyRefreshToken } from "../../lib/jwt";
import { cookieOptions, refreshTokenCookieOptions } from "../../lib/cookies";
import { UserRole } from "../../types/user.types";

// api/v1/auth/student/login     POST - Method
const studentLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = validateRequest(loginSchema, { ...req.body });
    const { email, password } = validatedData;
    
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not registered yet" });
    }

    const isPasswordValid = await compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Unauthorized!, incorrect password" });
    }

    // Generate tokens
    const tokens = generateTokens({
      userId: student._id.toString(),
      email: student.email,
      role: UserRole.STUDENT
    });

    // Set HTTP-only cookies
    res.cookie("accessToken", tokens.accessToken, cookieOptions);
    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({ 
      message: `Welcome again ${student.firstName} ${student.lastName}`,
      user: {
        id: student._id,
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        role: UserRole.STUDENT
      }
    });
  } catch (error: unknown) {
    return next(error);
  }
};

// api/v1/auth/student/signup     POST - Method
const studentSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = validateRequest(studentSignUpSchema, { ...req.body });
    const { email, password, firstName, lastName } = validatedData;
    
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: "Email address already exist, try to login or use another email id" });
    }

    student = await Student.create({
      firstName, 
      lastName, 
      email, 
      password: await hash(password)
    });

    // Generate tokens for auto-login after signup
    const tokens = generateTokens({
      userId: student._id.toString(),
      email: student.email,
      role: UserRole.STUDENT
    });

    // Set HTTP-only cookies
    res.cookie("accessToken", tokens.accessToken, cookieOptions);
    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions);

    return res.status(201).json({ 
      message: "Registration success!",
      user: {
        id: student._id,
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        role: UserRole.STUDENT
      }
    });
  } catch (error: unknown) {
    return next(error);
  }
};

// api/v1/auth/refresh     POST - Method
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    
    // Find student and generate new tokens
    const student = await Student.findById(decoded.userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const tokens = generateTokens({
      userId: student._id.toString(),
      email: student.email,
      role: UserRole.STUDENT
    });

    // Set new cookies
    res.cookie("accessToken", tokens.accessToken, cookieOptions);
    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({ 
      message: "Token refreshed successfully",
      user: {
        id: student._id,
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        role: UserRole.STUDENT
      }
    });
  } catch (error: unknown) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

// api/v1/auth/logout     POST - Method
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    return next(error);
  }
};

// Export all controllers
export { studentLogin, studentSignUp, refreshToken, logout };
