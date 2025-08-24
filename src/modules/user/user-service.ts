import { PrismaClient } from "@prisma/client";
import type { TRegisterSchema, TUpdateUserSchema, TUser, TUserID, TUserRead, TUserWrite } from "./user-schema.js";

const prisma = new PrismaClient();
const select = {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
  };


export const saveUserData = async (data: TRegisterSchema) : Promise<TUserRead> => {
  return prisma.user.create({ data, select });
};


export const getUsers = async () : Promise<TUserRead[]> => {
  return prisma.user.findMany({select});
};

export const getUserByID = async (id: string) : Promise<TUserRead> => {
  return prisma.user.findUnique({ where: { id }, select });
};

export const getUserByEmail = async (email: string) : Promise<TUser> => {
  return prisma.user.findUnique({ where: { email } });
};

export const updateUserData = async (id: TUserID, data: TUpdateUserSchema) : Promise<TUserRead> => {
  return prisma.user.update({ where: { id }, data, select });
};

export const deleteUserData = async (id: TUserID) : Promise<TUserRead> => {
  return prisma.user.delete({ where: { id } });
};
