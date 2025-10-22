import express from "express";
import studentAuthRoutes from "./auth.routes";

// Create router for student
const studentRoutes = express.Router();

studentRoutes.use("/auth", studentAuthRoutes);

export default studentRoutes;