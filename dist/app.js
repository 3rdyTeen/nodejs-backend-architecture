import cookieParser from 'cookie-parser'; // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
import express, {} from 'express'; // web framework for Node.js.
import helmet from 'helmet'; // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
import hpp from 'hpp'; //Express middleware to protect against HTTP Parameter Pollution attacks
import morgan from 'morgan'; // HTTP request logger middleware for node.js
/** Import Configs */
import corsConfig from './configs/cors-config.js';
import { JWT_SECRET, NODE_ENV } from './configs/environment.js';
import { rateLimiter } from './configs/rate-limitter.js';
/** Import Middlewares */
import logger from './utils/logger.js';
const app = express();
app.set('trust proxy', 1);
app.use(corsConfig);
app.use(cookieParser(JWT_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next();
});
if (NODE_ENV === 'development')
    app.use(morgan('dev'));
//DDos protection and rate limiting
//add stored redis rate limmiter
//Ip based rate limiting for sensitive endpoints
app.use(rateLimiter());
app.use(hpp());
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
    });
});
//initialize middlewares here "Not Found and Error Handler"
export default app;
//# sourceMappingURL=app.js.map