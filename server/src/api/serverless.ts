import serverless from "serverless-http";
import app from "../app";
import connectDB from "../utils/db";
import logger from "../utils/logger";

// Connect to DB once (serverless cold start)
connectDB().then(() => logger.info("Connected to database")).catch(err => logger.error(err));

export const handler = serverless(app);
