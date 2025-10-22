import express from "express";
import { getCourses, getFeaturedCourses } from "../controllers/public/course.controller";
import { getTestimonials } from "../controllers/public/testimonial.controller";

const publicRouter = express.Router();

// --------- Public routes ---------

// Course routes
publicRouter.get("/courses", getFeaturedCourses);
publicRouter.get("/courses/:search", getCourses);

// Testimonial routes
publicRouter.get("/testimonials", getTestimonials);


export default publicRouter;
