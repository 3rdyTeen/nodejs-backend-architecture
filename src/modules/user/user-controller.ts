import type { RequestHandler } from "express";
import { deleteUserData, getUserByID, getUsers, updateUserData } from "./user-service.js";
import asyncHandler from "../../utils/async-handler.js";
import { sendSuccessResponse } from "../../utils/response-handler.js";
import logger from "../../utils/logger.js";
import type { TUpdateUserSchema, TUserID, TUserRead } from "./user-schema.js";


export const list: RequestHandler = asyncHandler(async (req, res) => {
    logger.info('Users list endpoint hit...', req.ip);
    const users = await getUsers();

    logger.info('Users fetched successfully.');
    return sendSuccessResponse(res, 'Users fetched successfully.', users);
});

export const getUser: RequestHandler = asyncHandler(async (req, res) => {
    logger.info('User details endpoint hit...', req.ip);

    const id = req.params.id as TUserID;

    const user: TUserRead = await getUserByID(id);

    logger.info('User details fetched successfully.');
    return sendSuccessResponse(res, 'User details fetched successfully.', user);
});

export const updateUser: RequestHandler = asyncHandler(async (req, res) => {
    logger.info('User update endpoint hit...', req.ip);

    const data : TUpdateUserSchema = req.body;
    const id = req.params.id as TUserID;

    const user: TUserRead = await updateUserData(id, data);

    logger.info('User updated successfully.');
    return sendSuccessResponse(res, 'User updated successfully.', user);
});

export const deleteUser: RequestHandler = asyncHandler(async (req, res) => {
    logger.info('User delete endpoint hit...', req.ip);

    const id = req.params.id as TUserID;

    await deleteUserData(id);

    logger.info('User deleted successfully.');
    return sendSuccessResponse(res, 'User deleted successfully.');
});