import rateLimitter from 'express-rate-limit'; // Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const rateLimiter = rateLimitter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many Requests from this IP, please try again in an hour!',
});
export default rateLimiter;
//# sourceMappingURL=rate-limitter.js.map