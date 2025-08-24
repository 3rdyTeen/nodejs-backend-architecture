import jwt, { type SignOptions } from 'jsonwebtoken';
import type { TUserRead } from '../modules/user/user-schema.js';
import { JWT_SECRET } from '../configs/environment.js';

export const generateJWT = async (payload: TUserRead, expiresIn: SignOptions["expiresIn"]): Promise<string> => {
    const options: SignOptions = {};
    if (expiresIn !== undefined) {
        options.expiresIn = expiresIn;
    }

    return jwt.sign({...payload}, JWT_SECRET, options);
};

export const verifyToken = async (token: string): Promise<TUserRead> => {
  return jwt.verify(token, JWT_SECRET as string) as TUserRead;
};