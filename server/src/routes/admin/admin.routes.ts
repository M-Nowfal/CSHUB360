import express from "express";
import adminAuthRoutes from "./auth.routes";

// Create router for admin
const adminRoutes = express.Router();

adminRoutes.use("/auth", adminAuthRoutes);

export default adminRoutes;