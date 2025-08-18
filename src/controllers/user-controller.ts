import type { RequestHandler } from "express";
import asyncHandler from "../utils/async-handler.js";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response-handler.js";

export const getUsers: RequestHandler = asyncHandler(async (req, res) => {
    return sendSuccessResponse(res, "Getting all users.");
});


export const getUser: RequestHandler = asyncHandler(async (req, res) => {

    const { id } = req.params;
    return sendSuccessResponse(res, `Getting user with ID of ${id}.`);
});


export const createUser: RequestHandler = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    return sendSuccessResponse(res, `Inserting User data`, { email, password });
});

export const updateUser: RequestHandler = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { password, email } = req.body;
    return sendSuccessResponse(res, `Updating User data with id of ${id}`, { password, email });
});

export const deleteUser: RequestHandler = asyncHandler(async (req, res) => {

    const { id } = req.params;
    return sendSuccessResponse(res, `Deleting User data with id of ${id}`);
});