import winston from "winston";
import { SERVER_CONFIG } from "./constants";

const isDev = SERVER_CONFIG.NODE_ENV !== "production";

const logger = winston.createLogger({
  level: "info",
  format: isDev
    ? winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "HH:mm:ss" }),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
    )
    : winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  transports: [new winston.transports.Console()],
});

export default logger;
