import { type NextFunction, type Request, type Response } from 'express';
import logger from '../utils/logger.js';
import { NODE_ENV } from '../configs/environment.js';
import { sendErrorResponse } from '../utils/response-handler.js';

export default function (error: Error, request: Request, response: Response) {
 
  logger.error(error.stack);

  //add other error hanlding Zod, Prisma, JWT, etc


  // Handle other types of errors
  const res =
    NODE_ENV == 'development'
      ? { message: error.message }
      : { message: 'Internal Server Error' };
  return sendErrorResponse(response, res);
}