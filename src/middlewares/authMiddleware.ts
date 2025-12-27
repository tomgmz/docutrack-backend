import { supabase } from "../lib/supabase";
import { Request, Response, NextFunction } from 'express';

export const supabaseAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({message: "Unauthorized"});
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);
  if (error){
    console.log("Failed to get supabase auth user: ", error);
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const authId = data.user?.id;
    return next();
  }
};