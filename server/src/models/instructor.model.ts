import mongoose, { Schema } from "mongoose";
import { InstructorType } from "../types/instructor";

// --------------- Instructor -------------
const instructorSchema: Schema = new Schema<InstructorType>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String },
    bio: { type: String, maxlength: 500 },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    isActive: { type: Boolean, default: true },
    role: { type: String, enum: ["instructor", "admin"], default: "instructor" },
  },
  { timestamps: true }
);

const Instructor = mongoose.models.Instructor || mongoose.model<InstructorType>("Instructor", instructorSchema);
export default Instructor;
