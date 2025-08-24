import type { RequestHandler } from "express";
import { createUser, getUsers } from "./user-service.js";
import asyncHandler from "../../utils/async-handler.js";
import { sendSuccessResponse } from "../../utils/response-handler.js";
import logger from "../../utils/logger.js";
import type { TUserWrite } from "./user-schema.js";

export const register: RequestHandler = asyncHandler(async (req, res) => {
  logger.info('Registration endpoint hit...', req.ip);
  const data : TUserWrite = req.body;
  const user = await createUser(data);

  logger.info('User created successfully.', user.id);
  return sendSuccessResponse(res, 'User created successfully.', user);
});


export const list: RequestHandler = asyncHandler(async (req, res) => {
    logger.info('Users list endpoint hit...', req.ip);
    const users = await getUsers();

    logger.info('Users fetched successfully.');
    return sendSuccessResponse(res, 'Users fetched successfully.', users);
});
