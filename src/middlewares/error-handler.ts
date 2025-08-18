import { type NextFunction, type Request, type Response } from 'express';
import logger from '../utils/logger.js';
import { NODE_ENV } from '../configs/environment.js';
import { sendBadRequestResponse, sendErrorResponse, sendValidationError } from '../utils/response-handler.js';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export default function (error: Error, request: Request, response: Response, next: NextFunction) {
 
  logger.error(error.stack);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errors = error.issues.map((e: any) => e.message) as string[];
    return sendValidationError(response, 'Validation Error', errors);
  }

  // Handle known Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
   
    if(NODE_ENV !== 'development') {
      return sendBadRequestResponse(response, "Error Occured.");
    }

    if (error.code === "P2002") {
      // Unique constraint violation
      return sendBadRequestResponse(response,  "Duplicate field value. A record with this already exists.");
    }

    if (error.code === "P2025") {
      // Record not found
      return sendBadRequestResponse(response, "Record not found.");
    }

    return sendBadRequestResponse(response, "Database error.");
  }

  // Handle Json Web Token Error
  // if (error instanceof JsonWebTokenError) {
  //   const res =
  //     process.env.APP_ENV == 'developement'
  //       ? { error: 'Json Web Token Error occurred', message: error }
  //       : { error: 'Error occurred' };
  //   return sendBadRequestResponse(response, res);
  // }

  // Handle other types of errors
  const msg =
    NODE_ENV == 'development'
      ?  error.message
      : 'Internal Server Error';
  return sendErrorResponse(response, msg);
}