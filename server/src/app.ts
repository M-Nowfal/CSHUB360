import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/router";
import { CORS_OPTIONS, SERVER_CONFIG } from "./utils/constants";
import apiLimiter from "./middlewares/rateLimiter.middleware";
import { ensureDBConnection } from "./middlewares/db.middleware";

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(ensureDBConnection);

// Router
app.use(`/api/${SERVER_CONFIG.VERSION}`, apiLimiter, router);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: `Internal Server Error! caused by ${err.message}` });
  return next();
});

export default app;
