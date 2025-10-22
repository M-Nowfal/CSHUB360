import express from "express";
import instructorRoutes from "./instructor/instructor.routes";
import studentRoutes from "./student/student.routes";
import adminRoutes from "./admin/admin.routes";
import publicRouter from "./public.routes";

// Create main router
const router = express.Router();

// Mount routers
router.use("/", publicRouter);
router.use("/admin", adminRoutes);
router.use("/instructor", instructorRoutes);
router.use("/student", studentRoutes);

// Health check
router.get("/health", (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(200).json({ message: "Server is healthy and running!" });
  } catch (error: unknown) {
    return next(error);
  }
});

export default router;
