import { type NextFunction, type Request, type Response } from 'express';
import { sendUnauthorizedResponse } from '../utils/response-handler.js';
import { verifyToken } from '../utils/jwt-handler.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // check headers
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // check cookies
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) return sendUnauthorizedResponse(res, 'Not authorized to access this route');

  try {
    // Verify token
    const decoded = verifyToken(token);
    const user = decoded;

    if (!user) return sendUnauthorizedResponse(res, 'Invalid Token.');

    (req as any).user = user;

    next();
  } catch (error) {
      next();
  }
};