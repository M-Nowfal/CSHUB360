import mongoose from "mongoose";
import { CourseType, LessonsType } from "../types/course";

// ---------- Lesson / Sub-video Schema ----------
const lessonSchema = new mongoose.Schema<LessonsType>({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: String }, // e.g., "10:30" (minutes:seconds)
  order: { type: Number, required: true },
});

// ---------- Course Schema ----------
const courseSchema = new mongoose.Schema<CourseType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Instructor",
    },
    duration: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    isFree: { type: Boolean, default: false },
    noOfEnrollment: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    lessons: { type: [lessonSchema], default: [] },
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
