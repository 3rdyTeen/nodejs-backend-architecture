import { type Response } from 'express';

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse<T> {
  success: false;
  error: {
    message: T;
  };
}

// Success response with data
export const sendSuccessResponse = <T>(
  res: Response,
  message?: string,
  data?: T | null,
  status = 200
): Response<SuccessResponse<T>> => {
  return res.status(status).json({
    success: true,
    ...(data !== undefined ? { data } : {}),
    ...(message ? { message } : {}),
  });
};

// Error response
export const sendErrorResponse = <T>(
  res: Response,
  message: T,
  status = 500
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Not Found response
export const sendNotFoundResponse = <T>(
  res: Response,
  message: T,
  status = 404
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Validation Error response
export const sendValidationError = <T>(
  res: Response,
  message: T,
  errors: string[],
  status = 400
): Response<ErrorResponse<T>> => {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      errors: errors,
    },
  });
};

// Unauthorized response
export const sendUnauthorizedResponse = <T>(
  res: Response,
  message = 'Unauthorized',
  status = 401
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Forbidden response
export const sendForbiddenResponse = <T>(
  res: Response,
  message = 'Forbidden',
  status = 403
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Bad Request response
export const sendBadRequestResponse = <T>(
  res: Response,
  message: T,
  status = 400
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};