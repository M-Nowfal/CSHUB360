import connectDB from "./utils/db";
import app from "./app";
import { SERVER_CONFIG } from "./utils/constants";
import logger from "./utils/logger";

const startServer = async () => {
  try {
    await connectDB();
    const PORT = SERVER_CONFIG.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
