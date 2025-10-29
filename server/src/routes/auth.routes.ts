import express from "express";
import studentAuthRoutes from "./student/auth.routes";
import instructorAuthRoutes from "./instructor/auth.routes";
import adminAuthRoutes from "./admin/auth.routes";
import { getCurrentUser, logout } from "../controllers/public/auth.controller";

const authRoutes = express.Router();

// Auth Routes
authRoutes.get("/me", getCurrentUser);
authRoutes.patch("/logout", logout);
authRoutes.use("/student", studentAuthRoutes);
authRoutes.use("/instructor", instructorAuthRoutes);
authRoutes.use("/admin", adminAuthRoutes);

export default authRoutes;
