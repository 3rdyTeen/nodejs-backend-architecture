import type { Request, RequestHandler, Response } from "express";
import { createUser, getUsers } from "./user-service.js";
import asyncHandler from "../../utils/async-handler.js";
import { sendSuccessResponse } from "../../utils/response-handler.js";
import logger from "../../utils/logger.js";

export const register: RequestHandler = asyncHandler(async (req, res) => {
  logger.info('Registration endpoint hit...', req.ip);
  const { email, name, password } = req.body;
  const user = await createUser({ email, name, password });

  logger.info('User created successfully.', user.id);
  return sendSuccessResponse(res, 'User created successfully.', user);
});


export const list: RequestHandler = asyncHandler(async (req, res) => {
    logger.info('Users list endpoint hit...', req.ip);
    const users = await getUsers();

    return sendSuccessResponse(res, 'Users fetched successfully.', users);
});
