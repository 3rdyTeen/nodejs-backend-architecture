import { z } from "zod";
import type { OverrideIdAndDates } from "../../types/general.js";
import type { User } from "@prisma/client";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export type TCreateUserSchema = z.infer<typeof createUserSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;

type TUser = OverrideIdAndDates<User>;

export type TUserID = TUser['id'];
export type TUserWrite = Omit<TUser, 'id' | 'createdAt' | 'updatedAt'>;
export type TUserRead = Omit<TUser, 'password'> | null;