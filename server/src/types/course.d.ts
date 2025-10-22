import { Document } from "mongoose";
import { InstructorType } from "./instructor";

interface LessonsType extends Document {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

interface CourseType extends Document {
  title: string;
  description: string;
  instructor: InstructorType;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  imageUrl: string;
  videoUrl: string;
  rating: number;
  reviewsCount: number;
  price: number;
  isFree: boolean;
  noOfEnrollment: number;
  tags: string[];
  lessons: LessonsType[]
};
