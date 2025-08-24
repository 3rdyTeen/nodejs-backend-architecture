import { PrismaClient } from "@prisma/client";
import type { TUserWrite } from "./user-schema.js";

const prisma = new PrismaClient();

export const createUser = async (data: TUserWrite) => {
  return prisma.user.create({ data });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
