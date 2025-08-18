import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    /** Express already has `ip` but we make sure it’s always a string */
    ip?: string;

    /** Custom user object added by auth middleware */
    //update this user interface
    user?: {
      id: string;
      email?: string;
      role?: string;
    };
  }
}