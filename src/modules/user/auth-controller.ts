import type { RequestHandler } from "express";
import { saveUserData, getUserByEmail } from "./user-service.js";
import asyncHandler from "../../utils/async-handler.js";
import { sendSuccessResponse, sendSuccessResponseWithCookie, sendUnauthorizedResponse } from "../../utils/response-handler.js";
import logger from "../../utils/logger.js";
import type { TLoginSchema, TRegisterSchema, TUser,  } from "./user-schema.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../../utils/jwt-handler.js";

export const register: RequestHandler = asyncHandler(async (req, res) => {
  logger.info('Registration endpoint hit...', req.ip);

  const data : TRegisterSchema = req.body;
  data.password = await bcrypt.hashSync(data.password, 10);

  const exists: TUser = await getUserByEmail(data.email);
  if(exists){
    logger.warn('User already exists.');
    return sendUnauthorizedResponse(res, 'User already exists.');
  }

  const user = await saveUserData(data);

  logger.info('User created successfully.', user?.id);
  return sendSuccessResponse(res, 'User created successfully.', user);
});


export const login: RequestHandler = asyncHandler(async (req, res) => {
  logger.info('Login endpoint hit...', req.ip);

  const { email, password } : TLoginSchema = req.body;
  const user: TUser = await getUserByEmail(email);

  if(!user || !(await bcrypt.compareSync(password, user.password))) {
    logger.warn('Invalid credentials.');
    return sendUnauthorizedResponse(res, 'Invalid credentials.');
  }

  const { password: _password, ...safeuser } = user;

  const token: string = await generateJWT(safeuser, '1d');

  logger.info('User logged in successfully.', user?.id);
  return sendSuccessResponseWithCookie(res, token, {...safeuser, token});
});


export const logout: RequestHandler = asyncHandler(async (req, res) => {
  logger.info('Logout endpoint hit...', req.ip);

  res.cookie('token', '', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  logger.info('User logged out successfully.', req.ip);
  return sendSuccessResponse(res, 'User logged out successfully.');
});


