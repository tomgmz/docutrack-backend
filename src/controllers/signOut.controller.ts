import { Request, Response } from 'express';
import { authSignOut } from '../services/signOut.service';

export const signOut = async (req: Request, res: Response) => {
  try {
    await authSignOut();
    res.status(200).json({ message: "Signed out successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to sign out" });
  }
};
