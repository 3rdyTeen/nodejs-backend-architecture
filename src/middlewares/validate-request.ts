import { ZodObject, type ZodRawShape  } from "zod";
import { type Request, type Response, type NextFunction } from "express";

const validate =
  (schema: ZodObject<ZodRawShape>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      next(e);
    }
  };

export default validate;