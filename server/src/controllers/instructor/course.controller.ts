import { Request, Response, NextFunction } from "express";
import Course from "../../models/corse.model";

export const addCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseDetails = req.body;
    const newCourse = await Course.create({ ...courseDetails });
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error: unknown) {
    return next(error);
  }
};
