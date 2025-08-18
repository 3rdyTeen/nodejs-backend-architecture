/**
 * Centralized Rate Limiter Factory
 */
type LimiterType = 'general' | 'auth' | 'search';
export declare function rateLimiter(type?: LimiterType): import("express-rate-limit").RateLimitRequestHandler;
export {};
//# sourceMappingURL=rate-limitter.d.ts.map