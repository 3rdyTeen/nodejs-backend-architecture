import cookieParser from 'cookie-parser'; // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
import express, { type Request, type Response, type Express, type NextFunction } from 'express'; // web framework for Node.js.
import helmet from 'helmet'; // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
import hpp from 'hpp'; //Express middleware to protect against HTTP Parameter Pollution attacks
import morgan from 'morgan'; // HTTP request logger middleware for node.js

/** Import Configs */
import corsConfig from './configs/cors-config.js';
import { JWT_SECRET, NODE_ENV } from './configs/environment.js';
import { rateLimiter } from './configs/rate-limitter.js';

/** Import Middlewares */
import logger from './utils/logger.js';
import notFound from './middlewares/not-found.js';
import errHandlerMiddleware from './middlewares/error-handler.js';

/** Load Routes */
import loadRoutes from './routes/index.js';

const app: Express = express();

app.set('trust proxy', 1);

app.use(corsConfig);

app.use(cookieParser(JWT_SECRET));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${req.body}`);
  next();
});

if(NODE_ENV === 'development') app.use(morgan('dev'));

//DDos protection and rate limiting

//add stored redis rate limmiter

//Ip based rate limiting for endpoint (general, auth, search), general as default
app.use(rateLimiter());

app.use(hpp());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to the Nodejs Backend Architecture API',
    });
});

await loadRoutes(app);

app.use(notFound);
app.use(errHandlerMiddleware);

export default app;







