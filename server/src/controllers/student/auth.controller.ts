import express from "express";

// api/v1/student/auth     POST - Method
const studentLogin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(200).json({ message: "Student login successful!" });
  } catch (error: unknown) {
    return next(error);
  }
};

// Export all controllers
export { studentLogin };
