import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data: { email: string; name: string; password: string }) => {
  return prisma.user.create({ data });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
