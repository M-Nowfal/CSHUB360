import express from "express";
import instructorAuthRoutes from "./auth.routes";
import instructorCourseRoutes from "./course.routes";

// Create router for instructor
const instructorRoutes = express.Router();

instructorRoutes.use("/auth", instructorAuthRoutes);
instructorRoutes.use("/course", instructorCourseRoutes);

export default instructorRoutes;