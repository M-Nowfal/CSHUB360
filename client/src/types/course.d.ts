import type { Instructor } from "./instructor";

interface Lessons extends Document {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: Instructor;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  imageUrl: string;
  videoUrl: string;
  rating: number;
  reviewsCount: number;
  price: number;
  isFree: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  lessons: Lessons[];
};
