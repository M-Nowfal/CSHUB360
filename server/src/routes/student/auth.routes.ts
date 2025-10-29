import express from "express";
import { studentLogin, studentSignUp } from "../../controllers/student/auth.controller";

// Create router for student authentication routes
const studentAuthRoutes = express.Router();

// Define student authentication routes (e.g., login, register, etc.)
studentAuthRoutes.post("/login", studentLogin);
studentAuthRoutes.post("/signup", studentSignUp);

export default studentAuthRoutes;
