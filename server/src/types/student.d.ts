import mongoose, { Document } from "mongoose";

export interface StudentType extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  enrolledCourses?: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
