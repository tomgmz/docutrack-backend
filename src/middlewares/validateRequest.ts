import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validateRequest = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: err.issues[0].message });
    }
    return res.status(400).json({ message: "Invalid request" });
  }
};
