import http from "http";
import app from "./app.js";
import { PORT } from "./configs/environment.js";
import logger from "./utils/logger.js";

const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});