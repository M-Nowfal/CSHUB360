import express from "express";
import { addCourse } from "../../controllers/instructor/course.controller";

const instructorCourseRoutes = express.Router();

instructorCourseRoutes.post("/add", addCourse);

export default instructorCourseRoutes;
