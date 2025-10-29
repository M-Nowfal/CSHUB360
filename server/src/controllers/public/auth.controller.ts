import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../lib/jwt";
import { UserRole } from "../../types/user.types";
import Student from "../../models/student.model";
import Instructor from "../../models/instructor.model";

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = verifyToken(token);

    let user;
    let userData;

    switch (decoded.role) {
      case UserRole.STUDENT:
        user = await Student.findById(decoded.userId).select("-password");
        if (user) {
          userData = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            enrolledCourses: user.enrolledCourses || [],
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };
        }
        break;

      case UserRole.INSTRUCTOR:
        user = await Instructor.findById(decoded.userId).select("-password");
        if (user) {
          userData = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
            avatar: user.avatar,
            bio: user.bio,
            courses: user.courses || [],
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };
        }
        break;

      default:
        return res.status(400).json({ message: "Invalid user role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: userData,
      role: decoded.role
    });
  } catch (error: unknown) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ 
      message: "Logged out successfully" 
    });
  } catch (error: unknown) {
    return next(error);
  }
};
