import mongoose, { Document } from "mongoose";

export interface InstructorType extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  courses?: mongoose.Types.ObjectId[];
  isActive: boolean;
  role: "instructor" | "admin";
  createdAt: Date;
  updatedAt: Date;
};
