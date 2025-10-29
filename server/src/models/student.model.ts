import mongoose, { Schema } from "mongoose";
import { StudentType } from "../types/student";

// --------------- Student -------------
const studentSchema: Schema = new Schema<StudentType>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model<StudentType>("Student", studentSchema);
export default Student;
