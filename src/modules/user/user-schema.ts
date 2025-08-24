import { z } from "zod";
import type { OverrideIdAndDates } from "../../types/general.js";
import type { User } from "@prisma/client";

export const registerSchema = z.object({
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

export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
  }),
});

export type TRegisterSchema = z.infer<typeof registerSchema>["body"];
export type TLoginSchema = z.infer<typeof loginSchema>["body"];
export type TUpdateUserSchema = z.infer<typeof updateUserSchema>["body"];

type OverrideUser = OverrideIdAndDates<User>;

export type TUser = OverrideUser | null;
export type TUserID = OverrideUser['id'];
export type TUserWrite = Omit<OverrideUser, 'id' | 'createdAt' | 'updatedAt'>;
export type TUserRead = Omit<OverrideUser, 'password'> | null;