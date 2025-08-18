import rateLimit, {} from 'express-rate-limit';
import logger from '../utils/logger.js';
export function rateLimiter(type = "general") {
    const configs = {
        /**
         * General limiter
         * - Allows 100 requests per 15 minutes per IP
         */
        general: {
            windowMs: 15 * 60 * 1000,
            limit: 100,
            handler: (req, res) => {
                logger.warn(`Rate limit exceeded for IP ${req.ip}`);
                res.status(429).json({
                    error: 'Too many request attempts. Try again later.',
                });
            }
            //add redis store
        },
        /**
         * Auth limiter
         * - Stricter: 5 requests per 5 minutes per IP
         * - Custom JSON error message
         */
        auth: {
            windowMs: 5 * 60 * 1000,
            limit: 5,
            handler: (req, res) => {
                logger.warn(`Auth rate limit exceeded for IP ${req.ip}`);
                res.status(429).json({
                    error: 'Too many auth attempts. Try again later.',
                });
            }
            //add redis store
        },
        /**
         * Search limiter
         * - 10 requests per 10 seconds
         * - Uses API key, user ID, or falls back to IP
         */
        search: {
            windowMs: 10 * 1000,
            limit: 10,
            keyGenerator: (req) => req.headers['x-api-key'] ||
                // if you attach user info via auth middleware:
                // (req as any).user?.id ||
                req.ip || 'unknown',
            handler: (req, res) => {
                logger.warn(`Search rate limit exceeded for IP ${req.ip}`);
                res.status(429).json({
                    error: 'Too many search attempts. Try again later.',
                });
            }
            //add redis store
        },
    };
    /**
     * Return configured limiter with shared defaults
     */
    return rateLimit({
        standardHeaders: true,
        legacyHeaders: false,
        statusCode: 429,
        message: 'Too many requests, please try again later.',
        ...configs[type],
    });
}
//# sourceMappingURL=rate-limitter.js.map