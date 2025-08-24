import { type Application } from 'express';
import validate  from '../middlewares/validate-request.js';
import { registerSchema, loginSchema } from '../modules/user/user-schema.js';
import { rateLimiter } from '../configs/rate-limitter.js';
import { login, logout, register } from '../modules/user/auth-controller.js';
import { authMiddleware } from '../middlewares/auth-protect.js';

export default function (app: Application): void {
  const route = '/api/auth';

   // Apply auth limiter to all auth routes
  app.use(route, rateLimiter('auth'));

  // ---- Public routes ----

  // Acess : Public
  // POST : /api/auth/register
  app.post(`${route}/register`, validate(registerSchema), register);

  // Acess : Public
  // POST : /api/auth/login
  app.post(`${route}/login`, validate(loginSchema), login);


  // ---- Private routes (protected) ----

  // all routes after this line require auth
  app.use(route, authMiddleware);

  // Acess : Private
  // GET : /api/auth/logout
  app.post(`${route}/logout`, logout);
}