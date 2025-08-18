import type { NextFunction, Request, RequestHandler, Response } from "express";
import { sendErrorResponse } from "./response-handler.js";
import logger from "./logger.js";

const asyncHandler = (handler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error: any) {
            logger.error('Internal Server Error', error);
            sendErrorResponse(res, 'Internal Server Error');
        }
    };
};

export default asyncHandler;
