import winston from "winston";
import { NODE_ENV } from "../configs/environment.js";
const logger = winston.createLogger({
    level: NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json()),
    defaultMeta: { service: "nodejs-backend-architecture" },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});
export default logger;
//# sourceMappingURL=logger.js.map