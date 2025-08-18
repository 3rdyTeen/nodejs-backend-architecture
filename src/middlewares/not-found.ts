import { type Request, type Response } from 'express';
import logger from '../utils/logger.js';
import { sendErrorResponse } from '../utils/response-handler.js';

export default function (req: Request, res: Response) {
  logger.error('Not Found', req.originalUrl);
  sendErrorResponse(res, 'Not Found.');
}